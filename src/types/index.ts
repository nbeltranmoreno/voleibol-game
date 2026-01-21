export interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export interface Player {
  x: number;
  y: number;
  special: boolean;
  cooldown: number;
  diving: boolean;
  diveCooldown: number;
  canJump: boolean;
  velY: number;
}

export interface Score {
  p1: number;
  p2: number;
}

export interface Effect {
  id: number;
  x: number;
  y: number;
  type: 'red' | 'blue' | 'hit' | 'dust';
}

export interface Keys {
  [key: string]: boolean;
}

export type GameMode = '1player' | '2players' | 'story' | null;

export interface CPUDifficulty {
  speed: number;
  reactionChance: number;
  jumpChance: number;
  specialChance: number;
  diveChance: number;
  predictionMultiplier: number;
}
