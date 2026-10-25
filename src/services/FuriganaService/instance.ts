import { BACKEND_URL } from "astro:env/server";
import { BackendClient } from "../BackendClient";
import { ExternalFuriganaService } from "./ExternalFuriganaService";
import type { FuriganaService } from "./FuriganaService";

let instance: FuriganaService | null;

export const furiganaService: () => FuriganaService = () => {
  instance ??= new ExternalFuriganaService(new BackendClient(BACKEND_URL));

  return instance;
};
