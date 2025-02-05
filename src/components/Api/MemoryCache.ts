import type { Cache } from "./Cache";

export class MemoryCache implements Cache {
  private readonly cacheMap: Map<string, unknown>;

  public constructor() {
    this.cacheMap = new Map<string, unknown>();
  }

  public getEntry<T>(key: string): T | null {
    return (this.cacheMap.get(key) ?? null) as T | null;
  }

  public setEntry<T>(key: string, value: T): void {
    this.cacheMap.set(key, value);
  }

  public hasEntry(key: string): boolean {
    return this.cacheMap.has(key);
  }
}
