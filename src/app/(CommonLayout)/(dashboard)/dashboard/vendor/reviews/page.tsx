"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";

import {
  useAddVendorReplyMutation,
  useGetAllCustomerReviewsQuery,
} from "@/src/redux/api/ReviewAPI";
import "react-toastify/dist/ReactToastify.css";

interface Review {
  id: string;
  comment: string;
  rating: number;
  vendorReply?: string;
  customer?: {
    name: string;
  };
}

const ManageReviews = () => {
  const {
    data: reviewsData,
    isLoading,
    isError,
  } = useGetAllCustomerReviewsQuery({}, { pollingInterval: 3000 });
  const [addVendorReply, { isLoading: isReplying }] =
    useAddVendorReplyMutation();

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const [vendorReply, setVendorReply] = useState("");

  if (isLoading) {
    return <div className="text-center">Loading reviews...</div>;
  }

  if (isError || !reviewsData?.data?.length) {
    return (
      <div className="text-center">
        No reviews found or failed to load reviews.
      </div>
    );
  }

  const openModal = (review: Review) => {
    if (review) {
      setSelectedReview(review);
      setVendorReply(review.vendorReply || "");
      setModalOpen(true);
    }
  };

  const handleReplySubmit = async () => {
    if (!selectedReview) {
      toast.error("No review selected.");

      return;
    }

    try {
      await addVendorReply({
        id: selectedReview?.id,
        reply: vendorReply,
      }).unwrap();
      toast.success("Reply updated successfully.");
      setModalOpen(false);
    } catch (error) {
      console.error("Failed to update reply:", error);
      toast.error("Failed to update reply.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Customer Reviews</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviewsData.data.map((review: any) => (
          <div
            key={review.id}
            className="border p-4 rounded-lg shadow-md bg-white">
            <p className="font-semibold text-gray-800">
              {review.customer?.name || "Anonymous"}
            </p>
            <p className="text-sm text-gray-500">{review.comment}</p>
            <p className="text-yellow-500">{"⭐".repeat(review.rating)}</p>

            {review.vendorReply ? (
              <p className="mt-2 text-green-600">
                <span className="font-bold">Vendor Reply:</span>{" "}
                {review.vendorReply}
              </p>
            ) : (
              <p className="mt-2 text-red-500">No reply yet.</p>
            )}

            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => openModal(review)}>
              {review.vendorReply ? "Edit Reply" : "Add Reply"}
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">
              {selectedReview?.vendorReply ? "Edit Reply" : "Add Reply"}
            </h3>
            <textarea
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your reply here..."
              rows={4}
              value={vendorReply}
              onChange={(e) => setVendorReply(e.target.value)}
            />
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400"
                onClick={() => setModalOpen(false)}>
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                disabled={isReplying}
                onClick={handleReplySubmit}>
                {isReplying ? "Updating..." : "Submit Reply"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageReviews;
