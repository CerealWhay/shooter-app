export const GAME_CONFIG = {
  layout: {
    scoreTableWidth: 400,
    gridGap: 15,
    containerPadding: 15,
  },
  player: {
    radius: 30,
    speed: 300,
    maxHp: 5,
    maxAmmo: 50,
    invulnerableMs: 500,
  },
  projectile: {
    radius: 2,
    speed: 1800,
    fireCooldownMs: 125,
  },
  enemy: {
    radius: 30,
    baseSpeed: 30,
    scoreSpeedFactor: 0.04,
    spawnIntervalMs: 750,
  },
  boss: {
    radius: 50,
    maxHp: 15,
    speed: 30,
    spawnScoreStep: 500,
  },
  loot: {
    health: {
      radius: 30,
      spawnIntervalMs: 5000,
    },
    ammo: {
      radius: 30,
      spawnIntervalMs: 5000,
    },
  },
  aim: {
    extension: 1500,
  },
  assets: {
    player: 'images/ebalo.png',
    boss: 'images/boss-enemy.png',
    ammo: 'images/ammo.png',
    health: 'images/health.png',
    enemies: Array.from({ length: 20 }, (_, i) => `images/enemies/${i + 1}.png`),
  },
} as const;

export type GameConfig = typeof GAME_CONFIG;
