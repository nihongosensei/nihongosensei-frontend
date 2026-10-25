import { z } from "astro/zod";
import { defineAction } from "astro:actions";
import { MAX_LIMIT } from "~services/constants";
import { furiganaService } from "~services/FuriganaService/instance";
import { vocabularyService } from "~services/VocabularyService/instance";

const castToNumber = z.preprocess((val) => Number(val), z.number());

export const server = {
  furigana: defineAction({
    accept: "json",
    input: z.object({
      text: z.string().trim(),
    }),
    handler: async (input) => {
      const furigana = await furiganaService().getFurigana(input.text);

      return {
        furigana,
      };
    },
  }),
  vocabularyByText: defineAction({
    input: z.object({
      text: z.string().trim(),
      limit: castToNumber
        .pipe(z.number().int().min(1).max(MAX_LIMIT))
        .optional()
        .default(3),
      offset: castToNumber.pipe(z.number().int().min(0)).optional().default(0),
    }),
    handler: (input) => {
      return vocabularyService().findBy(input);
    },
  }),
};
