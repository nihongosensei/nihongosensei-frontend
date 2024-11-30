import { parseError } from "@helper";
import type { FuriganaModel } from "@services/FuriganaService";
import type { NextApiRequest, NextApiResponse } from "next";
import { furiganaService } from "@services/FuriganaService/instance";

export type FuriganaResponseModel = {
  furigana: (string | FuriganaModel)[];
};

async function handleFurigana(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).end();

    return;
  }
  const input = req.body as unknown;
  if (typeof input !== "string") {
    res.status(400).end();

    return;
  }
  const trimmedInput = input.trim();

  try {
    const furigana = trimmedInput
      ? await furiganaService().getFurigana(trimmedInput)
      : null;

    res.setHeader("Content-Type", "application/json");
    res.status(200).json({
      furigana,
    } as FuriganaResponseModel);
  } catch (e) {
    console.error(e);

    res.setHeader("Content-Type", "application/json");
    res.status(500).json({
      error: parseError(e),
    });
  }
}

export default handleFurigana;
