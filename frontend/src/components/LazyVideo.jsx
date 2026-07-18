import { useRef, useState, useEffect } from 'react';

const LazyVideo = ({ src, poster, fallbackPoster, className, ...videoProps }) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Détection Data Saver (si supporté)
    if (navigator.connection && navigator.connection.saveData) {
      setUseFallback(true);
    }
  }, []);

  // Sur mobile, on peut aussi proposer un bouton pour lancer la vidéo (optionnel)
  const [userInitiated, setUserInitiated] = useState(false);

  const shouldShowVideo = isVisible && !useFallback;

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {shouldShowVideo ? (
        <video
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          {...videoProps}
          className="w-full h-full object-cover"
        />
      ) : (
        <div
          className="relative w-full h-full cursor-pointer"
          onClick={() => {
            if (useFallback) {
              setUserInitiated(true);
            }
          }}
        >
          <img
            src={fallbackPoster || poster}
            alt="Video preview"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {useFallback && !userInitiated && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <button
                className="bg-white/80 backdrop-blur-sm text-anthracite px-4 py-2 rounded-full font-medium hover:bg-white transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setUseFallback(false);
                  setUserInitiated(true);
                }}
              >
                Lancer la vidéo
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LazyVideo;