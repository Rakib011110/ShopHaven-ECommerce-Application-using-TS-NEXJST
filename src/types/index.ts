import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
export interface IUser {
  id: string;
  email: string;
  role: string;
  userId: string;
  status: string;
  needPasswordChange: boolean;
  associatedData: {
    admin: any;
    vendor: any;
    customer: any;
  };
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
