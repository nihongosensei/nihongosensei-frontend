import { context, propagation } from "@opentelemetry/api";

const DEFAULT_TIMEOUT_MS = 10_000;

export class HttpError extends Error {
  public constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

function getTraceHeaders(): Record<string, string> {
  const carrier: Record<string, string> = {};
  propagation.inject(context.active(), carrier);

  return carrier;
}

/**
 * Minimal JSON client for the backend api. Propagates the active trace
 * context and aborts requests that take longer than the given timeout.
 */
export class BackendClient {
  public constructor(
    private readonly endpoint: string,
    private readonly timeoutMs = DEFAULT_TIMEOUT_MS,
  ) {}

  public async request<T>(resource: string, data?: unknown): Promise<T> {
    const headers: Record<string, string> = getTraceHeaders();
    if (data !== undefined) {
      headers["content-type"] = "application/json";
    }

    let response: Response;
    try {
      response = await fetch(`${this.endpoint}/api/${resource}`, {
        headers,
        method: data !== undefined ? "POST" : "GET",
        body: data !== undefined ? JSON.stringify(data) : undefined,
        signal: AbortSignal.timeout(this.timeoutMs),
      });
    } catch (e) {
      if (e instanceof DOMException && e.name === "TimeoutError") {
        throw new Error(`backend request timed out after ${this.timeoutMs}ms`);
      }

      throw e;
    }

    if (!response.ok) {
      throw new HttpError(
        response.status,
        `got invalid response from backend: ${response.status}`,
      );
    }

    return (await response.json()) as T;
  }
}
