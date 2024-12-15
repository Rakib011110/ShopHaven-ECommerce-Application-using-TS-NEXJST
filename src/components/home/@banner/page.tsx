"use client"; // For Next.js app directory
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Image } from "@nextui-org/image";

const Banner = () => {
  return (
    <div className="banner-container">
      <Swiper
        autoplay={{ delay: 3000 }}
        loop={true}
        slidesPerView={1}
        spaceBetween={50}>
        <SwiperSlide className="w-full">
          <Image
            alt="Welcome To Our Shop"
            src="https://res.cloudinary.com/dqpohzbea/image/upload/v1729428664/Navy_Black_Minimalist_Personal_Branding_Youtube_Banner_zktpy7.png"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            alt="Slide 2"
            src="https://res.cloudinary.com/dkm4xad0x/image/upload/v1728839524/Pink_White_Photocentric_Feminine_Shopping_Fashion_YouTube_Channel_Art_Banner_szzzvu.png"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            alt="Slide 3"
            src="https://res.cloudinary.com/dkm4xad0x/image/upload/v1728839575/White_Red_Orange_Photocentric_Fashion_Lifestyle_Shopping_Bags_Youtube_Banner_cyk5kc.png"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
