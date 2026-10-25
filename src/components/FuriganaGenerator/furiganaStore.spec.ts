import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { FuriganaStore } from "./furiganaStore";

const { furiganaAction } = vi.hoisted(() => ({
  furiganaAction: vi.fn<(input: { text: string }) => Promise<unknown>>(),
}));

vi.mock("astro:actions", () => ({
  actions: { furigana: { orThrow: furiganaAction } },
}));

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve, reject };
}

describe("FuriganaStore", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    furiganaAction.mockReset();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("debounces requests", async () => {
    furiganaAction.mockResolvedValue({ furigana: ["a"] });
    const store = new FuriganaStore({ defaultError: null });

    store.setText("a");
    store.setText("ab");
    await vi.advanceTimersByTimeAsync(300);

    expect(furiganaAction).toHaveBeenCalledTimes(1);
    expect(furiganaAction).toHaveBeenCalledWith({ text: "ab" });
    expect(store.furigana.value).toEqual(["a"]);
    expect(store.loading.value).toBe(false);
  });

  it("ignores responses of outdated requests", async () => {
    const first = deferred<{ furigana: string[] }>();
    const second = deferred<{ furigana: string[] }>();
    furiganaAction
      .mockReturnValueOnce(first.promise)
      .mockReturnValueOnce(second.promise);
    const store = new FuriganaStore({ defaultError: null });

    store.setText("first");
    await vi.advanceTimersByTimeAsync(300);
    store.setText("second");
    await vi.advanceTimersByTimeAsync(300);

    second.resolve({ furigana: ["second"] });
    await vi.advanceTimersByTimeAsync(0);
    first.resolve({ furigana: ["first"] });
    await vi.advanceTimersByTimeAsync(0);

    expect(store.furigana.value).toEqual(["second"]);
    expect(store.loading.value).toBe(false);
  });

  it("ignores errors of outdated requests", async () => {
    const first = deferred<{ furigana: string[] }>();
    furiganaAction.mockReturnValueOnce(first.promise);
    const store = new FuriganaStore({ defaultError: null });

    store.setText("first");
    await vi.advanceTimersByTimeAsync(300);
    store.setText("");
    first.reject(new Error("boom"));
    await vi.advanceTimersByTimeAsync(0);

    expect(store.error.value).toBeNull();
    expect(store.furigana.value).toEqual([]);
    expect(store.loading.value).toBe(false);
  });

  it("does not request anything for empty text", async () => {
    const store = new FuriganaStore({ defaultError: null });

    store.setText("   ");
    await vi.advanceTimersByTimeAsync(300);

    expect(furiganaAction).not.toHaveBeenCalled();
    expect(store.furigana.value).toEqual([]);
  });
});
