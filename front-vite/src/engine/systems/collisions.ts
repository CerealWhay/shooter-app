import type { GameContext } from '../types';
import { audioSystem } from '../audio';
import { distance } from '../common/math';

export const handleCollisions = (ctx: GameContext) => {
  handlePlayerEnemyCollision(ctx);
  handleProjectileEnemyCollision(ctx);
  handleLootCollision(ctx);
};

const handlePlayerEnemyCollision = (ctx: GameContext) => {
  if (performance.now() < ctx.runtime.invulnerableUntil) return;

  for (const enemy of ctx.state.enemies) {
    const dist = distance(ctx.state.player.position, enemy.position);
    if (dist <= enemy.radius + ctx.state.player.radius) {
      audioSystem.playDamage();
      ctx.state.player.hp -= 1;
      ctx.runtime.invulnerableUntil = performance.now() + ctx.config.player.invulnerableMs;

      if (ctx.state.player.hp <= 0) {
        audioSystem.playDeath();
        ctx.callbacks.onDeath?.();
      }
      break;
    }
  }
};

const handleProjectileEnemyCollision = (ctx: GameContext) => {
  let scoreHits = 0;

  for (let i = ctx.state.projectiles.length - 1; i >= 0; i -= 1) {
    const projectile = ctx.state.projectiles[i];
    if (!projectile) continue;

    let hit = false;

    for (let j = ctx.state.enemies.length - 1; j >= 0; j -= 1) {
      const enemy = ctx.state.enemies[j];
      if (!enemy) continue;

      const dist = distance(projectile.position, enemy.position);
      if (dist <= enemy.radius) {
        hit = true;

        if (enemy.isBoss && enemy.hp !== undefined && enemy.maxHp !== undefined) {
          audioSystem.playEnemyHit();
          enemy.hp -= 1;
          if (enemy.hp <= 0) {
            ctx.state.enemies.splice(j, 1);
            ctx.runtime.bossExists = false;
            scoreHits += 1;
            audioSystem.playKill();
          } else {
            scoreHits += 1;
          }
        } else {
          ctx.state.enemies.splice(j, 1);
          scoreHits += 1;
          audioSystem.playKill();
        }

        break;
      }
    }

    if (hit) {
      ctx.state.projectiles.splice(i, 1);
    }
  }

  if (scoreHits > 0) {
    ctx.state.score += scoreHits * 10;
    ctx.callbacks.onScoreChange?.(ctx.state.score);
  }
};

const handleLootCollision = (ctx: GameContext) => {
  for (let i = ctx.state.loot.length - 1; i >= 0; i -= 1) {
    const loot = ctx.state.loot[i];
    if (!loot) continue;

    const dist = distance(ctx.state.player.position, loot.position);
    if (dist > loot.radius + ctx.state.player.radius) continue;

    if (loot.type === 'health') {
      if (ctx.state.player.hp < ctx.state.player.maxHp) {
        ctx.state.player.hp += 1;
        audioSystem.playHealthPickup();
        ctx.state.loot.splice(i, 1);
      }
    } else {
      ctx.state.player.ammo = ctx.state.player.maxAmmo;
      audioSystem.playAmmoPickup();
      ctx.state.loot.splice(i, 1);
      ctx.callbacks.onAmmoChange?.(ctx.state.player.ammo);
    }
  }
};
