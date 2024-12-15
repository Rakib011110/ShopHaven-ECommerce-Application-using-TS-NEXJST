import { ReactNode } from "react";

const Button = ({
  children1,
  children2,
}: {
  children1: ReactNode;
  children2: ReactNode;
}) => {
  return (
    <div>
      <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md border-2 dark:border-[#656fe2] border-[#394481] font-medium">
        <div className="inline-flex h-12 translate-x-0 items-center justify-center bg-gradient-to-r dark:from-[#070e41] dark:to-[#263381] from-[#f5f6f8] to-[#fafbff]  px-6 dark:text-white text-[#394481] transition group-hover:-translate-x-[150%]">
          {children1}
        </div>
        <div className="absolute inline-flex h-12 w-full translate-x-[100%] items-center justify-center bg-[#25e913] dark:bg-[#24f124] px-6 text-white transition duration-300 group-hover:translate-x-0">
          {children2}
        </div>
      </button>
    </div>
  );
};

export default Button;
