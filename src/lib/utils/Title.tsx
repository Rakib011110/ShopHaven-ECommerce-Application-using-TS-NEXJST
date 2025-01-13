import { ReactNode } from "react";

const Title = ({
  bigTitle,
  smallTitle,
}: {
  bigTitle: ReactNode;
  smallTitle: ReactNode;
}) => {
  return (
    <div className="  rounded-full mb-6 border-spacing-1 mt-6 max-w-screen-sm  font-sans     mx-auto rounded-rr-full  ">
      <div className="max-w-sm  underline-offset-6 mx-auto  textarea-bordered  border-[#102088] border-b-0  border-4   border-from-[#0421a3] rounded-s-full rounded-r-full to-[#2c3a94]  p-1 rounded-lg text-center">
        <h1 className="text-xl  font-bold    ">{bigTitle}</h1>
        <div className="mt-1 h-0.5 w-20 mx-auto bg-gradient-to-r from-blue-500 to-green-500 rounded-full" />
        <p className="text-lg font-medium ">{smallTitle}</p>
      </div>
    </div>
  );
};

export default Title;
