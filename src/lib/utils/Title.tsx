import { ReactNode } from "react";

const Title = ({
  bigTitle,
  smallTitle,
}: {
  bigTitle: ReactNode;
  smallTitle: ReactNode;
}) => {
  return (
    <div className=" border-b-4 rounded-full mb-10 border-spacing-1 mt-6 max-w-screen-sm  font-sans     mx-auto rounded-rr-full  border-[#16ffff]">
      <div className="w-96  underline-offset-6 mx-auto  textarea-bordered  border-[#102088] border-b-0  border-4   border-from-[#0421a3] rounded-s-full rounded-r-full to-[#2c3a94]  p-1 rounded-lg text-center">
        <h1 className="text-2xl  font-bold  underline  mb-2">{bigTitle}</h1>
        <p className="text-xl font-medium ">{smallTitle}</p>
      </div>
    </div>
  );
};

export default Title;
