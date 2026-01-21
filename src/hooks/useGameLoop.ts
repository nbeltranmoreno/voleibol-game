import { useEffect, useRef } from 'react';
import { Ball, Player, Keys, Effect, GameMode } from '../types';
import {
  GROUND,
  NET_X,
  FIELD_LEFT,
  FIELD_RIGHT,
  FIELD_TOP,
  NET_TOP,
  NET_HEIGHT,
  JUMP_HEIGHT,
  COOLDOWN_TIME,
  DIVE_COOLDOWN,
  WINNING_SCORE,
  GAME_FPS
} from '../constants/gameConstants';
import { getCPUDifficulty } from '../utils/gameUtils';

interface UseGameLoopProps {
  gameStarted: boolean;
  winner: string | null;
  gameMode: GameMode;
  paused: boolean;
  keys: Keys;
  player1: Player;
  player2: Player;
  ball: Ball;
  storyLevel: number;
  cpuLevel: number;
  setPlayer1: React.Dispatch<React.SetStateAction<Player>>;
  setPlayer2: React.Dispatch<React.SetStateAction<Player>>;
  setBall: React.Dispatch<React.SetStateAction<Ball>>;
  setScore: React.Dispatch<React.SetStateAction<{ p1: number; p2: number }>>;
  setWinner: React.Dispatch<React.SetStateAction<string | null>>;
  setLastScorer: React.Dispatch<React.SetStateAction<number | null>>;
  addEffect: (x: number, y: number, type: Effect['type']) => void;
}

export const useGameLoop = ({
  gameStarted,
  winner,
  gameMode,
  paused,
  keys,
  player1,
  player2,
  ball,
  storyLevel,
  cpuLevel,
  setPlayer1,
  setPlayer2,
  setBall,
  setScore,
  setWinner,
  setLastScorer,
  addEffect
}: UseGameLoopProps) => {
  const ballRef = useRef(ball);
  const player2Ref = useRef(player2);

  useEffect(() => {
    ballRef.current = ball;
  }, [ball]);

  useEffect(() => {
    player2Ref.current = player2;
  }, [player2]);

  useEffect(() => {
    if (!gameStarted || winner || !gameMode || paused) return;
    const diff = getCPUDifficulty(gameMode === '1player' ? cpuLevel : storyLevel);

    const gameLoop = setInterval(() => {
      // Player 1 logic
      setPlayer1((prev) => {
        let newX = prev.x,
          newY = prev.y,
          special = prev.special;
        let cooldown = Math.max(0, prev.cooldown - 1);
        let diving = prev.diving,
          diveCooldown = Math.max(0, prev.diveCooldown - 1);
        let canJump = prev.canJump;
        let velY = prev.velY || 0;

        if (diving) {
          newX += 12;
          if (newX > NET_X - 50) newX = NET_X - 50;
        } else {
          if (keys['a'] && prev.x > FIELD_LEFT + 30) newX -= 6;
          if (keys['d'] && prev.x < NET_X - 50) newX += 6;

          if (keys['w'] && canJump && prev.y >= GROUND - 5) {
            velY = -18;
            canJump = false;
          }

          if (!keys['w'] && prev.y >= GROUND - 5) {
            canJump = true;
          }
        }

        velY += 1.5;
        newY += velY;

        if (newY < JUMP_HEIGHT) {
          newY = JUMP_HEIGHT;
          velY = 0;
        }

        if (newY >= GROUND) {
          newY = GROUND;
          velY = 0;
        }

        if (keys['e'] && cooldown === 0 && !diving) {
          special = true;
          cooldown = COOLDOWN_TIME;
          addEffect(prev.x, prev.y - 30, 'red');
          setTimeout(() => setPlayer1((p) => ({ ...p, special: false })), 300);
        }
        if (keys['q'] && diveCooldown === 0 && !diving && prev.y >= GROUND - 5) {
          diving = true;
          diveCooldown = DIVE_COOLDOWN;
          addEffect(prev.x + 30, prev.y, 'dust');
          setTimeout(() => setPlayer1((p) => ({ ...p, diving: false })), 400);
        }
        return { x: newX, y: newY, special, cooldown, diving, diveCooldown, canJump, velY };
      });

      // Player 2 logic
      setPlayer2((prev) => {
        let newX = prev.x,
          newY = prev.y,
          special = prev.special;
        let cooldown = Math.max(0, prev.cooldown - 1);
        let diving = prev.diving,
          diveCooldown = Math.max(0, prev.diveCooldown - 1);
        let canJump = prev.canJump;
        let velY = prev.velY || 0;

        if (gameMode === '1player' || gameMode === 'story') {
          const b = ballRef.current;
          if (!diving) {
            const targetX = b.x + b.vx * diff.predictionMultiplier;
            const shouldReact = Math.random() < diff.reactionChance;
            if (shouldReact && (b.x > NET_X - 50 || b.vx > 0)) {
              if (targetX > newX + 30 && newX < FIELD_RIGHT - 30) newX += diff.speed;
              else if (targetX < newX - 30 && newX > NET_X + 50) newX -= diff.speed;
            } else {
              const centerPos = (NET_X + FIELD_RIGHT) / 2;
              if (newX > centerPos + 10) newX -= 1;
              if (newX < centerPos - 10) newX += 1;
            }
            const distToBall = Math.sqrt((b.x - newX) ** 2 + (b.y - newY) ** 2);
            if (
              distToBall < 80 + storyLevel * 5 &&
              b.y < NET_TOP + 50 &&
              b.y > 80 &&
              prev.y >= GROUND - 5 &&
              canJump &&
              Math.random() < diff.jumpChance
            ) {
              velY = -18;
              canJump = false;
            }
            if (prev.y >= GROUND - 5) canJump = true;

            if (distToBall < 50 && cooldown === 0 && Math.random() < diff.specialChance) {
              special = true;
              cooldown = COOLDOWN_TIME;
              addEffect(newX, newY - 30, 'blue');
              setTimeout(() => setPlayer2((p) => ({ ...p, special: false })), 300);
            }
            if (
              b.y > 250 &&
              b.x > NET_X + 50 &&
              Math.abs(b.x - newX) > 60 &&
              Math.abs(b.x - newX) < 150 &&
              diveCooldown === 0 &&
              prev.y >= GROUND - 5 &&
              Math.random() < diff.diveChance
            ) {
              diving = true;
              diveCooldown = DIVE_COOLDOWN;
              addEffect(newX - 30, newY, 'dust');
              setTimeout(() => setPlayer2((p) => ({ ...p, diving: false })), 400);
            }
          } else {
            newX -= 12;
            if (newX < NET_X + 50) newX = NET_X + 50;
          }
        } else {
          if (diving) {
            newX -= 12;
            if (newX < NET_X + 50) newX = NET_X + 50;
          } else {
            if (keys['arrowleft'] && prev.x > NET_X + 50) newX -= 6;
            if (keys['arrowright'] && prev.x < FIELD_RIGHT - 30) newX += 6;

            if (keys['arrowup'] && canJump && prev.y >= GROUND - 5) {
              velY = -18;
              canJump = false;
            }

            if (!keys['arrowup'] && prev.y >= GROUND - 5) {
              canJump = true;
            }
          }
          if (keys['-'] && cooldown === 0 && !diving) {
            special = true;
            cooldown = COOLDOWN_TIME;
            addEffect(prev.x, prev.y - 30, 'blue');
            setTimeout(() => setPlayer2((p) => ({ ...p, special: false })), 300);
          }
          if (keys[','] && diveCooldown === 0 && !diving && prev.y >= GROUND - 5) {
            diving = true;
            diveCooldown = DIVE_COOLDOWN;
            addEffect(prev.x - 30, prev.y, 'dust');
            setTimeout(() => setPlayer2((p) => ({ ...p, diving: false })), 400);
          }
        }

        velY += 1.5;
        newY += velY;

        if (newY < JUMP_HEIGHT) {
          newY = JUMP_HEIGHT;
          velY = 0;
        }

        if (newY >= GROUND) {
          newY = GROUND;
          velY = 0;
        }
        return { x: newX, y: newY, special, cooldown, diving, diveCooldown, canJump, velY };
      });

      // Ball logic
      setBall((prev) => {
        let { x, y, vx, vy } = prev;
        const p1 = player1,
          p2 = player2Ref.current;

        x += vx;
        y += vy;
        vy += 0.15;

        if (y <= FIELD_TOP) {
          y = FIELD_TOP;
          vy = Math.abs(vy) * 0.8;
        }

        const netTop = NET_TOP;
        const netBottom = GROUND + 10;
        if (y > netTop && y < netBottom) {
          if (x >= NET_X - 20 && x <= NET_X && vx > 0) {
            x = NET_X - 20;
            vx = -Math.abs(vx) * 0.7;
          } else if (x <= NET_X + 20 && x >= NET_X && vx < 0) {
            x = NET_X + 20;
            vx = Math.abs(vx) * 0.7;
          } else if (x > NET_X - 15 && x < NET_X + 15) {
            if (vx >= 0) {
              x = NET_X + 20;
              vx = Math.abs(vx) * 0.5;
            } else {
              x = NET_X - 20;
              vx = -Math.abs(vx) * 0.5;
            }
          }
        }
        if (x > NET_X - 25 && x < NET_X + 25 && y > netTop - 15 && y < netTop + 10 && vy > 0) {
          y = netTop - 15;
          vy = -Math.abs(vy) * 0.5;
        }

        // Player 1 collision
        const hitRadius1 = p1.diving ? 45 : 35;
        const dx1 = x - p1.x,
          dy1 = y - (p1.diving ? p1.y + 10 : p1.y);
        const dist1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
        if (dist1 < hitRadius1 && dist1 > 0) {
          const angle = Math.atan2(dy1, dx1);
          const power = p1.special ? 9 : p1.diving ? 7 : 6;
          vx = Math.cos(angle) * power + (p1.diving ? 2 : 0);
          vy = Math.sin(angle) * power - (p1.special ? 3 : 1);
          x = p1.x + Math.cos(angle) * (hitRadius1 + 10);
          y = (p1.diving ? p1.y + 10 : p1.y) + Math.sin(angle) * (hitRadius1 + 10);
          if (p1.special || p1.diving) addEffect(x, y, 'hit');
        }

        // Player 2 collision
        const hitRadius2 = p2.diving ? 45 : 35;
        const dx2 = x - p2.x,
          dy2 = y - (p2.diving ? p2.y + 10 : p2.y);
        const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        if (dist2 < hitRadius2 && dist2 > 0) {
          const angle = Math.atan2(dy2, dx2);
          const power = p2.special ? 9 : p2.diving ? 7 : 6;
          vx = Math.cos(angle) * power - (p2.diving ? 2 : 0);
          vy = Math.sin(angle) * power - (p2.special ? 3 : 1);
          x = p2.x + Math.cos(angle) * (hitRadius2 + 10);
          y = (p2.diving ? p2.y + 10 : p2.y) + Math.sin(angle) * (hitRadius2 + 10);
          if (p2.special || p2.diving) addEffect(x, y, 'hit');
        }

        // Scoring
        if (y > GROUND + 10 || x < FIELD_LEFT - 10 || x > FIELD_RIGHT + 10) {
          if (x < FIELD_LEFT || (y > GROUND + 10 && x <= NET_X)) {
            setScore((s) => {
              const ns = { ...s, p2: s.p2 + 1 };
              if (ns.p2 >= WINNING_SCORE)
                setWinner(gameMode === '2players' ? 'Jugador 2' : 'CPU');
              return ns;
            });
            setLastScorer(2);
          } else if (x > FIELD_RIGHT || (y > GROUND + 10 && x > NET_X)) {
            setScore((s) => {
              const ns = { ...s, p1: s.p1 + 1 };
              if (ns.p1 >= WINNING_SCORE) setWinner('Jugador 1');
              return ns;
            });
            setLastScorer(1);
          }
          const toRight = x <= NET_X || x < FIELD_LEFT;
          return { x: NET_X, y: 80, vx: toRight ? 2 : -2, vy: 0.5 };
        }

        vx = Math.max(-10, Math.min(10, vx));
        vy = Math.max(-10, Math.min(10, vy));
        return { x, y, vx, vy };
      });
    }, 1000 / GAME_FPS);

    return () => clearInterval(gameLoop);
  }, [
    gameStarted,
    keys,
    winner,
    gameMode,
    player1,
    storyLevel,
    paused,
    cpuLevel,
    setPlayer1,
    setPlayer2,
    setBall,
    setScore,
    setWinner,
    setLastScorer,
    addEffect
  ]);
};
