import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  const login = () => {
    window.FB.login(
      response => {
        if (response.status === "connected") {
          console.log(response.authResponse.accessToken);
          fetch(
            `https://graph-api.vercel.app/api/hello?token=${response.authResponse.accessToken}`
          )
            .then(response => response.json())
            .then(data => console.log(data));
        }
      },
      { scope: "public_profile, pages_read_engagement, pages_manage_posts" }
    );
  };

  const createPost = () => {
    fetch(`https://graph-api.vercel.app/api/post`).then(response =>
      response.json().then(data => console.log(data))
    );
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center space-y-4 px-20 text-center">
        <button
          onClick={login}
          className="bg-green-500 text-white font-semibold px-12 py-3 rounded-xl"
        >
          Login
        </button>
        <button
          className="bg-blue-500 text-white font-semibold px-12 py-3 rounded-xl"
          onClick={createPost}
        >
          Create New Post
        </button>
      </main>
    </div>
  );
};

export default Home;
