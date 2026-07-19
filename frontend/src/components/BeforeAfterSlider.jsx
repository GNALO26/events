import { useState, useRef } from 'react';

const BeforeAfterSlider = ({ beforeSrc, afterSrc, beforeAlt, afterAlt }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    setSliderPos(Math.max(0, Math.min(100, (x / rect.width) * 100)));
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-xl select-none cursor-col-resize border border-gray-200 dark:border-gray-700"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      {/* Image "après" (pleine largeur) */}
      <img
        src={afterSrc}
        alt={afterAlt}
        className="w-full h-auto object-cover"
        draggable="false"
      />

      {/* Image "avant" masquée à droite du slider */}
      <div
        className="absolute top-0 left-0 h-full overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        <img
          src={beforeSrc}
          alt={beforeAlt}
          className="absolute top-0 left-0 w-auto min-w-full h-full object-cover"
          draggable="false"
        />
      </div>

      {/* Ligne de séparation */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white dark:bg-gray-200 shadow-md pointer-events-none"
        style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
      />

      {/* Poignée centrale */}
      <div
        className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-white dark:bg-gray-100 rounded-full shadow-lg flex items-center justify-center pointer-events-none"
        style={{ left: `${sliderPos}%`, transform: 'translate(-50%, -50%)' }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-gray-600 dark:text-gray-800"
        >
          <polyline points="15 18 9 12 15 6" />
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;