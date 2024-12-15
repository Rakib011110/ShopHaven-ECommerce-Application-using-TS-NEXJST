import { ReactNode } from "react";

const Title = ({
  bigTitle,
  smallTitle,
}: {
  bigTitle: ReactNode;
  smallTitle: ReactNode;
}) => {
  return (
    <div className=" border-b-4 mb-10 border-spacing-1 mt-20 max-w-screen-sm  font-sans    border-t-4 mx-auto rounded-rr-full  border-[#16ff16]">
      <div className="bg-gradient-to-r w-96  underline-offset-6 mx-auto  textarea-bordered  border-[#060d3b]  border-4   border-from-[#060d3b] rounded-s-full rounded-r-full to-[#2c3a94]  p-1 rounded-lg text-center">
        <h1 className="text-2xl  font-bold  underline text-[#000000] mb-2">
          {bigTitle}
        </h1>
        <p className="text-xl font-medium text-blue-900">{smallTitle}</p>
      </div>
    </div>
  );
};

export default Title;
