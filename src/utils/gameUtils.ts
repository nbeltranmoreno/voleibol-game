import { CPUDifficulty } from '../types';

export const getCPUDifficulty = (level: number): CPUDifficulty => {
  return {
    speed: 2 + level * 0.4,
    reactionChance: 0.5 + level * 0.05,
    jumpChance: 0.3 + level * 0.07,
    specialChance: 0.005 + level * 0.003,
    diveChance: 0.1 + level * 0.08,
    predictionMultiplier: 5 + level * 1.5
  };
};
