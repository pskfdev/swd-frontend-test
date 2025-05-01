import Link from "next/link";
import React from "react";

type Props = {
    title: string;
    detail: string;
    href: string;
    styles?: string;
};

function CardTest({ title, detail, href, styles = "cursor-pointer" }: Props) {
  return (
    <Link href={href} className={`w-80 bg-white rounded-md ${styles}`}>
      <p className="p-5">{title}</p>
      <hr className="text-slate-100" />
      <p className="p-5 text-slate-500">{detail}</p>
    </Link>
  );
}

export default CardTest;
