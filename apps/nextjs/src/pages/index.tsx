import { ReactElement, useState } from "react";

import { api, type RouterOutputs } from "~/utils/api";
import { NextPageWithLayout } from "./_app";

import { MainLayout } from '../layouts/Main';

const Home: NextPageWithLayout = () => {
  // default to random integer between 1 to 100:
  const [albumId, setAlbumId] = useState(Math.floor(Math.random() * 100) + 1);
  const imagesQuery = api.images.byId.useQuery({ id: albumId });

  return (
    <>
      <div>
        <h1>
          LT Photo Album Showcase
        </h1>

        {imagesQuery.data ? (
          <div>
            {imagesQuery.data?.length === 0 ? (
              <span>There are no posts!</span>
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

export default Home;
