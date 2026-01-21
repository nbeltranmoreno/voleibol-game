import { Effect } from '../types';

interface EffectsProps {
  effects: Effect[];
}

export default function Effects({ effects }: EffectsProps) {
  return (
    <>
      {effects.map((e) => (
        <div
          key={e.id}
          className="absolute pointer-events-none"
          style={{ left: e.x - 30, top: e.y - 30 }}
        >
          {e.type === 'red' && <div className="w-16 h-16 rounded-full bg-red-500/50 animate-ping" />}
          {e.type === 'blue' && <div className="w-16 h-16 rounded-full bg-blue-500/50 animate-ping" />}
          {e.type === 'hit' && <div className="text-3xl">💥</div>}
          {e.type === 'dust' && <div className="text-2xl">💨</div>}
        </div>
      ))}
    </>
  );
}
