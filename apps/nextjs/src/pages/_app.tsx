import { NextComponentType, NextPage } from "next";
import "../styles/globals.css";

import type { AppProps } from "next/app";

import { api } from "~/utils/api";
import { ReactElement, ReactNode } from "react";

 
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
 
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps: { ...pageProps } }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)
 
  return getLayout(<Component {...pageProps} />)
}

export default api.withTRPC(MyApp as NextComponentType<any, any, any>);
