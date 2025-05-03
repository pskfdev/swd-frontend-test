"use client";
import React, { useEffect } from "react";
import dayjs from "dayjs";
// Components
import { Button, DatePicker, Form, Input, Radio, Select } from "antd";
// Store
import { useDispatch, useSelector } from "react-redux";
import { addUser, clearEditingUser, editUser } from "@/store/userSlice";
import { RootState } from "@/store/store";
// Type
import { UserData } from "@/types/types";

const { Option } = Select;

function DataForm() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const userToEdit = useSelector((state: RootState) =>
    state.user.users.find((u) => u.editing)
  );

  // ล้างฟอร์มเมื่อเปิดหน้าครั้งแรกหรือไม่มี user ที่ต้องแก้ไข
  useEffect(() => {
    if (!userToEdit) {
      form.resetFields();
      dispatch(clearEditingUser());
    }
  }, []);

  // หากมีข้อมูลแก้ไข ให้แสดงในฟอร์ม
  useEffect(() => {
    if (userToEdit) {
      const { citizenId, phone, birthday, ...rest } = userToEdit;

      const [mobileCode, mobileNumber] = phone
        ? [phone.slice(0, 3), phone.slice(3)]
        : ["+66", ""];

      const transformed = {
        ...rest,
        mobileCode,
        mobileNumber,
        citizenId: citizenId || ["", "", "", "", ""],
        birthday: birthday ? dayjs(birthday) : null,
      };

      form.setFieldsValue(transformed);
    }
  }, [userToEdit, form]);

  // Submit Form
  const onFinish = (values: any) => {
    const newUser: UserData = {
      key: userToEdit?.key || crypto.randomUUID(),
      title: values.title,
      firstname: values.firstname,
      lastname: values.lastname,
      birthday: values.birthday.format("YYYY-MM-DD"), //แปลงเป็น string
      nationality: values.nationality,
      citizenId: values.citizenId,
      gender: values.gender,
      mobileCode: values.mobileCode,
      mobileNumber: values.mobileNumber,
      passport: values.passport,
      salary: values.salary,
      phone: `${values.mobileCode}${values.mobileNumber}`,
    };

    if (userToEdit) {
      dispatch(editUser(newUser));
      dispatch(clearEditingUser());
    } else {
      dispatch(addUser(newUser));
    }

    form.resetFields();
  };

  return (
    <Form form={form} style={{ maxWidth: 900 }} onFinish={onFinish}>
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
        <Radio.Group>
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
          <Button
            htmlType="reset"
            onClick={() => {
              form.resetFields();
              dispatch(clearEditingUser());
            }}
          >
            RESET
          </Button>
          <Button type="primary" htmlType="submit">
            {userToEdit ? "UPDATE" : "SUBMIT"}
          </Button>
        </div>
      </div>
    </Form>
  );
}

export default DataForm;
