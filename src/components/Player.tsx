import { Player as PlayerType } from '../types';

interface PlayerProps {
  player: PlayerType;
  isRed: boolean;
  cpuColor?: string;
}

export default function Player({ player, isRed, cpuColor }: PlayerProps) {
  const baseColor = isRed ? '#EF4444' : (cpuColor || '#3B82F6');
  const color = player.special ? (isRed ? '#FF0000' : '#0000FF') : baseColor;
  const glow = isRed ? 'rgba(239,68,68,0.4)' : 'rgba(59,130,246,0.4)';

  if (player.diving) {
    return (
      <svg
        style={{ position: 'absolute', left: player.x - 35, top: player.y - 10 }}
        width="70"
        height="50"
      >
        <ellipse cx="35" cy="25" r="30" ry="18" fill={glow} />
        <circle cx="55" cy="20" r="12" fill="#FFD93D" stroke="#333" strokeWidth="2" />
        <circle cx="52" cy="18" r="2" fill="#333" />
        <circle cx="58" cy="18" r="2" fill="#333" />
        <path d="M 50 24 Q 55 28 60 24" stroke="#333" strokeWidth="2" fill="none" />
        <ellipse cx="30" cy="25" rx="18" ry="10" fill={color} stroke="#333" strokeWidth="2" />
        <line x1="12" y1="22" x2="5" y2="15" stroke="#FFD93D" strokeWidth="6" strokeLinecap="round" />
        <line x1="12" y1="28" x2="5" y2="35" stroke="#333" strokeWidth="5" strokeLinecap="round" />
        <line x1="48" y1="25" x2="60" y2="30" stroke="#FFD93D" strokeWidth="6" strokeLinecap="round" />
        <line x1="48" y1="28" x2="55" y2="40" stroke="#333" strokeWidth="5" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg
      style={{ position: 'absolute', left: player.x - 30, top: player.y - 50 }}
      width="60"
      height="70"
    >
      {player.special && <circle cx="30" cy="35" r="35" fill={glow} />}
      <circle cx="30" cy="15" r="15" fill="#FFD93D" stroke="#333" strokeWidth="2" />
      <circle cx="25" cy="12" r="3" fill="#333" />
      <circle cx="35" cy="12" r="3" fill="#333" />
      <path
        d={player.special ? 'M 20 18 Q 30 28 40 18' : 'M 23 20 Q 30 26 37 20'}
        stroke="#333"
        strokeWidth="2"
        fill="none"
      />
      <rect x="18" y="30" width="24" height="25" rx="3" fill={color} stroke="#333" strokeWidth="2" />
      <line
        x1="18"
        y1="38"
        x2={player.special ? '0' : '8'}
        y2={player.special ? '25' : '48'}
        stroke="#FFD93D"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <line
        x1="42"
        y1="38"
        x2={player.special ? '60' : '52'}
        y2={player.special ? '25' : '48'}
        stroke="#FFD93D"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <line x1="24" y1="55" x2="22" y2="68" stroke="#333" strokeWidth="6" strokeLinecap="round" />
      <line x1="36" y1="55" x2="38" y2="68" stroke="#333" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}
