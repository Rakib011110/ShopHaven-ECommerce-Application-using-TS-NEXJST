import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IUser {
  userId: any;
  _id: string;
  name: string;
  role: string;
  email: string;
  status: string;
  mobileNumber?: string;
  profilePicture?: string;
  verified: boolean;
  followers: string[];
  following: string[];
  premiumUser: boolean; // New field to indicate premium status
  completePayment?: number;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface IInput {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "sm" | "md" | "lg";
  required?: boolean;
  type?: string;
  label?: string;
  placeholder: string;
  name: string;
  disabled?: boolean;
}

export interface Post {
  upvotes: number;
  downvotes: number;
  _id: string;
  title: string;
  isPremium: boolean;
  content: string;
  images: string[];
  category: string;
  author: {
    email: string;
    name: string;
    profilePicture: string;
    _id: string;
  };
  createdAt: string; // Add createdAt field for sorting
}
