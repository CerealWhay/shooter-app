import type { GameContext } from '../types';
import type { ProjectileState } from '../types';
import { audioSystem } from '../audio';

export const updateShooting = (ctx: GameContext, dtMs: number) => {
  ctx.timers.shootCooldown += dtMs;

  if (!ctx.input.isShooting) return;
  if (ctx.timers.shootCooldown < ctx.config.projectile.fireCooldownMs) return;

  ctx.timers.shootCooldown = 0;

  if (ctx.state.player.ammo <= 0) {
    audioSystem.playEmptyShoot();
    return;
  }

  ctx.state.player.ammo -= 1;
  ctx.callbacks.onAmmoChange?.(ctx.state.player.ammo);
  audioSystem.playShoot();

  const angle = Math.atan2(
    ctx.input.mouse.y - ctx.state.player.position.y,
    ctx.input.mouse.x - ctx.state.player.position.x,
  );

  const velocity = {
    x: Math.cos(angle),
    y: Math.sin(angle),
  };

  const projectile: ProjectileState = {
    id: ctx.ids.projectile++,
    position: { ...ctx.state.player.position },
    velocity,
    radius: ctx.config.projectile.radius,
  };

  ctx.state.projectiles.push(projectile);
};
