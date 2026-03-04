import type { GameContext } from '../types';

export const updateProjectiles = (ctx: GameContext, dtSec: number) => {
  const speed = ctx.config.projectile.speed * dtSec;

  ctx.state.projectiles.forEach((projectile) => {
    projectile.position.x += projectile.velocity.x * speed;
    projectile.position.y += projectile.velocity.y * speed;
  });

  ctx.state.projectiles = ctx.state.projectiles.filter(
    (projectile) =>
      projectile.position.x >= 0 &&
      projectile.position.x <= ctx.width &&
      projectile.position.y >= 0 &&
      projectile.position.y <= ctx.height,
  );
};
