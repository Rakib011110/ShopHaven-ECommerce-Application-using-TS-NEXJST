import Title from "@/src/lib/utils/Title";
import { Link } from "@nextui-org/link";
import { FaTags, FaClock, FaShoppingCart } from "react-icons/fa";

const FlashSales: React.FC = () => {
  //   const router = useRouter();

  return (
    <div className="max-w-screen-2xl mx-auto mt-48">
      <Title
        bigTitle={"Flash Sales!"}
        smallTitle={"Grab Your Favorites Before They're Gone!"}
      />

      <div className="justify-center max-w-screen-2xl mx-auto grid sm:grid-cols-1 md:grid-cols-2">
        <div className="p-8 rounded-lg">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center border-2 border-yellow-300 gap-8 mb-2 transform transition-transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-2 flex items-center justify-center">
                <FaTags className="text-yellow-500 mr-2" />
                Exclusive Discounts
              </h3>
              <p className="text-gray-600">
                Save big on select products during our limited-time flash sale!
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center border-2 border-red-300 mb-2 transform transition-transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-2 flex items-center justify-center">
                <FaClock className="text-red-500 mr-2" />
                Limited Time Offers
              </h3>
              <p className="text-gray-600">
                Don’t miss out! These deals are only available for a short time.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center border-2 border-blue-300 mb-2 transform transition-transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-2 flex items-center justify-center">
                <FaShoppingCart className="text-blue-500 mr-2" />
                Best Picks
              </h3>
              <p className="text-gray-600">
                Explore our hand-picked products at unbeatable prices.
              </p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/flashSales"
              className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-600 transition">
              View All Flash Sale Products
            </Link>
          </div>
        </div>

        <section
          className="relative w-full h-full border-blue-900 overflow-hidden"
          style={{
            backgroundColor: "tomato",
            maskImage:
              "url(\"data:image/svg+xml,%3Csvg width='221' height='100' viewBox='0 0 221 122' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M183 4C183 1.79086 184.791 0 187 0H217C219.209 0 221 1.79086 221 4V14V28V99C221 101.209 219.209 103 217 103H182C179.791 103 178 104.791 178 107V118C178 120.209 176.209 122 174 122H28C25.7909 122 24 120.209 24 118V103V94V46C24 43.7909 22.2091 42 20 42H4C1.79086 42 0 40.2091 0 38V18C0 15.7909 1.79086 14 4 14H24H43H179C181.209 14 183 12.2091 183 10V4Z' fill='%23D9D9D9'/%3E%3C/svg%3E%0A\")",
            WebkitMaskImage:
              "url(\"data:image/svg+xml,%3Csvg width='221' height='122' viewBox='0 0 221 122' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M183 4C183 1.79086 184.791 0 187 0H217C219.209 0 221 1.79086 221 4V14V28V99C221 101.209 219.209 103 217 103H182C179.791 103 178 104.791 178 107V118C178 120.209 176.209 122 174 122H28C25.7909 122 24 120.209 24 118V103V94V46C24 43.7909 22.2091 42 20 42H4C1.79086 42 0 40.2091 0 38V18C0 15.7909 1.79086 14 4 14H24H43H179C181.209 14 183 12.2091 183 10V4Z' fill='%23D9D9D9'/%3E%3C/svg%3E%0A\")",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskSize: "contain",
            WebkitMaskSize: "contain",
          }}>
          <video
            autoPlay
            muted
            loop
            className="absolute top-0 left-0 w-full h-full object-cover">
            <source
              src="https://res.cloudinary.com/dqp2vi7h1/video/upload/v1733933625/Yellow_and_Red_Flash_Sale_Video_3_hjjnvc.mp4"
              type="video/mp4"
            />
          </video>
        </section>
      </div>
    </div>
  );
};

export default FlashSales;
