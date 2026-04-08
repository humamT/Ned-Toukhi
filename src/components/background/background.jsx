import { useEffect, useRef } from "react";
import "./background.scss";

export default function Background({ hideInteractive = false, hideG6 = false }) {
  const interactiveRef = useRef(null);

  useEffect(() => {
    const interBubble = interactiveRef.current;
    if (!interBubble) return;

    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    // Bubble physics setup (without interactive bubble)
    const bubbles = [
      { el: document.querySelector('.g1'), x: window.innerWidth * 0.85, y: window.innerHeight * 0.1, vx: 1.2, vy: 0.8, radius: window.innerWidth * 0.15 },
      { el: document.querySelector('.g2'), x: window.innerWidth * 0.15, y: window.innerHeight * 0.8, vx: -0.9, vy: -1.1, radius: window.innerWidth * 0.15 },
      { el: document.querySelector('.g3'), x: window.innerWidth * 0.85, y: window.innerHeight * 0.8, vx: -1.1, vy: 0.7, radius: window.innerWidth * 0.15 },
      { el: document.querySelector('.g4'), x: window.innerWidth * 0.5, y: window.innerHeight * 0.1, vx: 0.7, vy: 1.3, radius: window.innerWidth * 0.15 },
      { el: document.querySelector('.g5'), x: window.innerWidth * 0.15, y: window.innerHeight * 0.1, vx: 1.0, vy: 1.0, radius: window.innerWidth * 0.3 }
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

        // Update DOM
        if (bubble.el) {
          bubble.el.style.left = `${bubble.x}px`;
          bubble.el.style.top = `${bubble.y}px`;
          bubble.el.style.transform = 'translate(-50%, -50%)';
        }
      });
    }

    function move() {
      // Smooth cursor following for interactive bubble
      curX += (tgX - curX) / 50;
      curY += (tgY - curY) / 50;

      interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;

      updateBubbles();
      requestAnimationFrame(move);
    }

    const handleMouseMove = (e) => {
      tgX = e.clientX;
      tgY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    move();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="gradient-bg">
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


