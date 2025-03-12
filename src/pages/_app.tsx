import Header from "@/components/Header/Header";
import "@/styles/reset.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { firago } from "@/fonts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={firago.className}>
        <Header />
        <main className="container">
          <Component {...pageProps} />
        </main>
      </div>
    </>
  );
}
