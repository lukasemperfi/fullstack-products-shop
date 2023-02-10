import { FC, useCallback, useState } from "react";
import Swiper, { Navigation, Thumbs } from "swiper";
import { Swiper as SwiperReact, SwiperSlide } from "swiper/react";
import "swiper/css";

import "./product-images-slider.scss";
import { AdaptivImage } from "components/adaptiv-image/adaptiv-image";

interface ProductImagesSliderProps {
  images: string[];
}

export const ProductImagesSlider: FC<ProductImagesSliderProps> = (props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<Swiper | undefined>();

  const handleLeftClick = useCallback(() => {
    if (!thumbsSwiper) {
      return;
    }
    thumbsSwiper.slidePrev();
  }, [thumbsSwiper]);

  const handleRightClick = useCallback(() => {
    if (!thumbsSwiper) {
      return;
    }
    thumbsSwiper.slideNext();
  }, [thumbsSwiper]);

  return (
    <>
      <SwiperReact
        loop={true}
        spaceBetween={10}
        modules={[Navigation, Thumbs]}
        grabCursor={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        className="product-images-slider"
      >
        {props.images.map((item, index) => (
          <SwiperSlide key={index} className={"product-images-slider__slide"}>
            <AdaptivImage src={item} alt="product images" />
          </SwiperSlide>
        ))}
      </SwiperReact>
      <div className={"thumbs-container"}>
        <SwiperReact
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={22}
          navigation={{
            nextEl: ".product-images-slider-thumbs__button-next",
            prevEl: ".product-images-slider-thumbs__button-prev",
          }}
          slidesPerView={4}
          modules={[Navigation, Thumbs]}
          className={"product-images-slider-thumbs"}
        >
          {props.images.map((item, index) => (
            <SwiperSlide
              key={index}
              className={"product-images-slider-thumbs__slide"}
            >
              <AdaptivImage
                src={item}
                alt="product images"
                imgContainerClassname={
                  "product-images-slider-thumbs__img-container"
                }
              />
            </SwiperSlide>
          ))}
        </SwiperReact>
        <button
          onClick={handleLeftClick}
          className={"product-images-slider-thumbs__button-prev"}
        ></button>
        <button
          onClick={handleRightClick}
          className={"product-images-slider-thumbs__button-next"}
        ></button>
      </div>
    </>
  );
};
