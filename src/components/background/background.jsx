import { useEffect, useRef } from "react";
import "./background.scss";

export default function Background({ hideInteractive = false, hideG6 = false }) {
  const interactiveRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    const interBubble = interactiveRef.current;
    const rootEl = rootRef.current;
    if (!rootEl) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    const isWebKit =
      /AppleWebKit/i.test(ua) &&
      !/Chrome/i.test(ua) &&
      !/Chromium/i.test(ua) &&
      !/Edg/i.test(ua);

    const computePerfMode = () => {
      // Larger viewports = exponentially more pixels to blend/blur/filter.
      // Switch to cheaper mode when the window is "big enough" to hurt WebKit.
      const area = window.innerWidth * window.innerHeight;
      const isHugeViewport = area >= 2_000_000; // ~1080p and above
      const low = prefersReducedMotion || isWebKit || isHugeViewport;
      rootEl.dataset.perf = low ? "low" : "high";
    };

    computePerfMode();
    rootEl.dataset.webkit = isWebKit ? "true" : "false";

    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;
    let rafId = null;
    let lastFrameTs = 0;
    let running = true;

    const targetFps = isWebKit ? 30 : 60;
    const minFrameMs = 1000 / targetFps;

    // Bubble physics setup (use smaller viewport dimension for sizing)
    const base = Math.min(window.innerWidth, window.innerHeight);
    const bubbles = [
      { el: document.querySelector('.g1'), x: window.innerWidth * 0.85, y: window.innerHeight * 0.1, vx: 1.2, vy: 0.8, radius: base * 0.15 },
      { el: document.querySelector('.g2'), x: window.innerWidth * 0.15, y: window.innerHeight * 0.8, vx: -0.9, vy: -1.1, radius: base * 0.15 },
      { el: document.querySelector('.g3'), x: window.innerWidth * 0.85, y: window.innerHeight * 0.8, vx: -1.1, vy: 0.7, radius: base * 0.15 },
      { el: document.querySelector('.g4'), x: window.innerWidth * 0.5, y: window.innerHeight * 0.1, vx: 0.7, vy: 1.3, radius: base * 0.15 },
      { el: document.querySelector('.g5'), x: window.innerWidth * 0.15, y: window.innerHeight * 0.1, vx: 1.0, vy: 1.0, radius: base * 0.3 }
    ];

    function checkCollision(b1, b2) {
      const dx = b2.x - b1.x;
      const dy = b2.y - b1.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const minDist = (b1.radius + b2.radius) * 0.4; // Collision threshold

      if (distance < minDist) {
        // Calculate bounce
        const angle = Math.atan2(dy, dx);
        const sin = Math.sin(angle);
        const cos = Math.cos(angle);

        // Swap velocities (simplified elastic collision)
        const vx1 = b1.vx * cos + b1.vy * sin;
        const vy1 = b1.vy * cos - b1.vx * sin;
        const vx2 = b2.vx * cos + b2.vy * sin;
        const vy2 = b2.vy * cos - b2.vx * sin;

        // Apply soft bounce with damping
        b1.vx = (vx2 * cos - vy1 * sin) * 0.85;
        b1.vy = (vy1 * cos + vx2 * sin) * 0.85;
        b2.vx = (vx1 * cos - vy2 * sin) * 0.85;
        b2.vy = (vy2 * cos + vx1 * sin) * 0.85;

        // Separate bubbles to prevent sticking
        const overlap = minDist - distance;
        const separateX = (overlap * cos) / 2;
        const separateY = (overlap * sin) / 2;
        b1.x -= separateX;
        b1.y -= separateY;
        b2.x += separateX;
        b2.y += separateY;
      }
    }

    function updateBubbles() {
      bubbles.forEach((bubble, i) => {
        // Update position
        bubble.x += bubble.vx;
        bubble.y += bubble.vy;

        // Bounce off walls
        if (bubble.x < bubble.radius * 0.3 || bubble.x > window.innerWidth - bubble.radius * 0.3) {
          bubble.vx *= -1;
          bubble.x = Math.max(bubble.radius * 0.3, Math.min(window.innerWidth - bubble.radius * 0.3, bubble.x));
        }
        if (bubble.y < bubble.radius * 0.3 || bubble.y > window.innerHeight - bubble.radius * 0.3) {
          bubble.vy *= -1;
          bubble.y = Math.max(bubble.radius * 0.3, Math.min(window.innerHeight - bubble.radius * 0.3, bubble.y));
        }

        // Check collisions with other bubbles
        for (let j = i + 1; j < bubbles.length; j++) {
          checkCollision(bubble, bubbles[j]);
        }

        // Update DOM (transform-only to avoid layout thrash)
        if (bubble.el) {
          bubble.el.style.transform = `translate3d(${bubble.x}px, ${bubble.y}px, 0) translate3d(-50%, -50%, 0)`;
        }
      });
    }

    function tick(ts) {
      if (!running) return;
      if (document.hidden) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      if (ts - lastFrameTs < minFrameMs) {
        rafId = requestAnimationFrame(tick);
        return;
      }
      lastFrameTs = ts;

      // Smooth cursor following for interactive bubble (if enabled)
      if (interBubble && !hideInteractive) {
        curX += (tgX - curX) / 50;
        curY += (tgY - curY) / 50;
        interBubble.style.transform = `translate3d(${Math.round(curX)}px, ${Math.round(curY)}px, 0)`;
      }

      updateBubbles();
      rafId = requestAnimationFrame(tick);
    }

    const handleMouseMove = (e) => {
      tgX = e.clientX;
      tgY = e.clientY;
    };

    const handleVisibility = () => {
      // No-op: `tick` reads `document.hidden`, but this helps WebKit “settle” faster.
      rootEl.dataset.hidden = document.hidden ? "true" : "false";
    };

    let resizeRaf = null;
    const handleResize = () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        computePerfMode();
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    rafId = requestAnimationFrame(tick);

    return () => {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("resize", handleResize);
    };
  }, [hideInteractive]);

  return (
    <div className="gradient-bg" ref={rootRef}>
      {/* SVG FILTERS */}
      <svg xmlns="http://www.w3.org/2000/svg" className="goo-svg">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 18 -8
              "
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
          </filter>
        </defs>
      </svg>

      {/* GRADIENT BUBBLES */}
      {!hideG6 && <div className="g6"></div>}
      <div className="gradients-container">
        <div className="g1"></div>
        <div className="g2"></div>
        <div className="g3"></div>
        <div className="g4"></div>
        <div className="g5"></div>


        {/* INTERACTIVE BUBBLE */}
        {/* <div className="interactive" ref={interactiveRef}></div> */}
        {!hideInteractive && <div className="interactive" ref={interactiveRef}></div>}
      </div>

      {/* NOISE OVERLAY */}
      <div className="noise-overlay"></div>
    </div>
  );
}


