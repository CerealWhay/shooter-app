import { Game } from './game';
import { GAME_CONFIG, type GameConfig } from './config';
import type { GameCallbacks, Position } from './types';
import type { Controls } from '../types';

interface EngineOptions {
  canvas: HTMLCanvasElement;
  callbacks?: GameCallbacks;
  config?: GameConfig;
}

export class Engine {
  private game: Game;

  constructor(options: EngineOptions) {
    const { canvas, callbacks = {}, config = GAME_CONFIG } = options;
    this.game = new Game(canvas, callbacks, config);
  }

  init() {
    this.game.reset();
    this.game.start();
  }

  pause() {
    this.game.pause();
  }

  resume() {
    this.game.resume();
  }

  stop() {
    this.game.stop();
  }

  setControls(controls: Controls) {
    this.game.setControls(controls);
  }

  setMousePos(position: Position) {
    this.game.setMousePos(position);
  }

  setShooting(isShooting: boolean) {
    this.game.setShooting(isShooting);
  }
}
