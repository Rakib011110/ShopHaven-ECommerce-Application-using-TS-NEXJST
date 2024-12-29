import CardButton from "@/src/components/UI/CardButton/CardButton";
import Image from "next/image";

const CategorySectionWoman = () => {
  // Fake product data
  const products = [
    {
      id: 1,
      name: "Elegant Red Dress",
      price: "£80.00",
      image:
        "https://www.riccoindia.com/cdn/shop/products/3D7091A0-317F-4D0D-846D-B11C6E031966_580x.jpg?v=1657705803",
      discount: "-10%",
    },
    {
      id: 2,
      name: "Leather Handbag",
      price: "£120.00",
      image:
        "https://img4.dhresource.com/webp/m/0x0/f3/albu/jc/o/24/ec4023b8-d420-401c-ada3-25d1593077ac.jpg",
    },
    {
      id: 3,
      name: "High-Heeled Shoes",
      price: "£95.00",
      image:
        "https://i.pinimg.com/736x/88/be/95/88be959b8a6432069cecacd037a2278e.jpg",
    },
    {
      id: 4,
      name: "Stylish Sunglasses",
      price: "£40.00",
      image:
        "https://m.media-amazon.com/images/I/617yt3E9ejL._AC_UF894,1000_QL80_.jpg",
      isNew: true,
    },
    {
      id: 5,
      name: "Silk Scarf",
      price: "£25.00",
      image:
        "https://i.etsystatic.com/52554993/r/il/0fe3c2/6117470591/il_fullxfull.6117470591_lxs4.jpg",
      discount: "-5%",
    },
    {
      id: 6,
      name: "Luxury Necklace",
      price: "£200.00",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR07xq7I794WxniatiW8_BkE9of0Y5m7BVqig&s",
    },
  ];

  return (
    <div className="mt-40  container mx-auto px-4 flex flex-col lg:flex-row gap-8 items-stretch">
      {/* Left Section: Hero Model */}
      <div className="flex-1">
        <div className="w-full h-full">
          <Image
            alt="Model"
            className="object-cover rounded-lg shadow-lg h-full"
            height={900}
            src="https://htmldemo.net/reid/reid/assets/img/bg/banner2.jpg"
            width={1000}
          />
        </div>
      </div>

      {/* Right Section: Product Cards */}
      <div className="flex-[1.3] flex flex-col">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-2">For Women’s Collection</h2>
          <p className="text-gray-500">Choose your products</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center space-x-8 mb-8 text-lg font-semibold">
          <button className="text-orange-600 border-b-2 border-orange-600">
            Dresses
          </button>
          <button className="hover:text-orange-600">Handbags</button>
          <button className="hover:text-orange-600">Shoes</button>
          <button className="hover:text-orange-600">Accessories</button>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
          {products.slice(0, 6).map((product) => (
            <div
              key={product.id}
              className="bg-[#f5c3ff] border-pink-600 bg-opacity-30 rounded-lg shadow hover:shadow-lg transition h-full flex flex-col">
              <div className="relative p-1 rounded-lg mx-auto">
                <Image
                  alt={product.name}
                  className="rounded-lg object-cover h-[200px]"
                  height={200}
                  src={product.image}
                  width={200}
                />
                {product.discount && (
                  <span className="absolute top-2 left-2 bg-orange-500 text-white text-sm px-2 py-1 rounded">
                    {product.discount}
                  </span>
                )}
                {product.isNew && (
                  <span className="absolute top-2 left-2 bg-green-500 text-white text-sm px-2 py-1 rounded">
                    New
                  </span>
                )}
              </div>
              <div className="p-3 flex-1 flex flex-col justify-center">
                <h3 className="text-lg font-medium">{product.name}</h3>
                <p className="text-gray-500">{product.price}</p>
              </div>
              <div className="p-2">
                <CardButton text=" Details" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySectionWoman;
