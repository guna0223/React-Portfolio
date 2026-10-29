import React, { useRef, useState, useEffect } from 'react';
import bgVideo from '../../assets/bg-video/bg-video.mp4';
import { useThemeMode } from '../../context/ThemeModeContext';
import './VideoBackground.css';

/**
 * VideoBackground — Cinematic Video Backdrop
 * Plays the Madara blood-moon animated loop with frosted glass vignette,
 * seamless bottom gradient fade, and executive/shinobi theme filters.
 */
const VideoBackground = ({ isEnabled = true, isDimmed = false }) => {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { themeMode } = useThemeMode();

  useEffect(() => {
    if (videoRef.current) {
      if (isEnabled) {
        videoRef.current.play().catch(() => {
          // Autoplay policy fallback
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isEnabled]);

  return (
    <div
      className={`cinematic-video-wrapper ${!isEnabled ? 'is-disabled' : ''} ${
        isDimmed ? 'is-dimmed' : ''
      } theme-${themeMode}`}
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        src={bgVideo}
        className={`cinematic-video-element ${isLoaded ? 'is-ready' : ''}`}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        onLoadedData={() => setIsLoaded(true)}
      />

      {/* Layered cinematic grading filters */}
      <div className="video-overlay-vignette" />
      <div className="video-overlay-scanlines" />
      <div className="video-overlay-gradient-top" />
      <div className="video-overlay-gradient-bottom" />
    </div>
  );
};

export default VideoBackground;
