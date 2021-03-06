// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  debugToken,
  getAppAccessToken,
  getPagesBasedOnToken,
} from "../../api_helpers/fb";

// type Data = {
//   name: string;
// };

export default async function handler(req: any, res: NextApiResponse) {
  const appAccessToken = await getAppAccessToken();

  const scopes = await debugToken(appAccessToken, req.query.token);

  console.log("scopes:", scopes);

  const pages = await getPagesBasedOnToken(req.query.token);

  const page = pages?.[0];

  if (!page) {
    return res.status(500);
  }

  res.json({ pageInfo: page });
}
