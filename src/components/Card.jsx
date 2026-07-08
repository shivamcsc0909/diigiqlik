import React, { useRef, useEffect } from 'react';

const Card = ({ title, desc, img, video }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Only try to play if video is actually paused to avoid redundant calls
            if (videoRef.current.paused) {
              videoRef.current.play().catch((err) => {
                console.warn('Autoplay prevented or interrupted:', err);
              });
            }
          } else {
            videoRef.current.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(videoRef.current);

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [video]);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.muted = true;
    }
  };

  return (
    <div 
      className="custom-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="custom-card-img-wrapper">
        {video ? (
          <video 
            ref={videoRef}
            src={video} 
            className="custom-card-img"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
        ) : (
          <img src={img} alt={title} className="custom-card-img" />
        )}
      </div>
      <div className="custom-card-content">
        <h3 className="custom-card-title">{title}</h3>
        <p className="custom-card-desc">{desc}</p>
        <button className="custom-card-btn">Learn More</button>
      </div>
    </div>
  );
};

export default Card;
