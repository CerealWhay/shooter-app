import type { Position } from '../types';

export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const distance = (a: Position, b: Position) => Math.hypot(a.x - b.x, a.y - b.y);

export const normalize = (a: Position, b: Position): Position => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy);
  if (len === 0) return { x: 0, y: 0 };
  return { x: dx / len, y: dy / len };
};

export const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;

export const randomChoice = <T>(items: readonly T[]): T => {
  if (items.length === 0) {
    throw new Error('randomChoice: items array is empty');
  }
  return items[Math.floor(Math.random() * items.length)] as T;
};
