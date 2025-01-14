import Title from "@/src/lib/utils/Title";
import { Image } from "@nextui-org/image";
import React from "react";
import { FaBoxes, FaDollarSign, FaHeadset } from "react-icons/fa";

const OurServices = () => {
  return (
    <div>
      <div className=" max-w-screen-2xl mx-auto mt-24 mb-5">
        <div className=" justify-center items-center gap-5 max-w-screen-2xl mx-auto grid sm:grid-cols-1 md:grid-cols-2 ">
          <div className="   rounded-lg  ">
            <div className="space-y-3">
              <Title bigTitle={"Why Choose Us?"} smallTitle={""} />
              <div className=" p-6 rounded-lg shadow-lg text-center border-2 border-blue-300 gap-8 mb-2 transform transition-transform hover:scale-105">
                <h3 className="text-2xl font-semibold mb-2 flex items-center justify-center">
                  <FaDollarSign className="text-blue-500 mr-2" />
                  Best Prices
                </h3>
                <p className="text-gray-600">
                  prices on the market, ensuring you get the best deal for your
                  money.
                </p>
              </div>
              <div className=" p-6 rounded-lg shadow-lg text-center border-2 border-green-300 mb-2 transform transition-transform hover:scale-105">
                <h3 className="text-2xl font-semibold mb-2 flex items-center justify-center">
                  <FaBoxes className="text-green-500 mr-2" />
                  Wide Selection
                </h3>
                <p className="text-gray-600">
                  Explore our extensive range of products, from the latest
                  models to timeless classics.
                </p>
              </div>
              <div className=" p-6 rounded-lg shadow-lg text-center border-2 border-red-300 mb-2 transform transition-transform hover:scale-105">
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

          <section>
            <Image
              className="w-full h-full"
              src="https://150803281.v2.pressablecdn.com/wp-content/uploads/2022/05/How-to-Automate-Your-Ecommerce-Customer-Service.png"
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
