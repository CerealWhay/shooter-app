import type { GameContext } from '../types';
import type { EnemyState } from '../types';
import { normalize, randomChoice } from '../common/math';

const randomSpawnPosition = (ctx: GameContext, radius: number) => {
  const position = { x: 0, y: 0 };
  if (Math.random() < 0.5) {
    if (Math.random() < 0.5) {
      position.x = -radius;
    } else {
      position.x = ctx.width + radius;
    }
    position.y = Math.random() * ctx.height;
  } else {
    position.x = Math.random() * ctx.width;
    if (Math.random() < 0.5) {
      position.y = -radius;
    } else {
      position.y = ctx.height + radius;
    }
  }
  return position;
};

const spawnEnemy = (ctx: GameContext) => {
  const position = randomSpawnPosition(ctx, ctx.config.enemy.radius);
  const enemy: EnemyState = {
    id: ctx.ids.enemy++,
    position,
    radius: ctx.config.enemy.radius,
    speed: ctx.config.enemy.baseSpeed + ctx.state.score * ctx.config.enemy.scoreSpeedFactor,
    sprite: randomChoice(ctx.config.assets.enemies),
    isBoss: false,
  };
  ctx.state.enemies.push(enemy);
};

const spawnBoss = (ctx: GameContext) => {
  const position = randomSpawnPosition(ctx, ctx.config.boss.radius);
  const enemy: EnemyState = {
    id: ctx.ids.enemy++,
    position,
    radius: ctx.config.boss.radius,
    speed: ctx.config.boss.speed,
    sprite: ctx.config.assets.boss,
    isBoss: true,
    hp: ctx.config.boss.maxHp,
    maxHp: ctx.config.boss.maxHp,
  };
  ctx.state.enemies.push(enemy);
  ctx.runtime.bossExists = true;
};

export const updateEnemies = (ctx: GameContext, dtSec: number, dtMs: number) => {
  ctx.timers.enemySpawn += dtMs;
  if (ctx.timers.enemySpawn >= ctx.config.enemy.spawnIntervalMs) {
    ctx.timers.enemySpawn = 0;
    spawnEnemy(ctx);
  }

  if (
    ctx.state.score !== 0 &&
    ctx.state.score % ctx.config.boss.spawnScoreStep === 0 &&
    !ctx.runtime.bossExists
  ) {
    spawnBoss(ctx);
  }

  ctx.state.enemies.forEach((enemy) => {
    const speed = enemy.isBoss
      ? ctx.config.boss.speed
      : ctx.config.enemy.baseSpeed + ctx.state.score * ctx.config.enemy.scoreSpeedFactor;
    enemy.speed = speed;
    const dir = normalize(enemy.position, ctx.state.player.position);
    enemy.position.x += dir.x * speed * dtSec;
    enemy.position.y += dir.y * speed * dtSec;
  });
};
