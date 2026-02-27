import { useEffect, useRef, useState, useCallback } from 'react';
import './css/NotFound.css';

const NotFound = () => {
  const canvasRef = useRef(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  
  // Game state refs for animation loop
  const gameState = useRef({
    player: {
      x: 50,
      y: 0,
      width: 30,
      height: 30,
      velocityY: 0,
      isJumping: false
    },
    obstacles: [],
    groundY: 0,
    score: 0,
    isRunning: false,
    animationId: null
  });

  // Constants
  const GRAVITY = 0.6;
  const JUMP_STRENGTH = -12;
  const OBSTACLE_SPEED = 5;
  const SPAWN_RATE = 1500;
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 300;

  // Initialize game
  const initGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const groundY = CANVAS_HEIGHT - 50;

    gameState.current = {
      player: {
        x: 50,
        y: groundY - 30,
        width: 30,
        height: 30,
        velocityY: 0,
        isJumping: false
      },
      obstacles: [],
      groundY: groundY,
      score: 0,
      isRunning: true,
      animationId: null
    };

    setGameOver(false);
    setScore(0);

    // Start spawning obstacles
    gameState.current.spawnTimer = setInterval(() => {
      if (gameState.current.isRunning) {
        spawnObstacle();
      }
    }, SPAWN_RATE);
  }, []);

  // Spawn obstacle
  const spawnObstacle = () => {
    const heights = [30, 40, 50, 60];
    const randomHeight = heights[Math.floor(Math.random() * heights.length)];
    
    gameState.current.obstacles.push({
      x: CANVAS_WIDTH,
      y: gameState.current.groundY - randomHeight,
      width: 25,
      height: randomHeight,
      passed: false
    });
  };

  // Handle jump
  const handleJump = useCallback(() => {
    const player = gameState.current.player;
    if (!player.isJumping && gameState.current.isRunning) {
      player.velocityY = JUMP_STRENGTH;
      player.isJumping = true;
    }
  }, []);

  // Handle key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (gameOver) {
          initGame();
        } else {
          handleJump();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleJump, gameOver, initGame]);

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

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const gameLoop = () => {
      if (!gameState.current.isRunning) return;

      const state = gameState.current;
      const player = state.player;

      // Clear canvas
      ctx.fillStyle = '#0a0a0f';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Draw background grid (retro effect)
      ctx.strokeStyle = '#1a1a2e';
      ctx.lineWidth = 1;
      for (let i = 0; i < CANVAS_WIDTH; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, CANVAS_HEIGHT);
        ctx.stroke();
      }
      for (let i = 0; i < CANVAS_HEIGHT; i += 40) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(CANVAS_WIDTH, i);
        ctx.stroke();
      }

      // Draw ground
      ctx.fillStyle = '#2d1b4e';
      ctx.fillRect(0, state.groundY, CANVAS_WIDTH, 50);
      
      // Ground top line (neon)
      ctx.strokeStyle = '#ff00ff';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, state.groundY);
      ctx.lineTo(CANVAS_WIDTH, state.groundY);
      ctx.stroke();

      // Ground decoration (moving stars)
      ctx.fillStyle = '#ff00ff';
      const time = Date.now() / 50;
      for (let i = 0; i < 10; i++) {
        const x = ((i * 80 + time) % (CANVAS_WIDTH + 80)) - 40;
        ctx.fillRect(x, state.groundY + 15, 4, 4);
        ctx.fillRect(x + 40, state.groundY + 30, 3, 3);
      }

      // Update player physics
      player.velocityY += GRAVITY;
      player.y += player.velocityY;

      // Ground collision
      if (player.y + player.height >= state.groundY) {
        player.y = state.groundY - player.height;
        player.velocityY = 0;
        player.isJumping = false;
      }

      // Draw player (pixel character)
      // Body
      ctx.fillStyle = '#00ffff';
      ctx.fillRect(player.x, player.y, player.width, player.height);
      
      // Inner glow
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(player.x + 8, player.y + 8, player.width - 16, player.height - 16);
      
      // Eyes
      ctx.fillStyle = '#0a0a0f';
      ctx.fillRect(player.x + 6, player.y + 8, 6, 6);
      ctx.fillRect(player.x + 18, player.y + 8, 6, 6);

      // Update and draw obstacles
      state.obstacles = state.obstacles.filter(obstacle => {
        obstacle.x -= OBSTACLE_SPEED;

        // Draw obstacle (spike/asteroid style)
        ctx.fillStyle = '#ff3366';
        ctx.beginPath();
        ctx.moveTo(obstacle.x, obstacle.y + obstacle.height);
        ctx.lineTo(obstacle.x + obstacle.width / 2, obstacle.y);
        ctx.lineTo(obstacle.x + obstacle.width, obstacle.y + obstacle.height);
        ctx.closePath();
        ctx.fill();

        // Obstacle glow
        ctx.strokeStyle = '#ff6699';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Collision detection
        if (
          player.x < obstacle.x + obstacle.width &&
          player.x + player.width > obstacle.x &&
          player.y < obstacle.y + obstacle.height &&
          player.y + player.height > obstacle.y
        ) {
          // Game over
          state.isRunning = false;
          clearInterval(state.spawnTimer);
          setGameOver(true);
          return false;
        }

        // Remove off-screen obstacles
        return obstacle.x + obstacle.width > 0;
      });

      // Update score
      state.score += 1;
      setScore(Math.floor(state.score / 10));

      // Draw score
      ctx.fillStyle = '#00ff00';
      ctx.font = 'bold 20px "Press Start 2C", monospace';
      ctx.fillText(`SCORE: ${Math.floor(state.score / 10)}`, CANVAS_WIDTH - 200, 30);

      // Continue loop
      if (state.isRunning) {
        state.animationId = requestAnimationFrame(gameLoop);
      }
    };

    // Initialize and start game
    initGame();
    gameLoop();

    return () => {
      if (gameState.current.animationId) {
        cancelAnimationFrame(gameState.current.animationId);
      }
      if (gameState.current.spawnTimer) {
        clearInterval(gameState.current.spawnTimer);
      }
    };
  }, [initGame]);

  // Restart game
  const handleRestart = () => {
    initGame();
    // Restart the game loop
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const gameLoop = () => {
        if (!gameState.current.isRunning) return;

        const state = gameState.current;
        const player = state.player;

        // Clear canvas
        ctx.fillStyle = '#0a0a0f';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Draw background grid
        ctx.strokeStyle = '#1a1a2e';
        ctx.lineWidth = 1;
        for (let i = 0; i < CANVAS_WIDTH; i += 40) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i, CANVAS_HEIGHT);
          ctx.stroke();
        }
        for (let i = 0; i < CANVAS_HEIGHT; i += 40) {
          ctx.beginPath();
          ctx.moveTo(0, i);
          ctx.lineTo(CANVAS_WIDTH, i);
          ctx.stroke();
        }

        // Draw ground
        ctx.fillStyle = '#2d1b4e';
        ctx.fillRect(0, state.groundY, CANVAS_WIDTH, 50);
        ctx.strokeStyle = '#ff00ff';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0, state.groundY);
        ctx.lineTo(CANVAS_WIDTH, state.groundY);
        ctx.stroke();

        // Ground decoration
        ctx.fillStyle = '#ff00ff';
        const time = Date.now() / 50;
        for (let i = 0; i < 10; i++) {
          const x = ((i * 80 + time) % (CANVAS_WIDTH + 80)) - 40;
          ctx.fillRect(x, state.groundY + 15, 4, 4);
          ctx.fillRect(x + 40, state.groundY + 30, 3, 3);
        }

        // Update player
        player.velocityY += GRAVITY;
        player.y += player.velocityY;

        if (player.y + player.height >= state.groundY) {
          player.y = state.groundY - player.height;
          player.velocityY = 0;
          player.isJumping = false;
        }

        // Draw player
        ctx.fillStyle = '#00ffff';
        ctx.fillRect(player.x, player.y, player.width, player.height);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(player.x + 8, player.y + 8, player.width - 16, player.height - 16);
        ctx.fillStyle = '#0a0a0f';
        ctx.fillRect(player.x + 6, player.y + 8, 6, 6);
        ctx.fillRect(player.x + 18, player.y + 8, 6, 6);

        // Update and draw obstacles
        state.obstacles = state.obstacles.filter(obstacle => {
          obstacle.x -= OBSTACLE_SPEED;

          ctx.fillStyle = '#ff3366';
          ctx.beginPath();
          ctx.moveTo(obstacle.x, obstacle.y + obstacle.height);
          ctx.lineTo(obstacle.x + obstacle.width / 2, obstacle.y);
          ctx.lineTo(obstacle.x + obstacle.width, obstacle.y + obstacle.height);
          ctx.closePath();
          ctx.fill();
          ctx.strokeStyle = '#ff6699';
          ctx.lineWidth = 2;
          ctx.stroke();

          if (
            player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y
          ) {
            state.isRunning = false;
            clearInterval(state.spawnTimer);
            setGameOver(true);
            return false;
          }

          return obstacle.x + obstacle.width > 0;
        });

        state.score += 1;
        setScore(Math.floor(state.score / 10));

        ctx.fillStyle = '#00ff00';
        ctx.font = 'bold 20px "Press Start 2C", monospace';
        ctx.fillText(`SCORE: ${Math.floor(state.score / 10)}`, CANVAS_WIDTH - 200, 30);

        if (state.isRunning) {
          state.animationId = requestAnimationFrame(gameLoop);
        }
      };
      gameLoop();
    }
  };

  return (
    <div className="notfound-container">
      {isOffline && (
        <div className="offline-badge">
          <span className="offline-dot"></span>
          OFFLINE MODE
        </div>
      )}
      
      <div className="notfound-content">
        <h1 className="notfound-title">404 - Page Not Found</h1>
        <p className="notfound-subtitle">You seem lost. Play a game while you're here!</p>
        
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
              <p className="final-score">Final Score: {score}</p>
              <button className="restart-btn" onClick={handleRestart}>
                RESTART
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
