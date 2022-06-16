import { NextApiRequest, NextApiResponse } from "next";
import { createPagePost } from "../../api_helpers/fb";
import { getPage } from "../../api_helpers/storage";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const page = getPage();

  const pagePost = await createPagePost(page.pageId, page.pageToken, "test");

  res.status(200).json({ message: "Great!" });
}
