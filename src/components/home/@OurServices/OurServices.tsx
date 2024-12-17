import Title from "@/src/lib/utils/Title";
import React from "react";
import { FaBoxes, FaDollarSign, FaHeadset } from "react-icons/fa";

const OurServices = () => {
  return (
    <div>
      <div className=" max-w-screen-2xl mx-auto mt-40 mb-40">
        <Title
          bigTitle={"Why Choose Us?"}
          smallTitle={"Your Journey, Your Wheels, Your Way!"}
        />

        <div className=" justify-center   max-w-screen-2xl mx-auto grid sm:grid-cols-1 md:grid-cols-2 ">
          <div className=" p-8  rounded-lg  ">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center border-2 border-blue-300 gap-8 mb-2 transform transition-transform hover:scale-105">
                <h3 className="text-2xl font-semibold mb-2 flex items-center justify-center">
                  <FaDollarSign className="text-blue-500 mr-2" />
                  Best Prices
                </h3>
                <p className="text-gray-600">
                  prices on the market, ensuring you get the best deal for your
                  money.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center border-2 border-green-300 mb-2 transform transition-transform hover:scale-105">
                <h3 className="text-2xl font-semibold mb-2 flex items-center justify-center">
                  <FaBoxes className="text-green-500 mr-2" />
                  Wide Selection
                </h3>
                <p className="text-gray-600">
                  Explore our extensive range of products, from the latest
                  models to timeless classics.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center border-2 border-red-300 mb-2 transform transition-transform hover:scale-105">
                <h3 className="text-2xl font-semibold mb-2 flex items-center justify-center">
                  <FaHeadset className="text-red-500 mr-2" />
                  24/7 Support
                </h3>
                <p className="text-gray-600">
                  Our dedicated support team is available around the clock to
                  assist you with any queries or issues.
                </p>
              </div>
            </div>
          </div>

          <section
            className="relative md:w-[100%] lg:w-[100%] md:h-[100%] lg:h-[110%]   border-blue-900"
            style={{
              aspectRatio: "1213/967",
              backgroundColor: "tomato",
              maskImage:
                "url(\"data:image/svg+xml,%3Csvg width='221' height='122' viewBox='0 0 221 122' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M183 4C183 1.79086 184.791 0 187 0H217C219.209 0 221 1.79086 221 4V14V28V99C221 101.209 219.209 103 217 103H182C179.791 103 178 104.791 178 107V118C178 120.209 176.209 122 174 122H28C25.7909 122 24 120.209 24 118V103V94V46C24 43.7909 22.2091 42 20 42H4C1.79086 42 0 40.2091 0 38V18C0 15.7909 1.79086 14 4 14H24H43H179C181.209 14 183 12.2091 183 10V4Z' fill='%23D9D9D9'/%3E%3C/svg%3E%0A\")",
              WebkitMaskImage:
                "url(\"data:image/svg+xml,%3Csvg width='221' height='122' viewBox='0 0 221 122' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M183 4C183 1.79086 184.791 0 187 0H217C219.209 0 221 1.79086 221 4V14V28V99C221 101.209 219.209 103 217 103H182C179.791 103 178 104.791 178 107V118C178 120.209 176.209 122 174 122H28C25.7909 122 24 120.209 24 118V103V94V46C24 43.7909 22.2091 42 20 42H4C1.79086 42 0 40.2091 0 38V18C0 15.7909 1.79086 14 4 14H24H43H179C181.209 14 183 12.2091 183 10V4Z' fill='%23D9D9D9'/%3E%3C/svg%3E%0A\")",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskSize: "contain",
              WebkitMaskSize: "contain",
            }}>
            <video
              autoPlay
              loop
              muted
              className="w-full  h-[100%] object-cover  aspect-square border-1 ">
              <source
                src="https://res.cloudinary.com/dqp2vi7h1/video/upload/v1734455629/Black_and_White_Illustrative_Coming_Soon_Animated_Social_Media_ohwwww.mp4https://res.cloudinary.com/dqp2vi7h1/video/upload/v1734456268/Black_and_White_Illustrative_Coming_Soon_Animated_Social_Media_1_oji1n0.mp4"
                type="video/mp4"
              />
            </video>
          </section>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
