import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';

const ShaderPlane = ({ onComplete }) => {
  // Composant simple, pas besoin de useFrame dans cette version simplifiée
  return (
    <mesh>
      <planeGeometry args={[20, 20]} />
      <meshBasicMaterial color="white" transparent opacity={1} />
    </mesh>
  );
};

const IntroAnimation = ({ onFinish }) => {
  const [show, setShow] = useState(() => !sessionStorage.getItem('intro-played'));

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        sessionStorage.setItem('intro-played', 'true');
        setShow(false);
        onFinish && onFinish();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.2, transition: { duration: 0.8, ease: 'easeInOut' } }}
        >
          <Canvas>
            <ambientLight />
            <ShaderPlane />
          </Canvas>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;