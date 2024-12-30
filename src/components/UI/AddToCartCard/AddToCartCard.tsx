import React from "react";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
const AddToCartCard = ({
  item,
  CartLoading,
  handleUpdateQuantity,
  handleRemoveItem,
  CartError,
}: {
  item: any;
  CartLoading: any;
  handleUpdateQuantity: any;
  handleRemoveItem: any;
  CartError: any;
}) => {
  return (
    <Card key={item.id} isHoverable className="shadow-md">
      <CardBody>
        <Image
          alt={item.product.name}
          className="rounded object-cover"
          height="150px"
          src={item.product.image || "https://via.placeholder.com/150"}
          width="100%"
        />
        <div className="mt-4">
          <p className="text-lg font-semibold">{item.product.name}</p>
          <p className="text-gray-600 text-sm">{item.product.description}</p>
          <p className="text-gray-800 font-bold mt-2">
            ${item.product.price.toFixed(2)}
          </p>
          <div className="flex items-center mt-2">
            <span className="text-sm text-gray-500 mr-2">Quantity:</span>
            <input
              className="w-16 px-2 py-1 border rounded text-center"
              min="1"
              type="number"
              value={item.quantity}
              onChange={(e) =>
                handleUpdateQuantity(item.id, Number(e.target.value))
              }
            />
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex justify-between items-center">
        <p className="font-semibold">
          Subtotal: ${(item.product.price * item.quantity).toFixed(2)}
        </p>
        <Button color="danger" onClick={() => handleRemoveItem(item.id)}>
          Remove
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddToCartCard;
