import { cpuNames, cpuColors } from '../constants/gameConstants';

interface LevelScreenProps {
  storyLevel: number;
  onStartGame: () => void;
  onBackToMenu: () => void;
}

export default function LevelScreen({ storyLevel, onStartGame, onBackToMenu }: LevelScreenProps) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{
        background: `linear-gradient(to bottom, ${cpuColors[storyLevel - 1]}88, #1a1a2e)`
      }}
    >
      <p className="text-lg text-white/80 mb-2">MODO HISTORIA</p>
      <h1 className="text-6xl font-bold text-white mb-4">NIVEL {storyLevel}</h1>
      <div className="flex gap-2 mb-4">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i < storyLevel ? 'bg-yellow-400' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
      <div className="bg-black/40 px-6 py-3 rounded-xl mb-6 text-center">
        <p className="text-xl text-white mb-1">Oponente:</p>
        <p className="text-3xl font-bold" style={{ color: cpuColors[storyLevel - 1] }}>
          {cpuNames[storyLevel - 1]}
        </p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onStartGame}
          className="px-8 py-3 bg-green-500 text-white text-xl font-bold rounded-xl hover:bg-green-600 shadow-lg"
        >
          ⚔️ ¡PELEAR!
        </button>
        <button
          onClick={onBackToMenu}
          className="px-5 py-3 bg-gray-600 text-white font-bold rounded-xl hover:bg-gray-700 shadow-lg"
        >
          ← Menú
        </button>
      </div>
    </div>
  );
}
