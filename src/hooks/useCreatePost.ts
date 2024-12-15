import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  createPost,
  createPostComments,
  updateComment,
} from "../services/PostService/PostService";

export const useCreatePost = () => {
  return useMutation<any, Error, any>({
    mutationKey: ["CREATE_POST"],
    mutationFn: async (postData) => await createPost(postData),
    onSuccess: () => {
      toast.success("Post created successfully!");
    },
    onError: (error) => {
      toast.error(
        error.message || "An error occurred while creating the post.",
      );
    },
  });
};

export const useCreateComment = () => {
  return useMutation<any, Error, { content: string; postid: string }>({
    mutationKey: ["CREATE_COMMENT"],
    mutationFn: async ({ content, postid }) => {
      return await createPostComments(content, postid);
    },
    onSuccess: () => {
      toast.success("Comment created successfully!");
    },
    onError: (error) => {
      toast.error(
        error.message || "An error occurred while creating the comment.",
      );
    },
  });
};
export const useUpdateComment = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, { commentId: string; content: string }>({
    mutationKey: ["UPDATE_COMMENT"],
    mutationFn: async ({ commentId, content }) => {
      return await updateComment(commentId, { content });
    },
    onSuccess: () => {
      toast.success("Comment updated successfully!");
      // queryClient.invalidateQueries("comments");
    },
    onError: (error) => {
      toast.error(
        error.message || "An error occurred while updating the comment.",
      );
    },
  });
};
