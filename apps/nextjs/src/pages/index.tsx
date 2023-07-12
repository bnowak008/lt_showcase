import { ReactElement, useState } from "react";
import Image from 'next/image'

import { api, type RouterOutputs } from "~/utils/api";
import { NextPageWithLayout } from "./_app";

import { MainLayout } from '../layouts/Main';
import styled from "@emotion/styled";

const Home: NextPageWithLayout = () => {
  // default to random integer between 1 to 100:
  const [albumId, setAlbumId] = useState(Math.floor(Math.random() * 100) + 1);
  const imagesQuery = api.images.byId.useQuery({ id: albumId });

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem 0 0' }}>
          <Image src={"/ltLogo.png"} alt="Logo" width={364} height={98}/>
          <h1>
            LT Photo Album Showcase
          </h1>
        </div>

        {imagesQuery.data ? (
          <div>
            {imagesQuery.data?.length === 0 ? (
              <span>There are no images to display for that album id.</span>
            ) : (
              <div>
                {JSON.stringify(imagesQuery.data)}
              </div>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

Home.getLayout = (page: ReactElement) => (
  <MainLayout>
    {page}
  </MainLayout>
) 

const MainWrap = styled.div({
  display: 'flex',

})

export default Home;
