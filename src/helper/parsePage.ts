/**
 * Parses a 1-based page number from a query parameter. Falls back to the
 * first page for missing or invalid values.
 */
export function parsePage(value: string | null | undefined): number {
  const page = Number.parseInt(value ?? "", 10);

  return Number.isSafeInteger(page) && page >= 1 ? page : 1;
}
