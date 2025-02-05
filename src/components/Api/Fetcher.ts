export interface Fetcher {
  fetch(path: string, options?: RequestInit): Promise<Response>;
}
