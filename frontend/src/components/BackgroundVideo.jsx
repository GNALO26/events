const BackgroundVideo = ({ videoSrc, children, overlayClass = "bg-black/40 backdrop-blur-sm" }) => {
  return (
    <div className="relative w-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={videoSrc}
      />
      <div className={`absolute inset-0 ${overlayClass}`} />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BackgroundVideo;