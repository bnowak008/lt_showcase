import { ReactNode } from "react";

import styled from '@emotion/styled';
import Head from "next/head";

export const MainLayout = ({ children }: { children: ReactNode }) => (
  <>
    <Head>
      <title>LT Showcase</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Main>
      {children}
    </Main>
  </>
);

const Main = styled.main({
  display: 'flex',
  width: '100%',
  height: '100%',
});
