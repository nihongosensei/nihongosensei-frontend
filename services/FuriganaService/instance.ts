import assert from "node:assert";
import type { FuriganaService } from "./FuriganaService";
import { ExternalFuriganaService } from "./ExternalFuriganaService";

const BACKEND_URL = process.env.BACKEND_URL;

let instance: FuriganaService | null;

export const furiganaService: () => FuriganaService = () => {
  assert(
    BACKEND_URL != null && BACKEND_URL != "",
    "BACKEND_URL must not be empty",
  );

  instance ??= new ExternalFuriganaService(BACKEND_URL);

  return instance;
};
