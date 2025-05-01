"use client";
import React, { useState } from "react";
//Components
import DetailControl from "@/components/card/DetailControl";
import GeometricShapes from "@/components/card/GeometricShapes";
//Type
import { ItemCard } from "@/types/types";
import Image from "next/image";

const itemCard = [
  {
    id: 0,
    src: "/trapezium.png",
    title: "trapezium",
  },
  {
    id: 1,
    src: "/parallelogram.png",
    title: "parallelogram",
  },
  {
    id: 2,
    src: "/rectangle.png",
    title: "rectangle",
  },
  {
    id: 3,
    src: "/ellipse.png",
    title: "ellipse",
  },
  {
    id: 4,
    src: "/square.png",
    title: "square",
  },
  {
    id: 5,
    src: "/circle.png",
    title: "circle",
  },
];

function Page() {
  const [data, setData] = useState<ItemCard[]>(itemCard);
  const [upDown, setUpDown] = useState<boolean>(false);

  const rotateLeft = () => {
    if (data.length > 0) {
      // ดึงข้อมูลตัวแรกออก และต่อมันไว้ข้างหลัง
      const newData = [...data.slice(1), data[0]];
      setData(newData);
    }
  };

  const rotateRight = () => {
    if (data.length > 0) {
      const newData = [
        data[data.length - 1],
        ...data.slice(0, data.length - 1),
      ];
      setData(newData);
    }
  };

  const shuffleData = () => {
    const shuffled = [...data];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setData(shuffled);
  };

  return (
    <div className="mx-5">
      <h1 className="py-5 text-4xl">Layout & Style</h1>

      {/* Control */}
      <div className="w-fit mx-auto">
        <div className="flex justify-center items-center my-5 space-x-2">
          {/* Left */}
          <div className="relative" onClick={rotateLeft}>
            <GeometricShapes
              src="/triangle.png"
              title="geometric1"
              rotate="-rotate-90"
            />
            <DetailControl title="Move shape" />
          </div>
          {/* Up - Down */}
          <div
            className="relative flex bg-white rounded-md"
            onClick={() => setUpDown(!upDown)}
          >
            <GeometricShapes
              src="/triangle.png"
              title="geometric1"
              rotate="rotate-0"
            />
            <GeometricShapes
              src="/triangle.png"
              title="geometric1"
              rotate="rotate-180"
            />
            <DetailControl title="Move position" />
          </div>
          {/* Right */}
          <div className="relative" onClick={rotateRight}>
            <GeometricShapes
              src="/triangle.png"
              title="geometric1"
              rotate="rotate-90"
            />
            <DetailControl title="Move shape" />
          </div>
        </div>

        <hr className="my-10 text-slate-400" />

        {/* Item */}
        <div
          className={`flex ${upDown ? "flex-col-reverse" : "flex-col"} gap-4`}
        >
          {/* Row 1 */}
          <div className="grid grid-cols-4 gap-4">
            {data.slice(0, 3).map((item, index) => (
              <div
                key={index}
                className={`w-full h-52 bg-white rounded-md cursor-pointer flex items-center ${
                  index === 0 ? "col-start-2" : ""
                }`}
                onClick={shuffleData}
              >
                <Image
                  src={item.src}
                  width={150}
                  height={200}
                  alt={item.title}
                  className="mx-auto"
                />
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="w-fit grid grid-cols-3 gap-4 mx-auto">
            {data.slice(3).map((item, index) => (
              <div
                key={index}
                className={`w-80 h-52 bg-white rounded-md cursor-pointer flex items-center`}
                onClick={shuffleData}
              >
                <Image
                  src={item.src}
                  width={150}
                  height={200}
                  alt={item.title}
                  className="mx-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
