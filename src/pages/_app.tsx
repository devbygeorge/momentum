import Header from "@/components/Header/Header";
import "@/styles/reset.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { firago } from "@/assets/fonts";
import { AppProvider } from "@/context/AppContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalProvider } from "@/context/ModalContext";
import GlobalModals from "@/features/modals/GlobalModals";

// Create a QueryClient instance
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <ModalProvider>
            <div className={firago.className} style={{ height: "100vh" }}>
              <Header />
              <main className="container">
                <Component {...pageProps} />
              </main>
              <GlobalModals />
            </div>
          </ModalProvider>
        </AppProvider>
      </QueryClientProvider>
    </>
  );
}
