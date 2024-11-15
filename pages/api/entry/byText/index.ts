import type { NextApiRequest, NextApiResponse } from "next";
import { vocabularyService } from "@services/VocabularyService/instance";

export default async function handleEntryByText(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  if (req.method !== "GET") {
    res.status(405).end();

    return;
  }
  const textOrArray = req.query.text;
  const text = Array.isArray(textOrArray) ? textOrArray[0] : textOrArray;
  if (!text) {
    res.status(400).end();

    return;
  }

  res.setHeader("Content-Type", "application/json");

  res.status(200).json(await vocabularyService().findByText(text));
}
