import Image from "next/image";
import React from "react";

type Props = {
    src: string;
    title: string;
    rotate: string;
};

function GeometricShapes({ src, title, rotate }: Props) {
  return (
    <div className="w-80 h-52 bg-white rounded-md cursor-pointer flex items-center hover:bg-orange-400">
      <Image
        src={src}
        width={150}
        height={200}
        alt={title}
        className={`mx-auto ${rotate}`}
      />
    </div>
  );
}

export default GeometricShapes;
