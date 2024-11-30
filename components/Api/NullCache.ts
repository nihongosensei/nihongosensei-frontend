import type { Cache } from "./Cache";

export class NullCache implements Cache {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getEntry<T>(_key: string): T | null {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public setEntry<T>(_key: string, _value: T): void {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public hasEntry(_key: string): boolean {
    return false;
  }
}
