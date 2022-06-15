// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

// type Data = {
//   name: string;
// };

export const APP_ID = "598360455040144";
const APP_SECRET = "9c3fe45849a58a3c90d77d2249b0c2fd";

const FACEBOOK_GRAPH_URL = "https://graph.facebook.com/v3.2";

export default async function handler(req: any, res: NextApiResponse) {
  const appAccessToken = await getAppAccessToken();

  const scopes = await debugToken(appAccessToken, req.query.token);

  const pages = await getPagesBasedOnToken(req.query.token);

  console.log(scopes);

  res.json({ scopes, accessToken: pages?.[0].access_token });
}

const getAppAccessToken = async () => {
  const response = await fetch(
    `https://graph.facebook.com/oauth/access_token?client_id=${APP_ID}&client_secret=${APP_SECRET}&grant_type=client_credentials`
  );
  const data: { access_token: string } = await response.json();

  if (!response.ok) {
    throw new Error("App access token could not be retrieved");
  }

  return data.access_token;
};

const debugToken = async (appAccessToken: string, token: string) => {
  const response = await fetch(
    `${FACEBOOK_GRAPH_URL}/debug_token?input_token=${token}&access_token=${appAccessToken}`
  );
  const data: { data: { scopes: string[] } } = await response.json();

  return data.data.scopes;
};

const getPagesBasedOnToken = async (userToken: string) => {
  const response = await fetch(
    `${FACEBOOK_GRAPH_URL}/me/accounts?&access_token=${userToken}`
  );

  const data: any = await response.json();

  if (response.ok) {
    return data.data;
  }

  throw new Error("Could not retrieve pages");
};
