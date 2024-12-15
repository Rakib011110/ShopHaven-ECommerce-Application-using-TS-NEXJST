import { ReactNode } from "react";

// Define the props interface
interface LayoutProps {
  children: ReactNode;
  newsfeed: ReactNode; // Add newsfeed property
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-screen ">
      <main className=" ">{children}</main>
    </div>
  );
};

export default Layout;
