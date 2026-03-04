import type { Controls } from '../types';
import { GAME_CONFIG, type GameConfig } from './config';
import type { GameCallbacks, GameContext, GameRuntime, GameState, Ids, InputState, Timers, Position } from './types';
import { ImageStore } from './assets';
import { CanvasRenderer } from './renderer';
import { updateAim } from './systems/aim';
import { updatePlayer } from './systems/player';
import { updateShooting } from './systems/shooting';
import { updateProjectiles } from './systems/projectiles';
import { updateEnemies } from './systems/enemies';
import { updateLoot } from './systems/loot';
import { handleCollisions } from './systems/collisions';

export class Game {
  private canvas: HTMLCanvasElement;
  private readonly callbacks: GameCallbacks;
  private readonly config: GameConfig;
  private readonly ctx: CanvasRenderingContext2D;
  private renderer: CanvasRenderer;
  private assets = new ImageStore();
  private running = false;
  private rafId: number | null = null;
  private lastTime = 0;

  private input: InputState = {
    controls: {
      isPlayerUp: false,
      isPlayerDown: false,
      isPlayerLeft: false,
      isPlayerRight: false,
    },
    mouse: { x: 0, y: 0 },
    isShooting: false,
  };

  private state: GameState;
  private runtime: GameRuntime = {
    bossExists: false,
    invulnerableUntil: 0,
  };

  private timers: Timers = {
    shootCooldown: 0,
    enemySpawn: 0,
    ammoSpawn: 0,
    healthSpawn: 0,
  };

  private ids: Ids = {
    enemy: 1,
    projectile: 1,
    loot: 1,
  };

  private width = 0;
  private height = 0;

  constructor(canvas: HTMLCanvasElement, callbacks: GameCallbacks = {}, config: GameConfig = GAME_CONFIG) {
    this.canvas = canvas;
    this.callbacks = callbacks;
    this.config = config;

    const ctx = this.canvas.getContext('2d');
    if (!ctx) throw new Error('2D canvas context is not available');
    this.ctx = ctx;
    this.renderer = new CanvasRenderer(this.ctx, this.assets, this.config);

    this.initCanvas();
    this.state = this.createInitialState();
    this.notifyAmmo();
    this.notifyScore();
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    this.loop(this.lastTime);
  }

  pause() {
    this.running = false;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  resume() {
    if (this.running) return;
    this.start();
  }

  stop() {
    this.pause();
  }

  reset() {
    this.state = this.createInitialState();
    this.runtime.invulnerableUntil = 0;
    this.runtime.bossExists = false;
    this.timers = {
      shootCooldown: 0,
      enemySpawn: 0,
      ammoSpawn: 0,
      healthSpawn: 0,
    };
    this.ids = { enemy: 1, projectile: 1, loot: 1 };
    this.notifyAmmo();
    this.notifyScore();
  }

  setControls(controls: Controls) {
    this.input.controls = controls;
  }

  setMousePos(position: Position) {
    const rect = this.canvas.getBoundingClientRect();
    this.input.mouse = {
      x: position.x - rect.left,
      y: position.y - rect.top,
    };
  }

  setShooting(isShooting: boolean) {
    this.input.isShooting = isShooting;
  }

  private loop = (now: number) => {
    if (!this.running) return;
    const dtMs = now - this.lastTime;
    this.lastTime = now;

    this.update(dtMs);
    this.render();

    this.rafId = requestAnimationFrame(this.loop);
  };

  private initCanvas() {
    this.width =
      window.innerWidth -
      this.config.layout.scoreTableWidth -
      this.config.layout.gridGap -
      this.config.layout.containerPadding * 2;
    this.height = window.innerHeight - this.config.layout.containerPadding * 2;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  private createInitialState(): GameState {
    const playerPos = { x: this.width / 2, y: this.height / 2 };
    this.input.mouse = { ...playerPos };

    return {
      score: 0,
      player: {
        position: playerPos,
        radius: this.config.player.radius,
        hp: this.config.player.maxHp,
        maxHp: this.config.player.maxHp,
        ammo: this.config.player.maxAmmo,
        maxAmmo: this.config.player.maxAmmo,
      },
      enemies: [],
      projectiles: [],
      loot: [],
      aim: {
        begin: playerPos,
        end: playerPos,
      },
    };
  }

  private update(dtMs: number) {
    const dtSec = dtMs / 1000;
    const ctx = this.buildContext();

    updateAim(ctx);
    updatePlayer(ctx, dtSec);
    updateShooting(ctx, dtMs);
    updateProjectiles(ctx, dtSec);
    updateEnemies(ctx, dtSec, dtMs);
    updateLoot(ctx, dtMs);
    handleCollisions(ctx);
  }

  private render() {
    this.renderer.render(this.state, this.width, this.height);
  }

  private buildContext(): GameContext {
    return {
      config: this.config,
      state: this.state,
      input: this.input,
      timers: this.timers,
      ids: this.ids,
      width: this.width,
      height: this.height,
      callbacks: this.callbacks,
      runtime: this.runtime,
    };
  }

  private notifyScore() {
    this.callbacks.onScoreChange?.(this.state.score);
  }

  private notifyAmmo() {
    this.callbacks.onAmmoChange?.(this.state.player.ammo);
  }
}
