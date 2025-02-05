import { MemoryCache } from "./MemoryCache";

describe("MemoryCache", () => {
  it("should retrieve a cached entry correctly", () => {
    const key = "foo";
    const value = "bar";
    const cache = new MemoryCache();
    expect(cache.getEntry(key)).toBeNull();
    expect(cache.hasEntry(key)).toEqual(false);
    cache.setEntry(key, value);
    expect(cache.hasEntry(key)).toEqual(true);
    expect(cache.getEntry(key)).toEqual(value);
  });
});
