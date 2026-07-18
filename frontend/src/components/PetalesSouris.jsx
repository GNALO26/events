import { useEffect, useRef } from 'react';

const PetalesSouris = () => {
  const canvasRef = useRef(null);
  const petals = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animFrame;
    const isTouchDevice = 'ontouchstart' in window;
    if (isTouchDevice) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const createPetal = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 8 + 4,
      speedX: Math.random() * 0.5 - 0.25,
      speedY: Math.random() * 0.5 + 0.2,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: Math.random() * 0.02 - 0.01,
    });

    for (let i = 0; i < 30; i++) petals.current.push(createPetal());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(212, 175, 55, 0.7)';
      petals.current.forEach((p) => {
        // attraction vers la souris avec un retard
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        p.x += dx * 0.02 + p.speedX;
        p.y += dy * 0.02 + p.speedY;
        p.rotation += p.rotationSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      animFrame = requestAnimationFrame(animate);
    };

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      aria-hidden="true"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
};

export default PetalesSouris;