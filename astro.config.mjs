/// <reference types="vitest" />
// @ts-check
import node from "@astrojs/node";
import preact from "@astrojs/preact";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [preact()],
  security: {
    csp: true,
  },
  env: {
    schema: {
      BACKEND_URL: envField.string({
        context: "server",
        // we use secrets as they are retrieved at runtime. "public"
        // access is bundled at build time.
        access: "secret",
        optional: false,
        default: "http://localhost:3001",
      }),
      DEFAULT_LIMIT: envField.number({
        context: "server",
        access: "secret",
        optional: true,
        default: 15,
      }),
      MAX_LIMIT: envField.number({
        context: "server",
        access: "secret",
        optional: true,
        default: 15,
      }),
      DEFAULT_FURIGANA_INPUT_VALUE: envField.string({
        context: "server",
        access: "secret",
        optional: true,
        default:
          "すべての人間は、生まれながらにして自由であり、かつ、尊厳と権利とについて平等である。",
      }),
    },
  },
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
});
