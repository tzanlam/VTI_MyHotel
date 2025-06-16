// Admin danh sách tài khoản (Guest)
import { useEffect, useState } from "react";
import { Table, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAccounts } from "../../redux/slice/AccountSlice";

const Guests = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    dispatch(fetchAccounts()).unwrap().then(setFiltered);
  }, [dispatch]);

  const columns = [
    { title: <b>Mã Người Dùng</b>, dataIndex: "id", key: "id" },
    { title: <b>Họ tên</b>, dataIndex: "fullName", key: "fullName" },
    { title: <b>Email</b>, dataIndex: "email", key: "email" },
    { title: <b>Điện thoại</b>, dataIndex: "phone", key: "phone" },
  ];

  return (
    <Card title="👤 Danh sách người dùng" style={{ margin: 24, borderRadius: 16 }}>
      <Table
        columns={columns}
        dataSource={filtered}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        onRow={(record) => ({
          onClick: () => navigate(`/admin/guests/${record.id}`),
          style: { cursor: "pointer" },
        })}
      />
    </Card>
  );
};

export default Guests;
