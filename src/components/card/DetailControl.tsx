import React from "react";

type Props = {
  title: string;
};

function DetailControl({ title }: Props) {
  return (
    <p className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-green-400 w-fit px-2 py-1 rounded-full text-white text-sm">
      {title}
    </p>
  );
}

export default DetailControl;
