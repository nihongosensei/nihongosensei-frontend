export interface Cache {
  /**
   * Retrieves a key from the cache. If no entry exists for the given key,
   * `null` must be returned.
   *
   * @param key The key to retrieve a value for.
   */
  getEntry<T>(key: string): T | null;

  /**
   * Sets an entry in the cache.
   *
   * @param key The key for the entry.
   * @param value The value for the entry.
   */
  setEntry<T>(key: string, value: T): void;

  /**
   * Checks if the given key exists in the cache.
   *
   * @param key The key to check.
   */
  hasEntry(key: string): boolean;
}
