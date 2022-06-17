import { NextApiRequest, NextApiResponse } from "next";
import { createPagePost } from "../../api_helpers/fb";
import { getPage } from "../../api_helpers/storage";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const page = getPage();

  if (req.method !== "POST") {
    const pagePost = await createPagePost(
      req.body.accessToken.id,
      req.body.accessToken.access_token,
      req.body.post
    );
    res.status(200).json({ message: "Great! Your Post Created Successfuly" });
  }
}
