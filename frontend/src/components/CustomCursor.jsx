import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hoverType, setHoverType] = useState('default'); // 'default', 'link', 'image', 'text'

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window;
    if (isTouchDevice) return;

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target;
      if (target.closest('a, button')) setHoverType('link');
      else if (target.closest('img')) setHoverType('image');
      else if (target.closest('input, textarea')) setHoverType('text');
      else setHoverType('default');
    };

    window.addEventListener('mousemove', onMouseMove);
    document.body.style.cursor = 'none';
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.style.cursor = '';
    };
  }, []);

  const cursorVariants = {
    default: { scale: 1, borderRadius: '50%', border: '2px solid #D4AF37', background: 'transparent' },
    link: { scale: 1.5, borderRadius: '0%', border: '2px solid #D4AF37', background: 'rgba(212,175,55,0.2)' },
    image: { scale: 2, borderRadius: '50%', border: '2px solid #D4AF37', background: 'rgba(255,255,255,0.8)' },
    text: { scale: 1.2, borderRadius: '0%', border: '2px solid #D4AF37', background: 'transparent' },
  };

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999] w-8 h-8 flex items-center justify-center"
      style={{ left: position.x - 16, top: position.y - 16 }}
      variants={cursorVariants}
      animate={hoverType}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
    >
      {/* diamant central */}
      <motion.div
        className="w-1.5 h-1.5 bg-champagne rotate-45"
        animate={{ scale: hoverType === 'link' ? 0 : 1 }}
      />
    </motion.div>
  );
};

export default CustomCursor;