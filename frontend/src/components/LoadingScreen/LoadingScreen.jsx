import { useState, useEffect } from 'react';
import '../css/LoadingScreen.css';

const loadingMessages = [
  "COMPILING CODE...",
  "LOADING PORTFOLIO ASSETS...",
  "DEBUG MODE ENABLED",
  "INITIALIZING PLAYER...",
  "LOADING GAME DATA...",
  "RENDERING COMPONENTS...",
  "PARSING JSON DATA...",
  "ESTABLISHING CONNECTIONS...",
  "OPTIMIZING PERFORMANCE...",
  "ALMOST READY...",
  "PRESS START TO CONTINUE"
];

const pixelCharacter = [
  [0,1,1,1,1,0],
  [0,1,1,1,1,0],
  [0,0,1,1,0,0],
  [1,1,1,1,1,1],
  [0,1,0,0,1,0],
  [1,0,1,1,0,1],
  [1,0,1,1,0,1],
  [0,0,1,1,0,0]
];

const coinAnimation = [
  [0,0,1,1,0,0],
  [0,1,1,1,1,0],
  [1,1,0,0,1,1],
  [1,1,0,0,1,1],
  [1,1,0,0,1,1],
  [1,1,0,0,1,1],
  [0,1,1,1,1,0],
  [0,0,1,1,0,0]
];

function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showPressStart, setShowPressStart] = useState(false);
  const [pixelPos, setPixelPos] = useState(0);
  const [coinFrame, setCoinFrame] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setShowPressStart(true);
          return 100;
        }
        return prev + Math.random() * 20 + 0.5;
      });
    }, 100);

    // Cycle through messages
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex(prev => {
        if (prev >= loadingMessages.length - 2) {
          return loadingMessages.length - 2;
        }
        return prev + 1;
      });
    }, 800);

    // Animate pixel character
    const characterInterval = setInterval(() => {
      setPixelPos(prev => (prev + 1) % 20);
    }, 150);

    // Animate coin
    const coinInterval = setInterval(() => {
      setCoinFrame(prev => (prev + 1) % 4);
    }, 200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
      clearInterval(characterInterval);
      clearInterval(coinInterval);
    };
  }, []);

  const handleStart = () => {
    setIsComplete(true);
    setTimeout(() => {
      onComplete?.();
    }, 500);
  };

  // Generate pixel blocks for loading bar
  const totalBlocks = 20;
  const filledBlocks = Math.floor((progress / 100) * totalBlocks);

  if (isComplete) {
    return null;
  }

  return (
    <div className="loading-screen" onClick={handleStart}>
      {/* CRT Screen Effects */}
      <div className="crt-overlay"></div>
      <div className="scanlines"></div>
      <div className="screen-flicker"></div>
      
      {/* Content Container */}
      <div className="arcade-container">
        {/* Header */}
        <div className="arcade-header">
          <span className="neon-text cyan">◆ PORTFOLIO v1.0 ◆</span>
        </div>

        {/* Main Game Area */}
        <div className="game-screen">
          {/* Animated Character */}
          <div className="character-container">
            <div 
              className="pixel-character"
              style={{ transform: `translateX(${pixelPos * 5}px)` }}
            >
              {pixelCharacter.map((row, rowIndex) => (
                <div key={rowIndex} className="pixel-row">
                  {row.map((pixel, colIndex) => (
                    <div 
                      key={colIndex} 
                      className={`pixel ${pixel ? 'filled' : 'empty'}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="decorations">
            <div className="heart-container">
              <div className="pixel-heart">
                {[0,1,2,3,4,5,6,7].map(row => (
                  <div key={row} className="pixel-row">
                    {[0,1,2,3,4,5,6,7].map(col => {
                      const heart = [
                        [0,0,1,1,0,1,1,0],
                        [1,1,1,1,1,1,1,1],
                        [1,1,1,1,1,1,1,1],
                        [1,1,1,1,1,1,1,1],
                        [0,1,1,1,1,1,1,0],
                        [0,0,1,1,1,1,0,0],
                        [0,0,0,1,1,0,0,0],
                        [0,0,0,0,0,0,0,0]
                      ];
                      return (
                        <div 
                          key={col} 
                          className={`pixel ${heart[row][col] ? 'filled heart-color' : 'empty'}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div className="coin-container">
              <div className="pixel-coin">
                {coinAnimation.map((row, rowIndex) => (
                  <div key={rowIndex} className="pixel-row">
                    {row.map((pixel, colIndex) => (
                      <div 
                        key={colIndex} 
                        className={`pixel ${pixel ? 'filled coin-color' : 'empty'}`}
                        style={{
                          opacity: coinFrame === 1 || coinFrame === 3 ? 0.7 : 1,
                          transform: coinFrame === 1 ? 'scaleX(0.8)' : coinFrame === 3 ? 'scaleX(0.9)' : 'scaleX(1)'
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Loading Bar */}
        <div className="loading-section">
          <div className="loading-label">
            <span className="neon-text green">{loadingMessages[currentMessageIndex]}</span>
          </div>
          
          <div className="loading-bar-container">
            <div className="loading-bar-frame">
              {[...Array(totalBlocks)].map((_, index) => (
                <div 
                  key={index} 
                  className={`loading-block ${index < filledBlocks ? 'filled' : 'empty'} ${index < filledBlocks ? `delay-${index % 5}` : ''}`}
                />
              ))}
            </div>
          </div>

          <div className="progress-info">
            <span className="neon-text yellow">{Math.min(Math.floor(progress), 100)}%</span>
          </div>
        </div>

        {/* Sound Visualizer */}
        <div className="sound-bars">
          {[...Array(8)].map((_, index) => (
            <div 
              key={index} 
              className="sound-bar"
              style={{
                animationDelay: `${index * 0.1}s`,
                height: `${20 + Math.sin(Date.now() / 200 + index) * 15}px`
              }}
            />
          ))}
        </div>

        {/* Press Start Button */}
        {showPressStart && (
          <div className="press-start-container">
            <button className="press-start-btn" onClick={handleStart}>
              <span className="blink">PRESS START</span>
            </button>
            <div className="insert-coin">
              <span className="neon-text purple">◆ INSERT COIN ◆</span>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="arcade-footer">
          <span className="neon-text cyan">© PEACE DEVELOPER STUDIO</span>
          <div className="controls-hint">
            <span className="neon-text yellow">[CLICK TO START]</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
