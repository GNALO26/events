import { useEffect, useRef } from 'react';

const Fireworks = ({ trigger, className }) => {
  const canvasRef = useRef(null);
  const animFrame = useRef(null);

  useEffect(() => {
    if (!trigger) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth || 200;
    canvas.height = canvas.offsetHeight || 200;

    const particles = Array.from({ length: 60 }, () => ({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 6,
      vy: (Math.random() - 0.5) * 6,
      size: Math.random() * 3 + 1,
      color: `hsl(${Math.random() * 60 + 30}, 100%, 70%)`,
      alpha: 1,
      life: 1,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.life -= 0.008;
        p.alpha = p.life;
        if (p.life > 0) {
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      animFrame.current = requestAnimationFrame(animate);
      if (particles.every((p) => p.life <= 0)) {
        cancelAnimationFrame(animFrame.current);
      }
    };

    animate();

    return () => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, [trigger]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default Fireworks;