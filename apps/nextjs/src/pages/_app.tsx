import { type ReactElement, type ReactNode } from "react";
import { type NextComponentType, type NextPage } from "next";
import type { AppProps } from "next/app";

import { api } from "~/utils/api";
import { MainLayout } from "~/layouts/Main";

import "../styles/globals.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps: { ...pageProps } }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return <MainLayout>{getLayout(<Component {...pageProps} />)}</MainLayout>;
};

export default api.withTRPC(MyApp as NextComponentType<any, any, any>);
