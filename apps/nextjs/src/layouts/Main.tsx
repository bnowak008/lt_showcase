import { ReactNode } from "react";
import Head from "next/head";
import { Heebo } from 'next/font/google';

import styled from '@emotion/styled';

const heebo = Heebo({ subsets: ['latin'] })

export const MainLayout = ({ children }: { children: ReactNode }) => (
  <>
    <Head>
      <title>LT Showcase</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Main className={heebo.className}>
      {children}
    </Main>
  </>
);

const Main = styled.main({
  display: 'flex',
  width: '100%',
  height: '100%',
});
