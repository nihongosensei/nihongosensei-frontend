import { DEFAULT_LIMIT, MAX_LIMIT } from "@services/constants";
import type { ParsedUrlQuery } from "querystring";
import type { FindOptions } from "@services/VocabularyService";

const DEFAULT_OPTIONS: FindOptions = {
  offset: 0,
  limit: DEFAULT_LIMIT,
};

/**
 * Parses pagination params from the given record.
 *
 * @param params The params to parse from.
 * @param defaultOptions The default options to use.
 */
export function parsePaginationParams(
  params: Record<string, string | string[]> | ParsedUrlQuery,
  defaultOptions: FindOptions = DEFAULT_OPTIONS,
): FindOptions {
  const paginationParams = {
    ...defaultOptions,
  };
  const { offset: offsetString, limit: limitString } = params;
  const offset = Number(offsetString) ?? 0;
  if (!isNaN(offset)) {
    paginationParams.offset = offset;
  }
  const limit = Number(limitString);
  if (!isNaN(limit) && limit <= MAX_LIMIT) {
    paginationParams.limit = limit;
  }

  return paginationParams;
}
