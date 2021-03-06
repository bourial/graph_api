export const APP_ID = '';
const APP_SECRET = '';

const FACEBOOK_GRAPH_URL = 'https://graph.facebook.com/v14.0';

export const getAppAccessToken = async () => {
  const response = await fetch(
    `https://graph.facebook.com/oauth/access_token?client_id=${APP_ID}&client_secret=${APP_SECRET}&grant_type=client_credentials`
  );
  const data: { access_token: string } = await response.json();

  if (!response.ok) {
    throw new Error('App access token could not be retrieved');
  }

  return data.access_token;
};

export const debugToken = async (appAccessToken: string, token: string) => {
  const response = await fetch(
    `${FACEBOOK_GRAPH_URL}/debug_token?input_token=${token}&access_token=${appAccessToken}`
  );
  const data: { data: { scopes: string[] } } = await response.json();

  return data.data.scopes;
};

export const getPagesBasedOnToken = async (userToken: string) => {
  const response = await fetch(
    `${FACEBOOK_GRAPH_URL}/me/accounts?&access_token=${userToken}`
  );

  const data: any = await response.json();

  if (response.ok) {
    return data.data;
  }

  throw new Error('Could not retrieve pages');
};

export const createPagePost = async (
  pageId: string,
  pageToken: string,
  post: string
) => {
  console.log('creating page post...');
  const response = await fetch(
    `${FACEBOOK_GRAPH_URL}/${pageId}/feed?message${post}&access_token=${pageToken}`,
    {
      method: 'POST',
    }
  );

  const data: { id: string; error?: { message: string } } =
    await response.json();

  console.log('Cool', data);

  if (response.ok) {
    return data.id;
  }

  throw new Error('Could not retrieve pages');
};
