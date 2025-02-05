import assert from "node:assert";
import { ExternalFuriganaService } from "./ExternalFuriganaService";
import type { FuriganaService } from "./FuriganaService";

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
