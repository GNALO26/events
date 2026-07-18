import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const AnimatedSignature = ({ className = '', pathData }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className={className}>
      <motion.svg
        viewBox="0 0 400 100"
        className="w-64 md:w-80 h-auto text-blush dark:text-gold"
        initial={{ strokeDasharray: 500, strokeDashoffset: 500 }}
        animate={isInView ? { strokeDashoffset: 0 } : {}}
        transition={{ duration: 1.8, ease: 'easeInOut' }}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={pathData || "M20,80 C50,60 60,20 100,40 C140,60 120,90 150,70 C180,50 200,20 230,50 C260,80 240,80 270,60 C300,40 320,30 350,50"} />
      </motion.svg>
    </div>
  );
};

export default AnimatedSignature;