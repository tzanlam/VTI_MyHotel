import React from "react";
import { Card, Form, Input, Button, Divider, message } from "antd";

const Settings = () => {
  const [form] = Form.useForm();

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Đã lưu cài đặt:", values);
        message.success("Đã cập nhật cài đặt thành công!");
      })
      .catch((err) => {
        console.log("Lỗi:", err);
      });
  };

  return (
    <Card title="⚙️ Cài đặt hệ thống" style={{ margin: 24, maxWidth: 600 }}>
      <Form layout="vertical" form={form}>
        <Form.Item
          label="Tên khách sạn"
          name="hotelName"
          rules={[{ required: true, message: "Vui lòng nhập tên khách sạn" }]}
        >
          <Input placeholder="VD: Khách Sạn Huy Phương" />
        </Form.Item>

        <Form.Item
          label="Email hệ thống"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email" },
            { type: "email", message: "Email không hợp lệ" },
          ]}
        >
          <Input placeholder="VD: admin@huyphuonghotel.com" />
        </Form.Item>

        <Divider />

        <Form.Item
          label="Tên người quản trị"
          name="adminName"
          rules={[{ required: true, message: "Vui lòng nhập tên người quản trị" }]}
        >
          <Input placeholder="VD: Nguyễn Văn A" />
        </Form.Item>

        <Form.Item
          label="Mật khẩu mới"
          name="newPassword"
          rules={[{ min: 6, message: "Mật khẩu ít nhất 6 ký tự" }]}
        >
          <Input.Password placeholder="Nhập mật khẩu mới nếu muốn đổi" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" onClick={handleSave}>
            Lưu thay đổi
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Settings;
