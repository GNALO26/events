import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const targetDate = new Date('2026-09-30T12:00:00');

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const items = [
    { value: timeLeft.days, label: 'Jours' },
    { value: timeLeft.hours, label: 'Heures' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Secondes' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/90 dark:bg-anthracite/90 backdrop-blur-md border border-blush/20 rounded-xl py-6 px-4 max-w-3xl mx-auto -mt-16 relative z-10 shadow-2xl"
    >
      <p className="text-center text-sm uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400 mb-4">
        Prochain grand jour
      </p>
      <div className="flex justify-center items-center gap-4 md:gap-8">
        {items.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <span className="text-3xl md:text-5xl font-serif font-bold text-blush dark:text-gold tabular-nums">
              {String(item.value).padStart(2, '0')}
            </span>
            <span className="text-xs md:text-sm uppercase tracking-wider text-gray-600 dark:text-gray-300 mt-1">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Countdown;