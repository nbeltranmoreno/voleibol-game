import { cpuNames, cpuColors } from '../constants/gameConstants';

interface CPUSelectProps {
  cpuLevel: number;
  onSelectLevel: (level: number) => void;
  onStartGame: () => void;
  onBackToMenu: () => void;
}

export default function CPUSelect({
  cpuLevel,
  onSelectLevel,
  onStartGame,
  onBackToMenu
}: CPUSelectProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-green-500 to-green-900">
      <h1 className="text-4xl font-bold text-white mb-2">🤖 1 JUGADOR</h1>
      <p className="text-xl text-white/80 mb-6">Elige la dificultad del CPU</p>
      <div className="grid grid-cols-5 gap-2 mb-6">
        {[...Array(10)].map((_, i) => (
          <button
            key={i}
            onClick={() => onSelectLevel(i + 1)}
            className={`w-14 h-14 rounded-xl font-bold text-lg transition-all ${
              cpuLevel === i + 1 ? 'scale-110 ring-4 ring-white' : 'hover:scale-105'
            }`}
            style={{
              backgroundColor: cpuColors[i],
              color: i > 6 ? 'white' : 'black'
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <div className="bg-black/40 px-6 py-3 rounded-xl mb-6 text-center">
        <p className="text-white text-lg">Nivel seleccionado:</p>
        <p className="text-3xl font-bold" style={{ color: cpuColors[cpuLevel - 1] }}>
          {cpuLevel} - {cpuNames[cpuLevel - 1]}
        </p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onStartGame}
          className="px-8 py-3 bg-yellow-500 text-white text-xl font-bold rounded-xl hover:bg-yellow-600 shadow-lg"
        >
          ⚔️ ¡JUGAR!
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
