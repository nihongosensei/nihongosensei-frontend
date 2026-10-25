import { afterEach, describe, expect, it, vi } from "vitest";
import { BackendClient, HttpError } from "./BackendClient";

describe("BackendClient", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("sends GET without body when no data is given", async () => {
    const fetchMock = vi.fn().mockResolvedValue(Response.json({ ok: true }));
    vi.stubGlobal("fetch", fetchMock);

    const result = await new BackendClient("http://backend").request("foo");

    expect(result).toEqual({ ok: true });
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("http://backend/api/foo");
    expect(init.method).toBe("GET");
    expect(init.body).toBeUndefined();
    expect(init.signal).toBeInstanceOf(AbortSignal);
  });

  it("sends POST with json body and content type", async () => {
    const fetchMock = vi.fn().mockResolvedValue(Response.json({}));
    vi.stubGlobal("fetch", fetchMock);

    await new BackendClient("http://backend").request("foo", { a: 1 });

    const init = fetchMock.mock.calls[0][1];
    expect(init.method).toBe("POST");
    expect(init.body).toBe('{"a":1}');
    expect(init.headers["content-type"]).toBe("application/json");
  });

  it("throws an HttpError with the status for non-ok responses", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(null, { status: 404 })),
    );

    const error = (await new BackendClient("http://backend")
      .request("foo")
      .catch((e: unknown) => e)) as HttpError;

    expect(error).toBeInstanceOf(HttpError);
    expect(error.status).toBe(404);
  });

  it("throws a readable error on timeout", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new DOMException("timeout", "TimeoutError")),
    );

    await expect(
      new BackendClient("http://backend", 5).request("foo"),
    ).rejects.toThrow("timed out after 5ms");
  });
});
