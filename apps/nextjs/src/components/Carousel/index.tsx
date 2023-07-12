import { ReactNode, useEffect } from "react";
import RM_Carousel, { ResponsiveType } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export const Carousel = ({ children }: { children: ReactNode }) => {

  useEffect(() => {
    console.log('test');
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  } satisfies ResponsiveType;

  return (
    <RM_Carousel
      showDots={true}
      responsive={responsive}
      ssr={true}
      keyBoardControl={true}
      centerMode={true}
    >
      {children}
    </RM_Carousel>
  )
}