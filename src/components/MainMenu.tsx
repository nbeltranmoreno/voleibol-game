import { cpuNames } from '../constants/gameConstants';

interface MainMenuProps {
  savedLevel: number | null;
  onStartStoryMode: (newGame: boolean) => void;
  onSelect1Player: () => void;
  onSelect2Players: () => void;
}

export default function MainMenu({
  savedLevel,
  onStartStoryMode,
  onSelect1Player,
  onSelect2Players
}: MainMenuProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-400 via-pink-500 to-purple-600 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-6">
        <h1 className="text-5xl font-bold text-white mb-2">🏐 VOLEIBOL</h1>
        <p className="text-xl text-white/80">Estilo Scratch</p>
      </div>
      <div className="flex flex-col gap-3">
        {savedLevel && savedLevel > 1 ? (
          <>
            <button
              onClick={() => onStartStoryMode(false)}
              className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xl font-bold rounded-xl hover:scale-105 transition-all shadow-xl flex items-center gap-3"
            >
              <span className="text-2xl">📖</span>
              <div className="text-left">
                <div>CONTINUAR HISTORIA</div>
                <div className="text-xs font-normal opacity-80">
                  Nivel {savedLevel}: {cpuNames[savedLevel - 1]}
                </div>
              </div>
            </button>
            <button
              onClick={() => onStartStoryMode(true)}
              className="px-8 py-4 bg-gradient-to-r from-red-400 to-red-600 text-white text-xl font-bold rounded-xl hover:scale-105 transition-all shadow-xl flex items-center gap-3"
            >
              <span className="text-2xl">🆕</span>
              <div className="text-left">
                <div>NUEVA HISTORIA</div>
                <div className="text-xs font-normal opacity-80">Empezar desde nivel 1</div>
              </div>
            </button>
          </>
        ) : (
          <button
            onClick={() => onStartStoryMode(true)}
            className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xl font-bold rounded-xl hover:scale-105 transition-all shadow-xl flex items-center gap-3"
          >
            <span className="text-2xl">📖</span>
            <div className="text-left">
              <div>HISTORIA</div>
              <div className="text-xs font-normal opacity-80">10 niveles</div>
            </div>
          </button>
        )}
        <button
          onClick={onSelect1Player}
          className="px-8 py-4 bg-gradient-to-r from-green-400 to-green-600 text-white text-xl font-bold rounded-xl hover:scale-105 transition-all shadow-xl flex items-center gap-3"
        >
          <span className="text-2xl">🤖</span>
          <div className="text-left">
            <div>1 JUGADOR</div>
            <div className="text-xs font-normal opacity-80">vs CPU</div>
          </div>
        </button>
        <button
          onClick={onSelect2Players}
          className="px-8 py-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white text-xl font-bold rounded-xl hover:scale-105 transition-all shadow-xl flex items-center gap-3"
        >
          <span className="text-2xl">👥</span>
          <div className="text-left">
            <div>2 JUGADORES</div>
            <div className="text-xs font-normal opacity-80">Multijugador</div>
          </div>
        </button>
      </div>
      <p className="text-sm text-white/60 mt-4">Hecho por: Nico</p>
    </div>
  );
}
