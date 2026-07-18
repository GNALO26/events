import { useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2);

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/sounds/ambiance.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
    }
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="fixed bottom-20 right-6 z-40 flex items-center gap-2 bg-white/80 dark:bg-anthracite/80 backdrop-blur-sm p-2 rounded-full shadow-lg">
      <button onClick={togglePlay} className="p-2 text-blush hover:text-gold transition-colors" aria-label={playing ? 'Couper le son' : 'Activer la musique'}>
        {playing ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
      {playing && (
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(e) => {
            const vol = Number(e.target.value);
            setVolume(vol);
            if (audioRef.current) audioRef.current.volume = vol;
          }}
          className="w-20 accent-blush"
        />
      )}
    </div>
  );
};

export default AudioPlayer;