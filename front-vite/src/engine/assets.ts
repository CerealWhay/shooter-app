export class ImageStore {
  private cache = new Map<string, HTMLImageElement>();

  get(path: string): HTMLImageElement {
    const existing = this.cache.get(path);
    if (existing) return existing;

    const img = new Image();
    img.src = path;
    this.cache.set(path, img);
    return img;
  }
}
