import { useState } from "react";
import Image from "next/image";
import styled from "@emotion/styled";

import { api } from "~/utils/api";
import { NumericRangeInput } from "~/components/NumericRangInput";
import { type NextPageWithLayout } from "~/pages/_app";

export const HomeScreen: NextPageWithLayout = () => {
  // default to random integer between 1 to 100:
  const [albumId, setAlbumId] = useState<number>(Math.floor(Math.random() * 100) + 1);
  const imagesQuery = api.images.byId.useQuery({ id: albumId }, { staleTime: Infinity });

  const handleAlbumIdChange = (num: number | undefined) => {
    typeof num !== "undefined" && setAlbumId(num);
  };

  return (
    <>
      <HomeWrap>
        <HeadWrap>
          <Image src={"/ltLogo.png"} alt="Logo" width={364} height={98} />
          <h1>LT Photo Album Showcase</h1>
          <div>
            <NumericRangeInput value={albumId} min={1} max={100} label="Album Id (1-100)" onChange={handleAlbumIdChange} />
          </div>
        </HeadWrap>

        <GalleryWrap>
          <GalleryInnerWrap>
            {imagesQuery.data ? (
              <>
                {imagesQuery.data?.length === 0 ? (
                  <span>There are no images to display for that album id.</span>
                ) : (
                  <>
                    {imagesQuery.data.map((image) => (
                      <GalleryItem key={`image-${image.albumId}-${image.id}`}>
                        <Image src={image.thumbnailUrl} alt={`image-${image.id}`} width={150} height={150} />
                        <GalleryItemText>({image.id})</GalleryItemText>
                        <GalleryItemText>{image.title}</GalleryItemText>
                      </GalleryItem>
                    ))}
                  </>
                )}
              </>
            ) : (
              <p>Loading...</p>
            )}
          </GalleryInnerWrap>
        </GalleryWrap>
      </HomeWrap>
    </>
  );
};

const HomeWrap = styled.div({ display: "flex", flexDirection: "column", flexGrow: 1 });
const HeadWrap = styled.div({ display: "flex", flexDirection: "column", alignItems: "center", padding: "1rem 0" });

const GalleryWrap = styled.div({ display: "flex", flexDirection: "column", flexGrow: 1, alignItems: "center", overflow: "auto", padding: "0 0rem" });
const GalleryInnerWrap = styled.div({ display: "flex", flexWrap: "wrap", justifyContent: "center", maxWidth: "100rem" });
const GalleryItem = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: 200,
  height: 225,
  margin: "1rem",
  boxShadow: "rgba(0, 0, 0, 0.25) 0px 2px 8px",
  borderRadius: ".5rem",
  padding: ".5rem",
});
const GalleryItemText = styled.p({ fontSize: ".8rem", margin: 0 });
