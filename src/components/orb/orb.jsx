import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle, Vec3 } from "ogl";
import "./orb.scss";
import whiteOrb from "../../assets/images/white-orb.svg";

export default function Orb() {
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

    const renderer = new Renderer({ alpha: true, premultipliedAlpha: false });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    container.appendChild(gl.canvas);

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

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const w = container.clientWidth;
      const h = container.clientHeight;
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

    const update = (t) => {
      program.uniforms.iTime.value = (t - start) * 0.001;
      renderer.render({ scene: mesh });
      requestAnimationFrame(update);
    };

    requestAnimationFrame(update);

    return () => {
      window.removeEventListener("resize", resize);
      container.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <div className="orb-wrapper">
      <div ref={containerRef} className="orb-container" />
      {/* <img src={whiteOrb} alt="White Orb" className="white-orb"/> */}
    </div>
  );
}

