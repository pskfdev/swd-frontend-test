"use client";
import React, { useEffect, useState } from "react";
//Components
import { Button, DatePicker, Form, Input, Radio, Select } from "antd";
//Store
import { useDispatch, useSelector } from "react-redux";
import { addUser, editUser } from "@/store/userSlice";
import { RootState } from "@/store/store";
//Type
import { UserData } from "@/types/types";

const { Option } = Select;

type Props = {};

function DataForm({}: Props) {
  const [form] = Form.useForm();
  const [gender, setGender] = useState("male");
  const [editUserData, setEditUserData] = useState<UserData | null>(null);

  const dispatch = useDispatch();
  const userToEdit = useSelector((state: RootState) =>
    state.user.users.find((u) => u.key)
  );

  useEffect(() => {
    if (userToEdit) {
      setEditUserData(userToEdit);
      form.setFieldsValue(userToEdit);
    }
  }, [userToEdit]);

  const onFinish = (values: any) => {
    const newUser: UserData = {
      key: editUserData?.key || crypto.randomUUID(),
      firstname: values.firstname,
      lastname: values.lastname,
      gender: values.gender,
      phone: `${values.mobileCode}${values.mobileNumber}`,
      nationality: values.nationality,
    };

    if (editUserData) {
      dispatch(editUser(newUser));
    } else {
      dispatch(addUser(newUser));
    }

    form.resetFields();
    setEditUserData(null);
  };

  return (
    <Form
      form={form}
      style={{ maxWidth: 900 }}
      /* layout="vertical" */
      onFinish={onFinish}
    >
      {/* Row 1 */}
      <div className="flex items-center justify-between gap-4">
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true }]}
          className="w-96"
        >
          <Select placeholder="Title">
            <Option value="mr">Mr.</Option>
            <Option value="ms">Ms.</Option>
            <Option value="mrs">Mrs.</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="firstname"
          label="Firstname"
          rules={[{ required: true }]}
          className="w-full"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="lastname"
          label="Lastname"
          rules={[{ required: true }]}
          className="w-full"
        >
          <Input />
        </Form.Item>
      </div>

      {/* Row 2 */}
      <div className="flex items-center justify-start gap-4">
        <Form.Item
          name="birthday"
          label="Birthday"
          rules={[{ required: true }]}
          className="w-96"
        >
          <DatePicker className="w-full" />
        </Form.Item>

        <Form.Item
          name="nationality"
          label="Nationality"
          rules={[{ required: true }]}
          className="w-full"
        >
          <Select placeholder="-- Please Select --">
            <Option value="thai">Thai</Option>
            <Option value="american">American</Option>
            <Option value="japanese">Japanese</Option>
          </Select>
        </Form.Item>
      </div>

      {/* Row 3 */}
      <Form.Item
        name="citizenID"
        label="Citizen ID"
        rules={[{ required: true }]}
      >
        <div className="grid grid-cols-5 gap-2">
          {[...Array(5)].map((_, idx) => (
            <Form.Item
              key={idx}
              name={["citizenId", idx]}
              rules={[{ required: true }]}
              noStyle
            >
              <Input maxLength={idx === 4 ? 2 : 4} />
            </Form.Item>
          ))}
        </div>
      </Form.Item>

      {/* Row 4 */}
      <Form.Item label="Gender" name="gender" rules={[{ required: true }]}>
        <Radio.Group onChange={(e) => setGender(e.target.value)} value={gender}>
          <Radio value="male">Male</Radio>
          <Radio value="female">Female</Radio>
          <Radio value="unsex">Unsex</Radio>
        </Radio.Group>
      </Form.Item>

      {/* Row 5 */}
      <div className="flex items-center gap-4">
        <Form.Item
          name="mobileCode"
          label="Mobile Phone"
          rules={[{ required: true }]}
          className="w-96"
        >
          <Select placeholder="+66">
            <Option value="+66">+66</Option>
            <Option value="+1">+1</Option>
          </Select>
        </Form.Item>

        <span className="text-center mb-7">-</span>

        <Form.Item
          name="mobileNumber"
          rules={[{ required: true }]}
          className="w-full"
        >
          <Input />
        </Form.Item>
      </div>

      {/* Row 6 */}
      <Form.Item
        name="passport"
        label="Passport No"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      {/* Row 7 */}
      <div className="flex justify-between items-center gap-4">
        <Form.Item
          name="salary"
          label="Expected Salary"
          rules={[{ required: true }]}
          className="w-full"
        >
          <Input />
        </Form.Item>

        {/* Buttons */}
        <div className="flex justify-center items-start h-full w-full space-x-5">
          <Button htmlType="reset" onClick={() => form.resetFields()}>
            RESET
          </Button>
          <Button type="primary" htmlType="submit">
            {editUserData ? "UPDATE" : "SUBMIT"}
          </Button>
        </div>
      </div>
    </Form>
  );
}

export default DataForm;
