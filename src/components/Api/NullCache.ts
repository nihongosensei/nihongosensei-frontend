import type { Cache } from "./Cache";

export class NullCache implements Cache {
  public getEntry<T>(_key: string): T | null {
    return null;
  }

  public setEntry<T>(_key: string, _value: T): void {}

  public hasEntry(_key: string): boolean {
    return false;
  }
}
