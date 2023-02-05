// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper"

// Import Swiper styles
import "swiper/css"
import styled from "styled-components"
import "swiper/css/navigation"
import { media } from "../../../../styles/style-variables"
import "swiper/css/pagination"
import { TrashSvg } from "../../../all-svg"
import Image from "next/image"

const SliderContent = styled.div`
  cursor: grab;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  :active {
    cursor: grabbing;
  }
  height: 100%;
`

const SwiperWrapper = styled.div<{ height?: boolean }>`
  width: 100%;
  height: ${({ height }) => (height ? "100%" : "calc(100% - 132px)")};
  max-width: 372px;
  > div {
    height: 100%;
  }
  .swiper-button-next,
  .swiper-button-prev {
    width: 48px;
    height: 48px;
    border-radius: 100%;
    background: white;
    ${media.mobile} {
      display: none;
    }
  }
  .swiper-button-next:after,
  .swiper-button-prev:after {
    content: "➜" !important ;
    color: black;
    font-size: 16px;
  }
  .swiper-button-prev:after {
    content: "➜" !important;
    transform: rotate(180deg);
  }
  ${media.mobile} {
    height: 240px;
    max-width: calc(100vw - 32px);
  }
  .swiper-pagination-bullet {
    min-width: 96px;
    max-width: 96px;
    height: 96px;
    position: relative;
    border-radius: var(--default-border-radius);
    overflow: hidden;
    opacity: 1;
    img {
      width: 100%;
      object-fit: cover;
      height: 100%;
    }
  }
  .swiper-pagination-bullet-active {
    opacity: 0.5;
  }
`

export const AddPhotoSlider = ({ data, ev, set_my_swiper, height, setActiveIndex }) => {
  return (
    <SwiperWrapper height={height}>
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        navigation
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex)
        }}
        onSwiper={(swiper) => {}}
        onInit={(ev) => {
          set_my_swiper(ev)
        }}
      >
        {data.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <SliderContent>
                <Image fill src={item.url} alt="" />
              </SliderContent>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </SwiperWrapper>
  )
}
