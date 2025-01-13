import React from "react";

interface BannerProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  className?: string;
}

const ProductsBanner: React.FC<BannerProps> = ({
  title,
  subtitle,
  backgroundImage,
  className,
}) => {
  return (
    <div
      className={`relative w-full h-64 flex items-center justify-center text-center text-white ${className}`}
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : "linear-gradient(to right, #4facfe, #00f2fe)",
        backgroundSize: "cover",

        backgroundPosition: "center",
      }}>
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      <div className="relative z-10 px-4">
        <h1 className="text-3xl font-bold">{title}</h1>
        {subtitle && <p className="text-lg mt-2">{subtitle}</p>}
      </div>
    </div>
  );
};

export default ProductsBanner;
