import { WINNING_SCORE } from '../constants/gameConstants';
import { GameMode } from '../types';

interface GameOverlayProps {
  gameStarted: boolean;
  winner: string | null;
  paused: boolean;
  gameMode: GameMode;
  storyLevel?: number;
  onStartGame: () => void;
  onPause: () => void;
  onBackToMenu: () => void;
  onNextLevel?: () => void;
}

export default function GameOverlay({
  gameStarted,
  winner,
  paused,
  gameMode,
  storyLevel,
  onStartGame,
  onPause,
  onBackToMenu,
  onNextLevel
}: GameOverlayProps) {
  if (paused) {
    return (
      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-10">
        <h2 className="text-4xl font-bold text-white mb-4">⏸ PAUSA</h2>
        <div className="flex flex-col gap-2">
          <button
            onClick={onPause}
            className="px-6 py-2 bg-green-500 text-white font-bold rounded-lg"
          >
            ▶ Continuar
          </button>
          <button
            onClick={() => {
              onPause();
              onStartGame();
            }}
            className="px-6 py-2 bg-orange-500 text-white font-bold rounded-lg"
          >
            🔄 Reiniciar
          </button>
          <button
            onClick={onBackToMenu}
            className="px-6 py-2 bg-gray-500 text-white font-bold rounded-lg"
          >
            📋 Menú
          </button>
        </div>
      </div>
    );
  }

  if (!gameStarted && !winner) {
    return (
      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-white mb-3">🏐 ¡Prepárate!</h2>
        <div className="bg-white/90 p-3 rounded-lg mb-3 text-xs">
          <p className="font-bold text-red-500">Tú: W=Saltar A/D=Mover E=Super Q=Tirarse</p>
          {gameMode === '2players' && (
            <p className="font-bold text-blue-500 mt-1">
              P2: ↑=Saltar ←/→=Mover -=Super ,=Tirarse
            </p>
          )}
          <p className="mt-2 text-center font-bold">¡Primero a {WINNING_SCORE} gana!</p>
        </div>
        <button
          onClick={onStartGame}
          className="px-6 py-2 bg-green-500 text-white text-lg font-bold rounded-lg shadow-lg"
        >
          ▶ JUGAR
        </button>
      </div>
    );
  }

  if (winner) {
    return (
      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
        {winner === 'Jugador 1' ? (
          <>
            <h2 className="text-3xl font-bold text-yellow-300 mb-2">🏆 ¡GANASTE! 🏆</h2>
            {gameMode === 'story' && storyLevel && storyLevel < 10 && (
              <p className="text-white mb-3">¡Nivel {storyLevel} completado!</p>
            )}
            {gameMode === 'story' && storyLevel === 10 && (
              <p className="text-green-400 text-xl mb-3 font-bold">
                🎉 ¡COMPLETASTE LA HISTORIA! 🎉
              </p>
            )}
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-red-400 mb-2">😢 Perdiste</h2>
            {gameMode === 'story' && <p className="text-white mb-3">¡Inténtalo de nuevo!</p>}
          </>
        )}
        <div className="flex gap-3">
          {gameMode === 'story' && winner === 'Jugador 1' ? (
            <button
              onClick={onNextLevel}
              className="px-5 py-2 bg-green-500 text-white font-bold rounded-lg"
            >
              {storyLevel && storyLevel < 10 ? '➡️ Siguiente' : '🏠 Menú'}
            </button>
          ) : (
            <button
              onClick={onStartGame}
              className="px-5 py-2 bg-green-500 text-white font-bold rounded-lg"
            >
              🔄 Reintentar
            </button>
          )}
          <button
            onClick={onBackToMenu}
            className="px-5 py-2 bg-gray-500 text-white font-bold rounded-lg"
          >
            📋 Menú
          </button>
        </div>
      </div>
    );
  }

  return null;
}
