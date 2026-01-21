import { useState, useCallback, useEffect } from 'react';
import { Ball, Player, Score, Effect, Keys, GameMode } from '../types';
import { GROUND, NET_X, FIELD_LEFT, FIELD_RIGHT, cpuNames, cpuColors } from '../constants/gameConstants';
import MainMenu from './MainMenu';
import LevelScreen from './LevelScreen';
import CPUSelect from './CPUSelect';
import GameField from './GameField';
import { useGameLoop } from '../hooks/useGameLoop';

export default function Game() {
  const [gameMode, setGameMode] = useState<GameMode>(null);
  const [storyLevel, setStoryLevel] = useState(1);
  const [savedLevel, setSavedLevel] = useState<number | null>(null);
  const [showLevelScreen, setShowLevelScreen] = useState(false);
  const [cpuLevel, setCpuLevel] = useState(5);
  const [showCpuSelect, setShowCpuSelect] = useState(false);
  const [ball, setBall] = useState<Ball>({ x: 450, y: 100, vx: 3, vy: 2 });
  const [player1, setPlayer1] = useState<Player>({
    x: 100,
    y: 290,
    special: false,
    cooldown: 0,
    diving: false,
    diveCooldown: 0,
    canJump: true,
    velY: 0
  });
  const [player2, setPlayer2] = useState<Player>({
    x: 500,
    y: 290,
    special: false,
    cooldown: 0,
    diving: false,
    diveCooldown: 0,
    canJump: true,
    velY: 0
  });
  const [score, setScore] = useState<Score>({ p1: 0, p2: 0 });
  const [gameStarted, setGameStarted] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [keys, setKeys] = useState<Keys>({});
  const [effects, setEffects] = useState<Effect[]>([]);
  const [paused, setPaused] = useState(false);

  const addEffect = useCallback((x: number, y: number, type: Effect['type']) => {
    const id = Date.now() + Math.random();
    setEffects((prev) => [...prev, { id, x, y, type }]);
    setTimeout(() => setEffects((prev) => prev.filter((e) => e.id !== id)), 500);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.repeat) return;
      if (e.key === 'Escape' && gameStarted && !winner) setPaused((p) => !p);
      setKeys((prev) => ({ ...prev, [e.key.toLowerCase()]: true }));
    },
    [gameStarted, winner]
  );

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    e.preventDefault();
    setKeys((prev) => ({ ...prev, [e.key.toLowerCase()]: false }));
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  useGameLoop({
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
    addEffect
  });

  const startGame = () => {
    setGameStarted(true);
    setWinner(null);
    setScore({ p1: 0, p2: 0 });
    setPaused(false);
    setBall({ x: NET_X, y: 80, vx: Math.random() > 0.5 ? 2 : -2, vy: 0.5 });
    setPlayer1({
      x: (FIELD_LEFT + NET_X) / 2,
      y: GROUND,
      special: false,
      cooldown: 0,
      diving: false,
      diveCooldown: 0,
      canJump: true,
      velY: 0
    });
    setPlayer2({
      x: (NET_X + FIELD_RIGHT) / 2,
      y: GROUND,
      special: false,
      cooldown: 0,
      diving: false,
      diveCooldown: 0,
      canJump: true,
      velY: 0
    });
    setShowLevelScreen(false);
    setShowCpuSelect(false);
  };

  const startStoryMode = (newGame: boolean) => {
    if (newGame) {
      setStoryLevel(1);
      setSavedLevel(1);
    } else if (savedLevel) {
      setStoryLevel(savedLevel);
    } else {
      setStoryLevel(1);
      setSavedLevel(1);
    }
    setGameMode('story');
    setShowLevelScreen(true);
  };

  const nextLevel = () => {
    if (storyLevel < 10) {
      const nl = storyLevel + 1;
      setStoryLevel(nl);
      setSavedLevel(nl);
      setShowLevelScreen(true);
      setWinner(null);
      setGameStarted(false);
    } else {
      setSavedLevel(null);
      setGameMode(null);
      setStoryLevel(1);
      setWinner(null);
      setGameStarted(false);
    }
  };

  const backToMenu = () => {
    setGameMode(null);
    setGameStarted(false);
    setWinner(null);
    setScore({ p1: 0, p2: 0 });
    setShowLevelScreen(false);
    setPaused(false);
    setShowCpuSelect(false);
  };

  if (!gameMode) {
    return (
      <MainMenu
        savedLevel={savedLevel}
        onStartStoryMode={startStoryMode}
        onSelect1Player={() => {
          setGameMode('1player');
          setShowCpuSelect(true);
        }}
        onSelect2Players={() => setGameMode('2players')}
      />
    );
  }

  if (gameMode === '1player' && showCpuSelect) {
    return (
      <CPUSelect
        cpuLevel={cpuLevel}
        onSelectLevel={setCpuLevel}
        onStartGame={startGame}
        onBackToMenu={backToMenu}
      />
    );
  }

  if (gameMode === 'story' && showLevelScreen) {
    return (
      <LevelScreen storyLevel={storyLevel} onStartGame={startGame} onBackToMenu={backToMenu} />
    );
  }

  const getOpponentName = () => {
    if (gameMode === 'story') return cpuNames[storyLevel - 1];
    if (gameMode === '1player') return cpuNames[cpuLevel - 1];
    return 'P2';
  };

  const getOpponentColor = () => {
    if (gameMode === 'story') return cpuColors[storyLevel - 1];
    if (gameMode === '1player') return cpuColors[cpuLevel - 1];
    return '#2563eb';
  };

  return (
    <div className="min-h-screen bg-sky-300 flex flex-col items-center justify-center p-2">
      <div className="flex items-center gap-3 mb-1">
        <button
          onClick={backToMenu}
          className="px-2 py-1 bg-white/80 rounded text-xs font-bold hover:bg-white"
        >
          ← Menú
        </button>
        <h1 className="text-xl font-bold text-white drop-shadow">
          🏐{' '}
          {gameMode === 'story'
            ? `Nivel ${storyLevel}: ${cpuNames[storyLevel - 1]}`
            : gameMode === '1player'
            ? `vs ${cpuNames[cpuLevel - 1]}`
            : '2 Jugadores'}
        </h1>
        {gameStarted && !winner && (
          <button
            onClick={() => setPaused((p) => !p)}
            className="px-2 py-1 bg-yellow-400 rounded text-xs font-bold"
          >
            {paused ? '▶' : '⏸'}
          </button>
        )}
      </div>

      <div className="flex gap-6 mb-1 font-bold">
        <span className="text-red-600 bg-white px-3 py-0.5 rounded shadow text-sm">
          TÚ: {score.p1}
        </span>
        <span
          className="bg-white px-3 py-0.5 rounded shadow text-sm"
          style={{ color: getOpponentColor() }}
        >
          {getOpponentName()}: {score.p2}
        </span>
      </div>

      <GameField
        ball={ball}
        player1={player1}
        player2={player2}
        effects={effects}
        gameStarted={gameStarted}
        winner={winner}
        paused={paused}
        gameMode={gameMode}
        storyLevel={storyLevel}
        cpuLevel={cpuLevel}
        onStartGame={startGame}
        onPause={() => setPaused((p) => !p)}
        onBackToMenu={backToMenu}
        onNextLevel={nextLevel}
      />
      <p className="text-white mt-1 text-xs drop-shadow">ESC para pausar</p>
    </div>
  );
}
