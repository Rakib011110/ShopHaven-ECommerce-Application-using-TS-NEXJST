// ProductDetails.js

import { Link } from "@nextui-org/link";
import { Image } from "@nextui-org/image";
import { useState } from "react";

import { useGetProductByIdQuery } from "@/src/redux/api/productApi";
import { useGetAllProductsQuery } from "@/src/redux/api/productApi";
import { useUser } from "@/src/context/user.provider";
import { useCreateReviewMutation } from "@/src/redux/api/ReviewAPI";

const ProductDetails = ({ productId }: { productId: string }) => {
  const { user } = useUser();
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [createReview] = useCreateReviewMutation();
  const {
    data: productData,
    isLoading,
    error,
  } = useGetProductByIdQuery(productId);

  const { data: relatedData } = useGetAllProductsQuery({});

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
      const response = await createReview({
        productId,
        userId: user.userId,
        rating,
        comment: reviewText,
      });
      // alert("Review submitted successfully!");
      setReviewText("");
      setRating(null);
    } catch (error) {
      alert("Failed to submit review. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col lg:flex-row gap-6">
        <Image
          alt={product?.name}
          className="w-full lg:w-1/3 h-auto rounded-lg"
          src={product?.image}
        />
        <div className="flex flex-col flex-1">
          <h2 className="text-2xl font-bold">{product?.name}</h2>
          <p className="text-gray-600 mt-2">{product?.description}</p>
          <p className="text-green-600 font-bold text-lg mt-4">
            ${product.price}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Category: <span className="font-semibold">{product?.category}</span>
          </p>
          <Link
            className="text-blue-500 hover:underline mt-4"
            href={`/shop/${product?.shopId}`}>
            {/* Visit {product.shopName} */}
            Visite shop
          </Link>
        </div>
      </div>

      <h3 className="text-xl font-bold mt-8">Related Products</h3>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        {relatedProducts?.map((relatedProduct: any) => (
          <div
            key={relatedProduct.id}
            className="bg-white p-4 rounded-lg shadow-md">
            <Image
              alt={relatedProduct?.name}
              className="w-full h-40 object-cover rounded-lg mb-2"
              src={relatedProduct.image}
            />
            <h4 className="text-lg font-semibold">{relatedProduct?.name}</h4>
            <p className="text-green-600 font-bold">${relatedProduct?.price}</p>
            <Link
              className="text-blue-500 hover:underline text-sm"
              href={`/product/${relatedProduct?.id}`}>
              View Details
            </Link>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-bold mt-8">Customer Reviews</h3>
      <div className="mt-4">
        {product.reviews?.length > 0 ? (
          product.reviews.map((review: any) => (
            <div key={review.id} className="border-b border-gray-200 pb-4 mb-4">
              <p className="font-semibold">{review?.email}</p>
              <p className="text-sm text-gray-600">{review?.comment}</p>
              <p className="text-yellow-500">{"⭐".repeat(review?.rating)}</p>
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
    </div>
  );
};

export default ProductDetails;
