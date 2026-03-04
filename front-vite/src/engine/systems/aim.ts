import type { GameContext } from '../types';

export const updateAim = (ctx: GameContext) => {
  const angle = Math.atan2(
    ctx.input.mouse.y - ctx.state.player.position.y,
    ctx.input.mouse.x - ctx.state.player.position.x,
  );
  const extension = ctx.config.aim.extension;
  const end = {
    x: Math.cos(angle) * extension + ctx.input.mouse.x,
    y: Math.sin(angle) * extension + ctx.input.mouse.y,
  };

  ctx.state.aim = {
    begin: { ...ctx.state.player.position },
    end,
  };
};
