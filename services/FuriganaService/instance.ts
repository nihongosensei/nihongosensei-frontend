import assert from "node:assert";
import type { FuriganaService } from "./FuriganaService";
import { ExternalFuriganaService } from "./ExternalFuriganaService";

const BACKEND_URL = process.env.BACKEND_URL;

assert(
  BACKEND_URL != null && BACKEND_URL != "",
  "BACKEND_URL must not be empty",
);

export const furiganaService: FuriganaService = new ExternalFuriganaService(
  BACKEND_URL,
);
