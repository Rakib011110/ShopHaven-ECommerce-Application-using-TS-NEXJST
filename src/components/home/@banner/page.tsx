"use client"; // For Next.js app directory
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Image } from "@nextui-org/image";

const Banner = () => {
  return (
    <div>
      <div className="banner-container   mx-auto">
        <Swiper
          className="max-h-[740px] w-full"
          autoplay={{ delay: 3000 }}
          loop={true}
          slidesPerView={1}
          spaceBetween={50}>
          <SwiperSlide>
            <Image
              alt="Slide 1"
              src="https://res.cloudinary.com/dqp2vi7h1/image/upload/v1736913875/Purple_And_Yellow_Playful_Discount_Banner_3_pyh0vi.png"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              alt="Slide 2"
              src="https://res.cloudinary.com/dqp2vi7h1/image/upload/v1736888849/Purple_And_Yellow_Playful_Discount_Banner_2_1_zubfcv.png"
            />
          </SwiperSlide>
          {/* <SwiperSlide>
            <Image
              alt="Slide 3"
              src="https://res.cloudinary.com/dqp2vi7h1/image/upload/v1736887019/Blue_Pink_Modern_Special_Offer_Sale_Banner_1_1_wcbvon.png"
            />
          </SwiperSlide> */}
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
