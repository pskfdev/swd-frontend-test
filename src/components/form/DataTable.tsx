"use client";
import { useState } from "react";
//Components
import { Table, Button, Checkbox } from "antd";
//Store
import { useDispatch, useSelector } from "react-redux";
import type { ColumnsType } from "antd/es/table";
import { RootState } from "@/store/store";
import { deleteUser, deleteSelected, editUser } from "@/store/userSlice";
//Types
import { UserData } from "@/types/types";

function DataTable() {
  const users = useSelector((state: RootState) => state.user.users);
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const columns: ColumnsType<UserData> = [
    {
      title: "Name",
      dataIndex: "firstname",
      render: (_, record) => `${record.firstname} ${record.lastname}`,
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Mobile Phone",
      dataIndex: "phone",
    },
    {
      title: "Nationality",
      dataIndex: "nationality",
    },
    {
      title: "MANAGE",
      render: (_, record) => (
        <div className="flex space-x-4">
          <Button
            type="link"
            onClick={() => {
              const userToEdit = { ...record, editing: true };
              dispatch(editUser(userToEdit));
            }}
          >
            EDIT
          </Button>
          <Button
            type="link"
            danger
            onClick={() => dispatch(deleteUser(record.key))}
          >
            DELETE
          </Button>
        </div>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedKeys: React.Key[]) =>
      setSelectedRowKeys(newSelectedKeys),
  };

  return (
    <div>
      <div className="flex items-center my-10 space-x-4">
        <Checkbox
          checked={selectedRowKeys.length === users.length && users.length > 0}
          indeterminate={
            selectedRowKeys.length > 0 && selectedRowKeys.length < users.length
          }
          onChange={(e) =>
            setSelectedRowKeys(e.target.checked ? users.map((u) => u.key) : [])
          }
        >
          Select All
        </Checkbox>
        <Button
          danger
          onClick={() => dispatch(deleteSelected(selectedRowKeys as string[]))}
        >
          DELETE
        </Button>
      </div>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={users}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}

export default DataTable;
