import { Spinner } from "@nextui-org/spinner";
import React from "react";

const Loading = () => {
  return (
    <div>
      <div className="flex justify-center bg-black-500/10 h-screen fixed inset-0 z-[999] backdrop-blur-md">
        <Spinner color="warning" label="Loading..." />
      </div>
    </div>
  );
};

export default Loading;
