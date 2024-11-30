import type { Fetcher } from "./Fetcher";

/**
 * Default fetcher implementation around `globalThis.fetch`.
 */
export class DefaultFetcher implements Fetcher {
  public fetch(path: string, options?: RequestInit) {
    return fetch(path, options);
  }
}
