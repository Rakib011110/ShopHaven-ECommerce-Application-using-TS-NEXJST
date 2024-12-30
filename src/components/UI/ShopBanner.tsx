import React from "react";

const ShopBanner = () => {
  return (
    <div className="bg-[#43e7f3af]">
      <div
        className="relative mt-4  mx-auto bg-no-repeat  bg-center object-cover h-64 flex items-center justify-center rounded-md text-white"
        style={{
          backgroundImage: `url('https://img.freepik.com/free-vector/flat-design-shopping-center-facebook-cover_23-2149337410.jpg')`,
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
