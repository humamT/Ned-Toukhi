import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle, Vec3 } from "ogl";
import "./orb.scss";
import whiteOrb from "../../assets/images/white-orb.svg";

export default function Orb({ rotate = true, className = "" }) {
  const ctnDom = useRef(null);

  const vert = `
    precision highp float;
    attribute vec2 position;
    attribute vec2 uv;
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

  const frag = `
    precision highp float;

    uniform float iTime;
    uniform vec3 iResolution;
    uniform float rot;

    uniform vec3 c1;
    uniform vec3 c2;
    uniform vec3 c3;
    uniform vec3 c4;
    uniform vec3 c5;

    varying vec2 vUv;

    vec3 hash33(vec3 p3) {
      p3 = fract(p3 * vec3(0.1031, 0.11369, 0.13787));
      p3 += dot(p3, p3.yxz + 19.19);
      return -1.0 + 2.0 * fract(vec3(
        p3.x + p3.y,
        p3.x + p3.z,
        p3.y + p3.z
      ) * p3.zyx);
    }

    float snoise3(vec3 p) {
      const float K1 = 0.333333333;
      const float K2 = 0.166666667;
      vec3 i = floor(p + (p.x + p.y + p.z) * K1);
      vec3 d0 = p - (i - (i.x + i.y + i.z) * K2);
      vec3 e = step(vec3(0.0), d0 - d0.yzx);
      vec3 i1 = e * (1.0 - e.zxy);
      vec3 i2 = 1.0 - e.zxy * (1.0 - e);
      vec3 d1 = d0 - (i1 - K2);
      vec3 d2 = d0 - (i2 - K1);
      vec3 d3 = d0 - 0.5;
      vec4 h = max(0.6 - vec4(
        dot(d0, d0),
        dot(d1, d1),
        dot(d2, d2),
        dot(d3, d3)
      ), 0.0);
      vec4 n = h * h * h * h * vec4(
        dot(d0, hash33(i)),
        dot(d1, hash33(i + i1)),
        dot(d2, hash33(i + i2)),
        dot(d3, hash33(i + 1.0))
      );
      return dot(vec4(31.316), n);
    }

    vec4 extractAlpha(vec3 colorIn) {
      float a = max(max(colorIn.r, colorIn.g), colorIn.b);
      return vec4(colorIn.rgb / (a + 1e-5), a);
    }

    const float innerRadius = 0.3;
    const float noiseScale = 0.25;
    const float PI = 3.14159265;
    const float TWO_PI = 6.2831853;

    float light1(float intensity, float attenuation, float dist) {
      return intensity / (1.0 + dist * attenuation);
    }

    float light2(float intensity, float attenuation, float dist) {
      return intensity / (1.0 + dist * dist * attenuation);
    }

    vec3 angularColor(float angle) {
      float a = angle + iTime * 0.4;

      float a0 = 0.0;
      float a1 = TWO_PI * 1.0 / 5.0;
      float a2 = TWO_PI * 2.0 / 5.0;
      float a3 = TWO_PI * 3.0 / 5.0;
      float a4 = TWO_PI * 4.0 / 5.0;

      float w0 = max(0.0, cos(a - a0));
      float w1 = max(0.0, cos(a - a1));
      float w2 = max(0.0, cos(a - a2));
      float w3 = max(0.0, cos(a - a3));
      float w4 = max(0.0, cos(a - a4));

      w0 = pow(w0, 3.0);
      w1 = pow(w1, 3.0);
      w2 = pow(w2, 3.0);
      w3 = pow(w3, 3.0);
      w4 = pow(w4, 3.0);

      float wSum = w0 + w1 + w2 + w3 + w4 + 1e-5;

      vec3 col =
          c1 * w0 +
          c2 * w1 +
          c3 * w2 +
          c4 * w3 +
          c5 * w4;

      return col / wSum;
    }

    vec4 draw(vec2 uv) {
      float ang = atan(uv.y, uv.x);
      if (ang < 0.0) ang += TWO_PI;

      float len = length(uv);
      float invLen = len > 0.0 ? 1.0 / len : 0.0;

      float n0 = snoise3(vec3(uv * noiseScale, iTime * 0.04)) * 0.35 + 0.5;
      float r0 = mix(mix(innerRadius, 1.0, 0.35), mix(innerRadius, 1.0, 0.65), n0);

      float d0 = distance(uv, (r0 * invLen) * uv);
      float v0 = light1(0.9, 12.0, d0);
      v0 *= smoothstep(r0 * 1.08, r0, len);

      vec3 col = angularColor(ang);

      float a = iTime * -0.08;
      vec2 pos = vec2(cos(a), sin(a)) * r0;
      float d = distance(uv, pos);
      float v1 = light2(0.3, 8.0, d);
      v1 *= light1(0.6, 80.0, d0);

      float v2 = smoothstep(1.0, mix(innerRadius, 1.0, n0 * 0.45), len);
      float v3 = smoothstep(innerRadius, mix(innerRadius, 1.0, 0.55), len);

      col = col * v0;
      col = (col + v1) * v2 * v3;
      col = clamp(col, 0.0, 1.0);

      return extractAlpha(col);
    }

    vec4 mainImage(vec2 fragCoord) {
      vec2 center = iResolution.xy * 0.5;
      float size = min(iResolution.x, iResolution.y);
      vec2 uv = (fragCoord - center) / size * 2.0;

      float s = sin(rot);
      float c = cos(rot);
      uv = vec2(c * uv.x - s * uv.y, s * uv.x + c * uv.y);

      return draw(uv);
    }

    void main() {
      vec2 fragCoord = vUv * iResolution.xy;
      vec4 col = mainImage(fragCoord);
      gl_FragColor = vec4(col.rgb * col.a, col.a);
    }
  `;

  useEffect(() => {
    const container = ctnDom.current;
    if (!container) return;

    const renderer = new Renderer({ alpha: true, premultipliedAlpha: false });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    container.appendChild(gl.canvas);

    const geometry = new Triangle(gl);

    const program = new Program(gl, {
      vertex: vert,
      fragment: frag,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Vec3(1, 1, 1) },
        rot: { value: 0 },

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
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width * dpr, height * dpr);
      gl.canvas.style.width = width + "px";
      gl.canvas.style.height = height + "px";
      program.uniforms.iResolution.value.set(
        gl.canvas.width,
        gl.canvas.height,
        gl.canvas.width / gl.canvas.height
      );
    }

    window.addEventListener("resize", resize);
    resize();

    let lastTime = performance.now();
    let currentRot = 0;
    let smoothedTime = 0;
    let elapsed = 0; // accumulated time in seconds

    const update = (t) => {
      let dt = (t - lastTime) * 0.001; // ms → s
      lastTime = t;

      // clamp dt to avoid huge jumps after tab is inactive
      if (dt < 0) dt = 0;
      if (dt > 0.05) dt = 0.05;

      // accumulate elapsed time
      elapsed += dt;

      // smooth time for shader
      smoothedTime += (elapsed - smoothedTime) * 0.02;
      program.uniforms.iTime.value = smoothedTime;

      // rotation uses clamped dt
      if (rotate) currentRot += dt * 0.015;
      currentRot *= 0.995;
      program.uniforms.rot.value = currentRot;

      renderer.render({ scene: mesh });
      requestAnimationFrame(update);
    };

    requestAnimationFrame(update);

    return () => {
      window.removeEventListener("resize", resize);
      container.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [rotate]);

  return (
    <div className={`orb-wrapper ${className}`}>
      <div ref={ctnDom} className="orb-container" />
    </div>
  );
}
