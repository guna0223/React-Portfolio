import { useEffect, useRef, useState } from 'react';
import '../components/css/NotFound.css';

// ============================================
// CUSTOM IMAGE PLACEHOLDERS - Upload your sprites
// ============================================

// Player sprite image
const playerImage = new Image();
playerImage.src = "images/gameimage/super.png";

// Crab enemy sprite (fast small enemy)
const crabEnemyImage = new Image();
crabEnemyImage.src = "images/gameimage/crab.png";

// Turtle enemy sprite (larger, slower)
const turtleEnemyImage = new Image();
turtleEnemyImage.src = "images/gameimage/turtle.png";

// Background image (sky/scene)
const backgroundImage = new Image();
backgroundImage.src = "images/gameimage/bg.png";

// Ground texture image
const groundImage = new Image();
groundImage.src = "images/gameimage/ground.png";

// ============================================
// MARIO COLOR PALETTE (fallback if no images)
// ============================================
const COLORS = {
  sky: '#87CEEB',
  marioRed: '#E52521',
  marioBlue: '#049CD8',
  marioYellow: '#FFD700',
  grassGreen: '#43B047',
  groundBrown: '#8B5A2B',
  cloudWhite: '#FFFFFF'
};

// Game constants
const GRAVITY = 0.6;
const JUMP_STRENGTH = -13;
const CRAB_SPEED = 6;
const TURTLE_SPEED = 3;
const SPAWN_RATE = 1800;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 300;

const NotFound = () => {
  const canvasRef = useRef(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameKey, setGameKey] = useState(0); // Used to force game restart
  
  // Refs for animation control
  const animationFrameRef = useRef(null);
  const spawnTimerRef = useRef(null);
  const gameStateRef = useRef(null);

  // Initialize game state
  const initGameState = () => {
    const groundY = CANVAS_HEIGHT - 50;
    
    // Initialize clouds
    const clouds = [];
    for (let i = 0; i < 5; i++) {
      clouds.push({
        x: Math.random() * CANVAS_WIDTH,
        y: 20 + Math.random() * 80,
        width: 60 + Math.random() * 40,
        speed: 0.3 + Math.random() * 0.3
      });
    }
    
    return {
      player: {
        x: 50,
        y: groundY - 32,
        width: 32,
        height: 32,
        velocityY: 0,
        isJumping: false
      },
      enemies: [],
      clouds: clouds,
      groundY: groundY,
      score: 0,
      groundOffset: 0
    };
  };

  // Spawn enemy
  const spawnEnemy = (state) => {
    const isCrab = Math.random() > 0.5;
    state.enemies.push({
      x: CANVAS_WIDTH,
      y: state.groundY - (isCrab ? 25 : 35),
      width: isCrab ? 25 : 30,
      height: isCrab ? 25 : 35,
      type: isCrab ? 'crab' : 'turtle',
      speed: isCrab ? CRAB_SPEED : TURTLE_SPEED,
      frame: 0,
      passed: false
    });
  };

  // Draw cloud
  const drawCloud = (ctx, cloud) => {
    ctx.fillStyle = COLORS.cloudWhite;
    ctx.beginPath();
    ctx.arc(cloud.x, cloud.y, cloud.width * 0.3, 0, Math.PI * 2);
    ctx.arc(cloud.x + cloud.width * 0.25, cloud.y - 5, cloud.width * 0.25, 0, Math.PI * 2);
    ctx.arc(cloud.x + cloud.width * 0.5, cloud.y, cloud.width * 0.3, 0, Math.PI * 2);
    ctx.fill();
  };

  // Draw player fallback
  const drawPlayerFallback = (ctx, player) => {
    ctx.fillStyle = COLORS.marioRed;
    ctx.fillRect(player.x + 4, player.y + 10, 24, 14);
    ctx.fillStyle = '#FFCC99';
    ctx.fillRect(player.x + 8, player.y, 16, 12);
    ctx.fillStyle = COLORS.marioRed;
    ctx.fillRect(player.x + 6, player.y, 20, 6);
    ctx.fillRect(player.x + 22, player.y + 2, 8, 4);
    ctx.fillStyle = COLORS.marioBlue;
    ctx.fillRect(player.x + 6, player.y + 20, 20, 12);
    ctx.fillStyle = COLORS.marioYellow;
    ctx.fillRect(player.x + 10, player.y + 22, 4, 4);
    ctx.fillRect(player.x + 18, player.y + 22, 4, 4);
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(player.x + 2, player.y + 28, 12, 4);
    ctx.fillRect(player.x + 18, player.y + 28, 12, 4);
  };

  // Draw crab fallback
  const drawCrabFallback = (ctx, enemy) => {
    ctx.fillStyle = '#FF6B6B';
    ctx.fillRect(enemy.x, enemy.y + 5, enemy.width, enemy.height - 5);
    ctx.fillStyle = '#CC0000';
    ctx.fillRect(enemy.x + 4, enemy.y + 8, enemy.width - 8, 8);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(enemy.x + 4, enemy.y, 6, 6);
    ctx.fillRect(enemy.x + 14, enemy.y, 6, 6);
    ctx.fillStyle = '#000000';
    ctx.fillRect(enemy.x + 6, enemy.y + 2, 3, 3);
    ctx.fillRect(enemy.x + 16, enemy.y + 2, 3, 3);
    ctx.fillStyle = '#FF6B6B';
    if (Math.floor(enemy.frame / 10) % 2 === 0) {
      ctx.fillRect(enemy.x - 4, enemy.y + 8, 6, 4);
      ctx.fillRect(enemy.x + enemy.width - 2, enemy.y + 8, 6, 4);
    } else {
      ctx.fillRect(enemy.x - 4, enemy.y + 12, 6, 4);
      ctx.fillRect(enemy.x + enemy.width - 2, enemy.y + 12, 6, 4);
    }
  };

  // Draw turtle fallback
  const drawTurtleFallback = (ctx, enemy) => {
    ctx.fillStyle = '#228B22';
    ctx.beginPath();
    ctx.arc(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2 + 2, enemy.width / 2, Math.PI, 0);
    ctx.fill();
    ctx.fillRect(enemy.x, enemy.y + enemy.height / 2, enemy.width, enemy.height / 2);
    ctx.fillStyle = '#006400';
    ctx.fillRect(enemy.x + 4, enemy.y + 10, enemy.width - 8, 4);
    ctx.fillRect(enemy.x + 8, enemy.y + 18, enemy.width - 16, 4);
    ctx.fillStyle = '#90EE90';
    ctx.fillRect(enemy.x + enemy.width - 8, enemy.y, 12, 10);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(enemy.x + enemy.width - 4, enemy.y + 2, 4, 4);
    ctx.fillStyle = '#000000';
    ctx.fillRect(enemy.x + enemy.width - 2, enemy.y + 3, 2, 2);
  };

  // Handle jump
  const handleJump = () => {
    if (!gameStateRef.current) return;
    const player = gameStateRef.current.player;
    if (!player.isJumping) {
      player.velocityY = JUMP_STRENGTH;
      player.isJumping = true;
    }
  };

  // Handle restart - force component to re-render with new gameKey
  const handleRestart = () => {
    // Clear any existing animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (spawnTimerRef.current) {
      clearInterval(spawnTimerRef.current);
      spawnTimerRef.current = null;
    }
    
    // Force re-render to start fresh
    setGameKey(prev => prev + 1);
    setGameOver(false);
    setScore(0);
  };

  // Main game effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Initialize game state
    gameStateRef.current = initGameState();
    let isRunning = true;
    
    // Start spawning enemies
    spawnTimerRef.current = setInterval(() => {
      if (isRunning && gameStateRef.current) {
        spawnEnemy(gameStateRef.current);
      }
    }, SPAWN_RATE);
    
    // Game loop
    const gameLoop = () => {
      if (!isRunning || !gameStateRef.current) return;
      
      const state = gameStateRef.current;
      const player = state.player;
      
      // Clear and draw background
      try {
        ctx.drawImage(backgroundImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      } catch (e) {
        ctx.fillStyle = COLORS.sky;
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      }
      
      // Draw and update clouds
      state.clouds.forEach(cloud => {
        cloud.x -= cloud.speed;
        if (cloud.x + cloud.width < 0) {
          cloud.x = CANVAS_WIDTH;
          cloud.y = 20 + Math.random() * 80;
        }
        drawCloud(ctx, cloud);
      });
      
      // Draw ground
      state.groundOffset = (state.groundOffset + 2) % 40;
      
      if (groundImage.complete && groundImage.naturalWidth > 0) {
        try {
          for (let i = -1; i < CANVAS_WIDTH / groundImage.width + 1; i++) {
            const x = i * groundImage.width - (state.groundOffset % groundImage.width);
            ctx.drawImage(groundImage, x, state.groundY, groundImage.width, 50);
          }
        } catch (e) {
          ctx.fillStyle = COLORS.groundBrown;
          ctx.fillRect(0, state.groundY + 10, CANVAS_WIDTH, 40);
          ctx.fillStyle = COLORS.grassGreen;
          ctx.fillRect(0, state.groundY, CANVAS_WIDTH, 12);
          ctx.fillStyle = '#2E7D32';
          for (let i = -1; i < CANVAS_WIDTH / 40 + 1; i++) {
            const x = i * 40 - state.groundOffset;
            ctx.fillRect(x, state.groundY + 8, 8, 4);
            ctx.fillRect(x + 20, state.groundY + 4, 6, 4);
          }
        }
      } else {
        ctx.fillStyle = COLORS.groundBrown;
        ctx.fillRect(0, state.groundY + 10, CANVAS_WIDTH, 40);
        ctx.fillStyle = COLORS.grassGreen;
        ctx.fillRect(0, state.groundY, CANVAS_WIDTH, 12);
        ctx.fillStyle = '#2E7D32';
        for (let i = -1; i < CANVAS_WIDTH / 40 + 1; i++) {
          const x = i * 40 - state.groundOffset;
          ctx.fillRect(x, state.groundY + 8, 8, 4);
          ctx.fillRect(x + 20, state.groundY + 4, 6, 4);
        }
      }
      
      // Update player physics
      player.velocityY += GRAVITY;
      player.y += player.velocityY;
      
      if (player.y + player.height >= state.groundY) {
        player.y = state.groundY - player.height;
        player.velocityY = 0;
        player.isJumping = false;
      }
      
      // Draw player
      try {
        ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
      } catch (e) {
        drawPlayerFallback(ctx, player);
      }
      
      // Update and draw enemies
      state.enemies = state.enemies.filter(enemy => {
        enemy.x -= enemy.speed;
        enemy.frame++;
        
        if (enemy.type === 'crab') {
          try {
            ctx.drawImage(crabEnemyImage, enemy.x, enemy.y, enemy.width, enemy.height);
          } catch (e) {
            drawCrabFallback(ctx, enemy);
          }
        } else {
          try {
            ctx.drawImage(turtleEnemyImage, enemy.x, enemy.y, enemy.width, enemy.height);
          } catch (e) {
            drawTurtleFallback(ctx, enemy);
          }
        }
        
        // Check if enemy passed player (successfully jumped over)
        if (!enemy.passed && enemy.x + enemy.width < player.x) {
          enemy.passed = true;
          state.score += 1;
        }
        
        // Collision detection
        const padding = 4;
        if (
          player.x + padding < enemy.x + enemy.width - padding &&
          player.x + player.width - padding > enemy.x + padding &&
          player.y + padding < enemy.y + enemy.height - padding &&
          player.y + player.height - padding > enemy.y + padding
        ) {
          // Game over
          isRunning = false;
          
          if (spawnTimerRef.current) {
            clearInterval(spawnTimerRef.current);
            spawnTimerRef.current = null;
          }
          
          setGameOver(true);
          return false;
        }
        
        return enemy.x + enemy.width > 0;
      });
      
      // Update score display
      setScore(state.score);
      
      // Draw score
      ctx.fillStyle = COLORS.marioYellow;
      ctx.font = 'bold 20px "Press Start 2P", monospace';
      ctx.fillText(`Score: ${state.score}`, CANVAS_WIDTH - 180, 35);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(CANVAS_WIDTH - 190, 15, 175, 30);
      
      // Continue loop
      if (isRunning) {
        animationFrameRef.current = requestAnimationFrame(gameLoop);
      }
    };
    
    // Start game loop
    animationFrameRef.current = requestAnimationFrame(gameLoop);
    
    // Cleanup
    return () => {
      isRunning = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (spawnTimerRef.current) {
        clearInterval(spawnTimerRef.current);
      }
    };
  }, [gameKey]); // Re-run when gameKey changes (on restart)

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (gameOver) {
          handleRestart();
        } else {
          handleJump();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver]);

  // Handle offline detection
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="notfound-container" key={gameKey}>
      {isOffline && (
        <div className="offline-badge">
          <span className="offline-dot"></span>
          OFFLINE MODE
        </div>
      )}
      
      <div className="notfound-content">
        <h1 className="notfound-title">404 - Page Not Found</h1>
        <p className="notfound-subtitle">Looks like you are lost! Play a game while you're here.</p>
        
        <div className="game-container">
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            className="game-canvas"
          />
          
          <div className="game-instructions">
            <span className="key-hint">Press SPACE to Jump</span>
          </div>

          {gameOver && (
            <div className="game-over-overlay">
              <h2 className="game-over-title">GAME OVER</h2>
              <p className="final-score">Score: {score}</p>
              <button className="restart-btn" onClick={handleRestart}>
                Restart Game
              </button>
              <p className="restart-hint">Press SPACE to restart</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
