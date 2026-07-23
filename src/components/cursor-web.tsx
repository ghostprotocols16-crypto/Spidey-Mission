import { useEffect, useRef } from "react";

export function CursorWebTrail() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    type P = { x: number; y: number; life: number; vx: number; vy: number };
    const particles: P[] = [];
    let last = { x: -100, y: -100 };

    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - last.x;
      const dy = e.clientY - last.y;
      const d = Math.hypot(dx, dy);
      if (d > 4) {
        particles.push({
          x: e.clientX,
          y: e.clientY,
          life: 1,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
        });
        last = { x: e.clientX, y: e.clientY };
      }
    };
    window.addEventListener("mousemove", onMove);

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= 0.02;
        p.x += p.vx;
        p.y += p.vy;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.2 * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `oklch(0.14 0.02 40 / ${0.55 * p.life})`;
        ctx.fill();
        // connect to prev
        const q = particles[i - 1];
        if (q) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `oklch(0.14 0.02 40 / ${0.25 * p.life})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 z-50 hidden md:block"
      aria-hidden
    />
  );
}
