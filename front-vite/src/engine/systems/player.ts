import type { GameContext } from '../types';
import { clamp } from '../common/math';

export const updatePlayer = (ctx: GameContext, dtSec: number) => {
  const speed = ctx.config.player.speed * dtSec;
  const pos = { ...ctx.state.player.position };

  if (ctx.input.controls.isPlayerUp) pos.y -= speed;
  if (ctx.input.controls.isPlayerDown) pos.y += speed;
  if (ctx.input.controls.isPlayerLeft) pos.x -= speed;
  if (ctx.input.controls.isPlayerRight) pos.x += speed;

  pos.x = clamp(pos.x, ctx.state.player.radius, ctx.width - ctx.state.player.radius);
  pos.y = clamp(pos.y, ctx.state.player.radius, ctx.height - ctx.state.player.radius);

  ctx.state.player.position = pos;
};
