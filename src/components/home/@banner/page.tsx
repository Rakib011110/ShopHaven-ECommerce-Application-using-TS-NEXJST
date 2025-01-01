"use client"; // For Next.js app directory
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Image } from "@nextui-org/image";

const Banner = () => {
  return (
    <div>
      <div className="banner-container   mx-auto">
        <Swiper
          className="max-h-[750px] w-full"
          autoplay={{ delay: 3000 }}
          loop={true}
          slidesPerView={1}
          spaceBetween={50}>
          <SwiperSlide>
            <Image
              alt="Slide 2"
              src="https://res.cloudinary.com/dqp2vi7h1/image/upload/v1735711812/Gray_Minimalist_New_Collection_Banner_2_1_aoapkd.png"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              alt="Slide 2"
              src="https://res.cloudinary.com/dqp2vi7h1/image/upload/v1735711987/Pink_White_Photocentric_Feminine_Shopping_Fashion_YouTube_Channel_Art_Banner_1_avy7cu.png"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
