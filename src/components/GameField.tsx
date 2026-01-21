import { GROUND, NET_X, FIELD_LEFT, FIELD_RIGHT, NET_TOP, NET_HEIGHT } from '../constants/gameConstants';
import { Ball as BallType, Player as PlayerType, Effect, GameMode } from '../types';
import Player from './Player';
import Ball from './Ball';
import Effects from './Effects';
import GameOverlay from './GameOverlay';
import { cpuColors } from '../constants/gameConstants';

interface GameFieldProps {
  ball: BallType;
  player1: PlayerType;
  player2: PlayerType;
  effects: Effect[];
  gameStarted: boolean;
  winner: string | null;
  paused: boolean;
  gameMode: GameMode;
  storyLevel?: number;
  cpuLevel?: number;
  onStartGame: () => void;
  onPause: () => void;
  onBackToMenu: () => void;
  onNextLevel?: () => void;
}

export default function GameField({
  ball,
  player1,
  player2,
  effects,
  gameStarted,
  winner,
  paused,
  gameMode,
  storyLevel,
  cpuLevel,
  onStartGame,
  onPause,
  onBackToMenu,
  onNextLevel
}: GameFieldProps) {
  const getCpuColor = () => {
    if (gameMode === 'story' && storyLevel) {
      return cpuColors[storyLevel - 1];
    }
    if (gameMode === '1player' && cpuLevel) {
      return cpuColors[cpuLevel - 1];
    }
    return undefined;
  };

  return (
    <div
      className="relative bg-gradient-to-b from-sky-400 to-sky-200 rounded-lg overflow-hidden"
      style={{ width: 900, height: 350 }}
    >
      {/* Sun */}
      <div
        className="absolute w-12 h-12 bg-yellow-300 rounded-full shadow-lg"
        style={{ top: 15, right: 25 }}
      />

      {/* Ground */}
      <div
        className="absolute bg-yellow-600"
        style={{ left: 0, top: GROUND + 20, width: '100%', height: 50 }}
      />
      <div
        className="absolute bg-yellow-500"
        style={{ left: 0, top: GROUND + 20, width: '100%', height: 30 }}
      />

      {/* Field boundaries */}
      <div
        className="absolute bg-white/70"
        style={{ left: FIELD_LEFT, top: GROUND + 18, width: 4, height: 22 }}
      />
      <div
        className="absolute bg-white/70"
        style={{ left: FIELD_RIGHT - 4, top: GROUND + 18, width: 4, height: 22 }}
      />

      {/* Net */}
      <div
        className="absolute bg-white"
        style={{ left: NET_X - 3, top: NET_TOP, width: 6, height: NET_HEIGHT + 30 }}
      />

      <Effects effects={effects} />
      <Player player={player1} isRed={true} />
      <Player player={player2} isRed={false} cpuColor={getCpuColor()} />
      <Ball ball={ball} />

      <GameOverlay
        gameStarted={gameStarted}
        winner={winner}
        paused={paused}
        gameMode={gameMode}
        storyLevel={storyLevel}
        onStartGame={onStartGame}
        onPause={onPause}
        onBackToMenu={onBackToMenu}
        onNextLevel={onNextLevel}
      />
    </div>
  );
}
