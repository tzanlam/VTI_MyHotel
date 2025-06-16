import { useEffect, useState } from "react";
import { Table, Card, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchVouchers } from './../../redux/slice/VoucherSlice';

const STATUS_COLORS = {
  OPENED: "green",
  CLOSED: "volcano",
};

const Vouchers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const vouchers = useSelector((state) => state.voucher.vouchers);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    dispatch(fetchVouchers()).unwrap().then(setFiltered);
  }, [dispatch]);

  const columns = [
    { title: "Mã", dataIndex: "id", key: "id" },
    { title: "Tên Voucher", dataIndex: "name", key: "name" },
    { title: "Giảm giá (%)", dataIndex: "amount", key: "amount" },
    { title: "Điểm yêu cầu", dataIndex: "point", key: "point" },
    {
      title: "Hạn sử dụng",
      dataIndex: "expiryDateTime",
      key: "expiryDateTime",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Trạng thái",
      key: "status",
      render: (_, record) => (
        <Tag color={STATUS_COLORS[record.status] || "default"}>
          {record.status}
        </Tag>
      ),
    },
  ];

  return (
    <Card
      title="🎟️ Danh sách voucher"
      style={{
        margin: 24,
        borderRadius: 16,
        backgroundColor: "#fffef2",
        boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
      }}
    >
      <Table
        columns={columns}
        dataSource={filtered}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        onRow={(record) => ({
          onClick: () => navigate(`/admin/vouchers/${record.id}`),
          style: { cursor: "pointer" },
        })}
      />
    </Card>
  );
};

export default Vouchers;
