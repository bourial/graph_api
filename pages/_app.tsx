import "../styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";
import { useEffect } from "react";
import { APP_ID } from "../api_helpers/fb";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: APP_ID,
        autoLogAppEvents: true,
        xfbml: true,
        version: "v14.0",
      });
    };
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <Script
        async
        defer
        crossOrigin="anonymous"
        src="https://connect.facebook.net/en_US/sdk.js"
      />
    </>
  );
}

export default MyApp;
