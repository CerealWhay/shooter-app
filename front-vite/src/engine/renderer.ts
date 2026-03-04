import type { GameConfig } from './config';
import type { GameState } from './types';
import { ImageStore } from './assets';

export class CanvasRenderer {
  private ctx: CanvasRenderingContext2D;
  private assets: ImageStore;
  private config: GameConfig;

  constructor(ctx: CanvasRenderingContext2D, assets: ImageStore, config: GameConfig) {
    this.ctx = ctx;
    this.assets = assets;
    this.config = config;
  }

  render(state: GameState, width: number, height: number) {
    this.ctx.clearRect(0, 0, width, height);

    this.drawAim(state);
    this.drawLoot(state);
    this.drawEnemies(state);
    this.drawProjectiles(state);
    this.drawPlayer(state);
  }

  private drawAim(state: GameState) {
    this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    this.ctx.beginPath();
    this.ctx.moveTo(state.aim.begin.x, state.aim.begin.y);
    this.ctx.lineTo(state.aim.end.x, state.aim.end.y);
    this.ctx.closePath();
    this.ctx.stroke();
  }

  private drawHPBar(position: { x: number; y: number }, radius: number, factor: number) {
    const barHeight = 10;

    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(
      position.x - radius,
      position.y - radius - barHeight * 2,
      radius * 2,
      barHeight,
    );

    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(
      position.x - radius + 2,
      position.y - radius - barHeight * 2 + 2,
      (radius * 2 - 4) * factor,
      barHeight - 4,
    );
  }

  private drawPlayer(state: GameState) {
    const img = this.assets.get(this.config.assets.player);
    this.drawHPBar(state.player.position, state.player.radius, state.player.hp / state.player.maxHp);
    this.ctx.drawImage(
      img,
      state.player.position.x - state.player.radius,
      state.player.position.y - state.player.radius,
      state.player.radius * 2,
      state.player.radius * 2,
    );
  }

  private drawEnemies(state: GameState) {
    state.enemies.forEach((enemy) => {
      const img = this.assets.get(enemy.sprite);
      if (enemy.isBoss && enemy.hp !== undefined && enemy.maxHp !== undefined) {
        this.drawHPBar(enemy.position, enemy.radius, enemy.hp / enemy.maxHp);
      }
      this.ctx.drawImage(
        img,
        enemy.position.x - enemy.radius,
        enemy.position.y - enemy.radius,
        enemy.radius * 2,
        enemy.radius * 2,
      );
    });
  }

  private drawProjectiles(state: GameState) {
    this.ctx.fillStyle = 'red';
    state.projectiles.forEach((projectile) => {
      this.ctx.beginPath();
      this.ctx.arc(
        projectile.position.x,
        projectile.position.y,
        projectile.radius,
        0,
        Math.PI * 2,
        false,
      );
      this.ctx.closePath();
      this.ctx.fill();
    });
  }

  private drawLoot(state: GameState) {
    state.loot.forEach((item) => {
      if (item.type === 'ammo') {
        this.ctx.fillStyle = 'rgba(0,255,4,0.2)';
      } else {
        this.ctx.fillStyle = 'rgba(255,0,213,0.2)';
      }

      this.ctx.beginPath();
      this.ctx.arc(item.position.x, item.position.y, item.radius, 0, Math.PI * 2, false);
      this.ctx.closePath();
      this.ctx.fill();

      const img = this.assets.get(
        item.type === 'ammo' ? this.config.assets.ammo : this.config.assets.health,
      );
      this.ctx.drawImage(
        img,
        item.position.x - item.radius,
        item.position.y - item.radius,
        item.radius * 2,
        item.radius * 2,
      );
    });
  }
}
