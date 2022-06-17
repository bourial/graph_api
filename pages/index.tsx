import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

const Home: NextPage = () => {
  const [dataFromLogin, setDataFromLogin] = useState<any>();
  const [post, setPost] = useState<string>();

  const login = () => {
    window.FB.login(
      response => {
        if (response.status === "connected") {
          console.log(response.authResponse.accessToken);
          fetch(
            `https://graph-api.vercel.app/api/hello?token=${response.authResponse.accessToken}`
          )
            .then(response => response.json())
            .then(data => setDataFromLogin(data))
            .catch(error => {
              console.error("Error:", error);
            });
        }
      },
      { scope: "public_profile, pages_read_engagement, pages_manage_posts" }
    );
  };

  const createPost = () => {
    fetch(`https://graph-api.vercel.app/api/post`, {
      method: "POST",
      body: JSON.stringify({
        pageId: dataFromLogin.accessToken.id,
        accessToken: dataFromLogin.accessToken.access_token,
        post,
      }),
      headers: { "Content-Type": "application/json" },
    }).then(response => response.json().then(data => alert(data.message)));
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center space-y-4 px-20 text-center">
        {!dataFromLogin ? (
          <button
            onClick={login}
            className="bg-green-500 text-white font-semibold px-12 py-3 rounded-xl"
          >
            Login
          </button>
        ) : (
          <div className="font-semibold">
            your logged in as {dataFromLogin.accessToken.name}{" "}
            <span className="font-bold">Edit Page</span>
          </div>
        )}

        {dataFromLogin && (
          <>
            <input
              className="bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl"
              placeholder="Write something..."
              type="text"
              value={post}
              onChange={e => setPost(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white font-semibold px-12 py-3 rounded-xl"
              onClick={createPost}
            >
              Create New Post
            </button>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
