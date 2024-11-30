import { NullCache } from "./NullCache";
import { DefaultApiClient } from "./DefaultApiClient";
import type { FuriganaResponseModel } from "../../pages/api/furigana";
import { MemoryCache } from "./MemoryCache";
import type { Fetcher } from "./Fetcher";

describe("DefaultApiClient", () => {
  it("should make a furigana api call correctly", async () => {
    const fetchMock = jest.fn();
    const fetcher: Fetcher = {
      fetch: fetchMock,
    };
    const responseJson = {
      furigana: [
        "すべての",
        {
          text: "人間",
          reading: "にんげん",
          basicForm: "人間",
        },
      ],
    } satisfies FuriganaResponseModel;
    fetchMock.mockReturnValueOnce({
      ok: true,
      json: () => Promise.resolve(responseJson),
    });
    const cache = new NullCache();
    const api = new DefaultApiClient(cache, fetcher);
    const text = "すべての人間は";

    const response = await api.getFurigana(text);

    expect(response).toEqual(responseJson);
    expect(fetchMock).toBeCalled();
    expect(fetchMock).toBeCalledTimes(1);
    expect(fetchMock).toBeCalledWith("/api/furigana", {
      method: "POST",
      body: "すべての人間は",
    });
  });

  it("should cache a response correctly", async () => {
    const fetchMock = jest.fn();
    const fetcher: Fetcher = {
      fetch: fetchMock,
    };
    const responseJson = {
      furigana: [
        "すべての",
        {
          text: "人間",
          reading: "にんげん",
          basicForm: "人間",
        },
      ],
    } satisfies FuriganaResponseModel;
    fetchMock.mockReturnValueOnce({
      ok: true,
      json: () => Promise.resolve(responseJson),
    });
    const cache = new MemoryCache();
    const api = new DefaultApiClient(cache, fetcher);
    const text = "すべての人間は";

    const response = await api.getFurigana(text);
    await api.getFurigana(text);

    expect(response).toEqual(responseJson);
    expect(fetchMock).toBeCalled();
    expect(fetchMock).toBeCalledTimes(1);
    expect(cache.hasEntry('/api/furigana:"すべての人間は"')).toEqual(true);
  });
});
