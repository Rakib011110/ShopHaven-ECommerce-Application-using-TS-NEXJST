// Reusable Product Card Component
import { Button, Image } from "@nextui-org/react";
import { Link } from "@nextui-org/link";
import CardButton from "@/src/components/UI/CardButton/CardButton";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  link: string;
  button?: any;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  price,
  image,
  link,
  button,
}) => {
  return (
    <div>
      <div
        key={id}
        className="border  border-blue-600 rounded-xl   shadow-md p-4">
        <div className="flex justify-center ">
          <Image
            alt={name}
            className="h-48 w-64 border-b  border-blue-800 object-cover rounded-md mb-4"
            src={image}
          />
        </div>
        <div className="font-mono">
          <h3 className="text-xl font-semibold mb-2">{name}</h3>
          <h5 className=" mb-2 data-[active=true]:text-primary">
            {description}
          </h5>
          <p className="text-lg font-bold mb-4 text-blue">
            <span className="text-blue-600">$</span>
            {price}
          </p>
          <Link href={link}>
            {/* <Button>Details</Button> */}
            <CardButton text="Details" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
