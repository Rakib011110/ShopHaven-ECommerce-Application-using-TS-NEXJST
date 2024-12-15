import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-screen ">
      <main className=" ">{children}</main>
    </div>
  );
};

export default Layout;
