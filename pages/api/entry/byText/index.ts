import type { NextApiRequest, NextApiResponse } from "next";
import { vocabularyService } from "@services/VocabularyService/instance";
import type { FindByResponseModel } from "@services/VocabularyService";
import { z } from "zod";

const castToNumber = z.preprocess((val) => Number(val), z.number());

const queryStringSchema = z.object({
  text: z.string(),
  limit: castToNumber.optional().default(3),
  offset: castToNumber.optional().default(0),
});

export type ByTextQueryModel = z.infer<typeof queryStringSchema>;

export type ByTextResponseModel = FindByResponseModel;

export default async function handleEntryByText(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  if (req.method !== "GET") {
    res.status(405).end();

    return;
  }

  const data = queryStringSchema.safeParse(req.query);
  if (data.error) {
    res.status(400).send(data.error);

    return;
  }

  res.setHeader("Content-Type", "application/json");

  const response = await vocabularyService().findBy(data.data);

  res.status(200).json(response);
}
