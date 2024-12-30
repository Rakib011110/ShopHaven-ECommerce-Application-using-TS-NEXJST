"use client"; // For Next.js app directory
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Image } from "@nextui-org/image";

const Banner = () => {
  return (
    <div>
      <div className="banner-container  mx-auto">
        <Swiper
          autoplay={{ delay: 3000 }}
          loop={true}
          slidesPerView={1}
          spaceBetween={50}>
          {/* <SwiperSlide className="w-full">
          <Image
            alt="Welcome To Our Shop"
            src="https://res.cloudinary.com/dqpohzbea/image/upload/v1729428664/Navy_Black_Minimalist_Personal_Branding_Youtube_Banner_zktpy7.png"
          />
        </SwiperSlide> */}
          <SwiperSlide>
            <Image
              alt="Slide 2"
              src="https://res.cloudinary.com/dqp2vi7h1/image/upload/v1734329825/Gray_Red_Black_White_Dark_Red_Photo_Shopping_Black_Friday_Sale_Banner_cu8wyw.png"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              alt="Slide 3"
              src="https://res.cloudinary.com/dqp2vi7h1/image/upload/v1734328503/Pink_White_Feminine_Shopping_Fashion_YouTube_Channel_Art_Banner_1_doq1pf.png"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
