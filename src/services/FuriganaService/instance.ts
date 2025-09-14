import { BACKEND_URL } from "astro:env/server";
import { ExternalFuriganaService } from "./ExternalFuriganaService";
import type { FuriganaService } from "./FuriganaService";

let instance: FuriganaService | null;

export const furiganaService: () => FuriganaService = () => {
  instance ??= new ExternalFuriganaService(BACKEND_URL);

  return instance;
};
