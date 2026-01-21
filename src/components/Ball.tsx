import { Ball as BallType } from '../types';

interface BallProps {
  ball: BallType;
}

export default function Ball({ ball }: BallProps) {
  return (
    <div
      className="absolute w-6 h-6 bg-white rounded-full border-2 border-gray-400 shadow"
      style={{ left: ball.x - 12, top: ball.y - 12 }}
    />
  );
}
