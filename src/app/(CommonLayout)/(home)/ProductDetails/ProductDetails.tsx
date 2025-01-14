import { Link } from "@nextui-org/link";
import { Image } from "@nextui-org/image";
import { useState } from "react";
import { Button } from "@nextui-org/react";

import { useGetProductByIdQuery } from "@/src/redux/api/productApi";
import { useGetAllProductsQuery } from "@/src/redux/api/productApi";
import { useUser } from "@/src/context/user.provider";
import { useCreateReviewMutation } from "@/src/redux/api/ReviewAPI";
import { useAddItemToCartMutation } from "@/src/redux/api/cartApi"; // Import the cart hook
import CardButton from "@/src/components/UI/CardButton/CardButton";

const ProductDetails = ({ productId }: { productId: string }) => {
  const { user } = useUser();
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [createReview] = useCreateReviewMutation();
  const {
    data: productData,
    isLoading,
    error,
  } = useGetProductByIdQuery(productId, { pollingInterval: 3000 });
  const { data: relatedData } = useGetAllProductsQuery({});
  const [addToCart] = useAddItemToCartMutation(); // Initialize the hook for adding items to cart

  const product = productData?.data;

  if (isLoading) {
    return <div>Loading product details...</div>;
  }

  if (error || !product) {
    return <div>Failed to load product details.</div>;
  }

  // Filter related products based on the same category
  const relatedProducts = relatedData?.data?.filter(
    (p: any) => p.category === product.category && p.id !== product.id
  );

  const handleReviewSubmit = async () => {
    if (!user) {
      alert("Please log in to leave a review.");
      return;
    }

    if (!rating || !reviewText) {
      alert("Please provide a rating and review.");
      return;
    }

    try {
      await createReview({
        productId,
        userId: user.userId,
        rating,
        comment: reviewText,
      });

      setReviewText("");
      setRating(null);
    } catch (error: any) {
      alert("Failed to submit review. Please try again.");
    }
  };

  const handleAddToCart = async () => {
    try {
      const payload = { productId: product.id, quantity: 1 };
      await addToCart(payload).unwrap(); // Add product to cart
      alert("Product added to cart successfully!");
    } catch (error: any) {
      alert("Failed to add product to cart.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col lg:flex-row gap-10 bg-gray-50 border border-gray-200 rounded-lg p-6">
        {/* Product Image */}
        <div className="w-full lg:max-w-md">
          <Image
            alt={product?.name}
            className="w-full h-auto rounded-lg object-cover border border-gray-300"
            src={product?.image || "https://via.placeholder.com/300"}
          />
          {/* Flash Sale Badge */}
          {product?.isFlashSale && product?.flashSaleEndAt && (
            <div className="mt-4 text-center text-white bg-red-500 py-1 px-4 rounded-lg text-sm font-bold">
              Flash Sale Ends:{" "}
              {new Date(product?.flashSaleEndAt).toLocaleString()}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="flex flex-col flex-1 space-y-6">
          {/* Product Title and Description */}
          <h2 className="text-3xl font-bold text-gray-800">{product?.name}</h2>
          <p className="text-gray-600 text-lg">{product?.description}</p>

          {/* Pricing and Discount */}
          <div className="text-lg space-y-2">
            <p className="text-green-600 font-bold text-2xl">
              ${product?.price.toFixed(2)}
            </p>
            {product?.discount > 0 && (
              <p className="text-sm text-gray-500">
                Discount:{" "}
                <span className="text-red-600 font-semibold">
                  ${product?.discount.toFixed(2)}
                </span>
              </p>
            )}
          </div>

          {/* Category and Inventory */}
          <div className="space-y-1">
            <p className="text-sm text-gray-500">
              Category:{" "}
              <span className="font-semibold text-gray-700">
                {product?.category}
              </span>
            </p>
            <p className="text-sm text-gray-500">
              Availability:{" "}
              <span
                className={`font-semibold ${
                  product?.inventoryCount > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}>
                {product?.inventoryCount > 0
                  ? `In Stock (${product?.inventoryCount} available)`
                  : "Out of Stock"}
              </span>
            </p>
          </div>

          {/* Shop Details */}
          <Link
            className="text-blue-500 hover:underline text-sm font-medium"
            href={`/shop-details/${product?.shopId}`}>
            View more products from this shop
          </Link>

          {/* Add to Cart Button */}
          <div>
            <Button
              color="success"
              isDisabled={product?.inventoryCount === 0}
              onClick={handleAddToCart}
              className="w-full py-2 rounded-md text-white bg-green-600 hover:bg-green-700">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold mt-8">Customer Reviews</h3>
      <div className="mt-4">
        {product.reviews?.length > 0 ? (
          product.reviews.map((review: any) => (
            <div key={review.id} className="border-b border-gray-200 pb-4 mb-4">
              <div>
                <p className="font-semibold">{review?.email}</p>
                <p className="text-sm text-gray-600">{review?.comment}</p>
                <p className="text-yellow-500">{"⭐".repeat(review?.rating)}</p>
              </div>
              {review?.vendorReply && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                  <h4 className="font-bold text-blue-500">@Vendor Reply:</h4>
                  <p className="text-gray-700">{review.vendorReply}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to leave a review!</p>
        )}
      </div>

      {user && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold">Leave a Review</h4>
          <textarea
            className="w-full mt-2 border border-gray-300 rounded-lg p-2"
            placeholder="Write your review here..."
            rows={4}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <div className="mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className={`text-xl ${(rating as any) >= star ? "text-yellow-500" : "text-gray-300"}`}
                onClick={() => setRating(star)}>
                ⭐
              </button>
            ))}
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-600"
            onClick={handleReviewSubmit}>
            Submit Review
          </button>
        </div>
      )}

      <div>
        <h3 className="text-xl font-bold mt-8">Related Products</h3>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          {relatedProducts.map((product: any) => (
            <div
              key={product.id}
              className="border mx-auto border-blue-600 rounded-xl bg-white shadow-md p-4">
              <div>
                <Image
                  alt={product.name}
                  className="h-64 max-w-full mx-auto border p-3 border-blue-800 object-cover rounded-md mb-4 "
                  src={product.image}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="text-lg font-bold mb-4">${product.price}</p>
              <p className="text-lg font-bold mb-4">
                Discount ${product.discount}
              </p>
              <Link
                className="flex justify-between"
                href={`/product/${product.id}`}>
                <CardButton text="Details" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
