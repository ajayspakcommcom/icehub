
import type { AppProps } from "next/app";
import '../styles/globals.scss';
import { SessionProvider } from "next-auth/react";

import dynamic from 'next/dynamic';
const Layout = dynamic(() => import('@/components/layout/Layout'));

export default function App({ Component, pageProps }: AppProps) {

  return (
    <SessionProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
