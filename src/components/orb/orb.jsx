import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle, Vec3 } from "ogl";
import "./orb.scss";
import whiteOrb from "../../assets/images/white-orb.svg";

export default function Orb({ quality = "auto" }) {
  const containerRef = useRef(null);

  const vertex = `
    precision highp float;
    attribute vec2 position;
    attribute vec2 uv;
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

  const fragment = `
    precision highp float;

    uniform float iTime;
    uniform vec3 iResolution;

    uniform vec3 c1;
    uniform vec3 c2;
    uniform vec3 c3;
    uniform vec3 c4;
    uniform vec3 c5;

    varying vec2 vUv;

    float blob(vec2 uv, vec2 p) {
      float d = length(uv - p);
      return smoothstep(0.95, 0.0, d);
    }

    void main() {
      vec2 center = iResolution.xy * 0.5;
      float size = min(iResolution.x, iResolution.y);
      vec2 uv = (gl_FragCoord.xy - center) / size * 2.5;

      // circular mask
      float r = length(uv);
      float circleMask = smoothstep(1.0, 0.85, r);
      if (r > 1.0) {
        gl_FragColor = vec4(0.0);
        return;
      }

      float t = iTime * 0.35;

      // drifting color sources (liquid pool)
      vec2 p1 = vec2(sin(t * 1.1), cos(t * 0.9));
      vec2 p2 = vec2(cos(t * 0.8 + 1.0), sin(t * 1.2 + 1.0));
      vec2 p3 = vec2(sin(t * 0.6 + 2.0), cos(t * 1.0 + 2.0));
      vec2 p4 = vec2(cos(t * 1.3 + 3.0), sin(t * 0.7 + 3.0));
      vec2 p5 = vec2(sin(t * 0.9 + 4.0), cos(t * 1.1 + 4.0));

      vec3 col = vec3(0.0);
      col += c1 * blob(uv, p1);
      col += c2 * blob(uv, p2);
      col += c3 * blob(uv, p3);
      col += c4 * blob(uv, p4);
      col += c5 * blob(uv, p5);

      // normalize to keep colors rich but controlled
      col /= 1.6;

      // soft edge fade with alpha
      col *= circleMask;
      
      float alpha = max(max(col.r, col.g), col.b);
      gl_FragColor = vec4(col, alpha);
    }
  `;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Skip in environments without WebGL (e.g. jsdom tests, some old Safari modes)
    if (typeof window === "undefined" || typeof window.WebGLRenderingContext === "undefined") {
      return;
    }

    let renderer = null;
    let gl = null;
    try {
      renderer = new Renderer({ alpha: true, premultipliedAlpha: false });
      gl = renderer.gl;
      gl.clearColor(0, 0, 0, 0);
      container.appendChild(gl.canvas);
    } catch {
      // Test / non-WebGL environments (e.g. jsdom) can't create a GL context.
      return;
    }

    const geometry = new Triangle(gl);

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Vec3(1, 1, 1) },

        // brand colors (normalized)
        c1: { value: new Vec3(0.204, 0.306, 0.365) }, // #344e5d
        c2: { value: new Vec3(0.271, 0.698, 0.616) }, // #45b29d
        c3: { value: new Vec3(0.937, 0.792, 0.302) }, // #efca4d
        c4: { value: new Vec3(0.969, 0.573, 0.149) }, // #f79226
        c5: { value: new Vec3(0.875, 0.357, 0.286) }  // #df5b49
      }
    });

    const mesh = new Mesh(gl, { geometry, program });

    let running = true;
    let rafId = null;
    let isVisible = true;
    let lastTs = 0;

    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const isWebKit =
      /AppleWebKit/i.test(ua) &&
      !/Chrome/i.test(ua) &&
      !/Chromium/i.test(ua) &&
      !/Edg/i.test(ua);

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
      const dprRaw = window.devicePixelRatio || 1;
      const w = container.clientWidth;
      const h = container.clientHeight;

      // Clamp DPR to avoid huge fragment workloads (esp. WebKit + large windows).
      const dprCap =
        quality === "low" ? 1 :
        quality === "high" ? 2 :
        (prefersReducedMotion ? 1.25 : (isWebKit ? 1 : 2));
      const dpr = Math.min(dprRaw, dprCap);

      renderer.setSize(w * dpr, h * dpr);
      gl.canvas.style.width = w + "px";
      gl.canvas.style.height = h + "px";
      program.uniforms.iResolution.value.set(
        gl.canvas.width,
        gl.canvas.height,
        gl.canvas.width / gl.canvas.height
      );
    }

    window.addEventListener("resize", resize);
    resize();

    let start = performance.now();

    const targetFps = prefersReducedMotion ? 30 : (isWebKit ? 30 : 60);
    const minFrameMs = 1000 / targetFps;

    const tick = (t) => {
      if (!running) return;
      if (document.hidden || !isVisible) {
        rafId = requestAnimationFrame(tick);
        return;
      }
      if (t - lastTs < minFrameMs) {
        rafId = requestAnimationFrame(tick);
        return;
      }
      lastTs = t;

      program.uniforms.iTime.value = (t - start) * 0.001;
      renderer.render({ scene: mesh });
      rafId = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = Boolean(entry?.isIntersecting);
      },
      { root: null, threshold: 0.05 }
    );
    io.observe(container);

    rafId = requestAnimationFrame(tick);

    return () => {
      running = false;
      window.removeEventListener("resize", resize);
      if (rafId) cancelAnimationFrame(rafId);
      io.disconnect();
      if (gl?.canvas && gl.canvas.parentNode === container) {
        container.removeChild(gl.canvas);
      }
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [quality]);

  return (
    <div className="orb-wrapper">
      <div ref={containerRef} className="orb-container" />
      {/* <img src={whiteOrb} alt="White Orb" className="white-orb"/> */}
    </div>
  );
}

