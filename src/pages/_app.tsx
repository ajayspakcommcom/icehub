

import Layout from "@/components/layout/Layout";
import type { AppProps } from "next/app";
import '../styles/globals.scss';
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {

  return (
    <SessionProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
