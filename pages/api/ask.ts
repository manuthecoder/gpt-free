/* eslint-disable */

import type { NextApiRequest, NextApiResponse } from "next";
import Client from "gpt-free";

type Data = {
  error?: string;
  prompt?: string;
  response?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const client = new Client();
  const { prompt }: any = JSON.parse(req.body);

  if (!prompt) {
    res.status(403).json({
      error: "Prompt not defined",
    });
  }

  const response = await client.model("chat").getCompleteResponse(prompt);

  res.status(200).json({
    prompt,
    response,
  });
}
