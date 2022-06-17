import { NextApiRequest, NextApiResponse } from "next";
import { createPagePost } from "../../api_helpers/fb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await createPagePost(req.body.pageId, req.body.accessToken, req.body.post);
    res.status(200).json({ message: "Great! Your Post Created Successfuly" });
  }
}
