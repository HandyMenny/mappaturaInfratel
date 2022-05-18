import "../styles/globals.css";

import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col w-full min-h-screen bg-indigo-800 text-indigo-50">
      <Toaster
        position="top-center"
        toastOptions={{
          error: {
            style: {
              background: "#e61717",
              color: "white",
              whiteSpace: "pre-line",
            },
          },
        }}
      />
      <Component {...pageProps} />
    </div>
  );
}
export default MyApp;
