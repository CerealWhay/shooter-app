import type { GameContext } from '../types';
import type { LootState } from '../types';
import { randomRange } from '../common/math';

const spawnLoot = (ctx: GameContext, type: LootState['type']) => {
  const radius = type === 'ammo' ? ctx.config.loot.ammo.radius : ctx.config.loot.health.radius;
  const loot: LootState = {
    id: ctx.ids.loot++,
    type,
    radius,
    position: {
      x: randomRange(radius, ctx.width - radius),
      y: randomRange(radius, ctx.height - radius),
    },
  };
  ctx.state.loot.push(loot);
};

export const updateLoot = (ctx: GameContext, dtMs: number) => {
  ctx.timers.ammoSpawn += dtMs;
  if (ctx.timers.ammoSpawn >= ctx.config.loot.ammo.spawnIntervalMs) {
    ctx.timers.ammoSpawn = 0;
    spawnLoot(ctx, 'ammo');
  }

  if (ctx.state.player.hp < ctx.state.player.maxHp) {
    ctx.timers.healthSpawn += dtMs;
    if (ctx.timers.healthSpawn >= ctx.config.loot.health.spawnIntervalMs) {
      ctx.timers.healthSpawn = 0;
      spawnLoot(ctx, 'health');
    }
  } else {
    ctx.timers.healthSpawn = 0;
  }
};
