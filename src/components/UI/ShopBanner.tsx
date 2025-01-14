import React from "react";

const ShopBanner = () => {
  return (
    <div className="">
      <div
        className=" mt-4  mx-auto bg-no-repeat  bg-center o h-80 w-full flex items-center justify-center rounded-md text-white"
        style={{
          backgroundImage: `url('https://img.freepik.com/free-psd/horizontal-banner-template-big-sale-with-woman-shopping-bags_23-2148786755.jpg')`,
        }}>
        <div className="absolute inset-0 "></div>
        {/* <div className="relative z-10 text-center px-6">
          <h1 className="text-3xl md:text-5xl font-bold">
            Welcome to Campers Shop
          </h1>
          <p className="text-lg mt-2">
            Explore the best camping gear for your adventures.
          </p>
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
            Shop Now
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ShopBanner;
