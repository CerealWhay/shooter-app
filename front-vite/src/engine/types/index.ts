import type { Controls } from '../../types';
import type { GameConfig } from '../config.ts';

export interface Position {
  x: number;
  y: number;
}

export interface PlayerState {
  position: Position;
  radius: number;
  hp: number;
  maxHp: number;
  ammo: number;
  maxAmmo: number;
}

export interface EnemyState {
  id: number;
  position: Position;
  radius: number;
  speed: number;
  sprite: string;
  isBoss: boolean;
  hp?: number;
  maxHp?: number;
}

export interface ProjectileState {
  id: number;
  position: Position;
  velocity: Position;
  radius: number;
}

export type LootType = 'health' | 'ammo';

export interface LootState {
  id: number;
  type: LootType;
  position: Position;
  radius: number;
}

export interface AimState {
  begin: Position;
  end: Position;
}

export interface GameState {
  score: number;
  player: PlayerState;
  enemies: EnemyState[];
  projectiles: ProjectileState[];
  loot: LootState[];
  aim: AimState;
}

export interface GameCallbacks {
  onScoreChange?: (score: number) => void;
  onAmmoChange?: (ammo: number) => void;
  onDeath?: () => void;
}

export interface InputState {
  controls: Controls;
  mouse: Position;
  isShooting: boolean;
}

export interface Timers {
  shootCooldown: number;
  enemySpawn: number;
  ammoSpawn: number;
  healthSpawn: number;
}

export interface Ids {
  enemy: number;
  projectile: number;
  loot: number;
}

export interface GameRuntime {
  bossExists: boolean;
  invulnerableUntil: number;
}

export interface GameContext {
  config: GameConfig;
  state: GameState;
  input: InputState;
  timers: Timers;
  ids: Ids;
  width: number;
  height: number;
  callbacks: GameCallbacks;
  runtime: GameRuntime;
}
