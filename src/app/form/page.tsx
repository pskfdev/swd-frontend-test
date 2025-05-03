"use client";
import React from "react";
import Link from "next/link";
//Components
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import DataForm from "@/components/form/DataForm";
import DataTable from "@/components/form/DataTable";

function Page() {
  return (
    <div className="mx-5">
      <div className="py-5 flex items-center space-x-4">
        <Link href="/" passHref>
          <Button type="default" shape="circle" icon={<ArrowLeftOutlined />} />
        </Link>
        <h1 className="py-5 text-4xl">Form & Table</h1>
      </div>

      {/* Form */}
      <div className="border w-fit rounded-md p-5 mx-auto">
        <DataForm />
      </div>

      {/* Table */}
      <div>
        <DataTable />
      </div>
    </div>
  );
}

export default Page;
