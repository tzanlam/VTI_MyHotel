import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  Button,
  Modal,
  Form,
  Space,
  Popconfirm,
  message,
  Card,
  Select,
} from "antd";

const initialStaffs = [
  {
    id: 1,
    name: "Lê Văn Hùng",
    email: "hung@hotel.com",
    phone: "0909123456",
    position: "Lễ tân",
  },
  {
    id: 2,
    name: "Phạm Thị Hoa",
    email: "hoa@hotel.com",
    phone: "0909781234",
    position: "Quản lý phòng",
  },
];

const StaffManager = () => {
  const [staffs, setStaffs] = useState(initialStaffs);
  const [filtered, setFiltered] = useState(initialStaffs);
  const [search, setSearch] = useState("");
  const [form] = Form.useForm();
  const [editingStaff, setEditingStaff] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    if (!search) {
      setFiltered(staffs);
    } else {
      setFiltered(
        staffs.filter(
          (s) =>
            s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.email.toLowerCase().includes(search.toLowerCase()) ||
            s.position.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, staffs]);

  const handleDelete = (id) => {
    setStaffs((prev) => prev.filter((s) => s.id !== id));
    message.success("Đã xoá nhân viên.");
  };

  const showEditModal = (record) => {
    setEditingStaff(record);
    form.setFieldsValue(record);
  };

  const handleEdit = () => {
    form
      .validateFields()
      .then((values) => {
        setStaffs((prev) =>
          prev.map((s) =>
            s.id === editingStaff.id ? { ...s, ...values } : s
          )
        );
        setEditingStaff(null);
        message.success("Cập nhật thông tin thành công.");
      });
  };

  const handleAdd = () => {
    form
      .validateFields()
      .then((values) => {
        const newStaff = { id: Date.now(), ...values };
        setStaffs((prev) => [...prev, newStaff]);
        setIsAddModalOpen(false);
        form.resetFields();
        message.success("Thêm nhân viên thành công.");
      });
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Họ tên", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "SĐT", dataIndex: "phone", key: "phone" },
    { title: "Chức vụ", dataIndex: "position", key: "position" },
    {
      title: "Thao tác",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button onClick={() => showEditModal(record)}>Sửa</Button>
          <Popconfirm
            title="Xác nhận xoá nhân viên này?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger>Xoá</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card title="👔 Quản Lý Nhân Viên" style={{ margin: 24 }}>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Tìm theo tên, email, chức vụ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          allowClear
          style={{ width: 300 }}
        />
        <Button type="primary" onClick={() => setIsAddModalOpen(true)}>
          + Thêm nhân viên
        </Button>
      </Space>

      <Table
        columns={columns}
        dataSource={filtered}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title={editingStaff ? "Cập nhật nhân viên" : "Thêm nhân viên"}
        open={editingStaff || isAddModalOpen}
        onCancel={() => {
          setEditingStaff(null);
          setIsAddModalOpen(false);
          form.resetFields();
        }}
        onOk={editingStaff ? handleEdit : handleAdd}
        okText="Lưu"
        cancelText="Huỷ"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Họ tên"
            rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="SĐT"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="position"
            label="Chức vụ"
            rules={[{ required: true, message: "Vui lòng chọn chức vụ!" }]}
          >
            <Select
              options={[
                { label: "Lễ tân", value: "Lễ tân" },
                { label: "Quản lý phòng", value: "Quản lý phòng" },
                { label: "Phục vụ", value: "Phục vụ" },
                { label: "Bảo vệ", value: "Bảo vệ" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default StaffManager;
