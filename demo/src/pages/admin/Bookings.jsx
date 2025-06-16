import { useEffect, useState } from "react";
import { Table, DatePicker, Card, Row, Col, Select, Tag, Button } from "antd";
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBookings,
  fetchBookingByDate,
  putStatusBooking,
} from "../../redux/slice/BookingSlice";

const { RangePicker } = DatePicker;

const STATUS_TAGS = {
  PENDING: { color: "gold", icon: <ClockCircleOutlined />, label: "Đang chờ" },
  SUBMITTED: { color: "green", icon: <CheckCircleOutlined />, label: "Đã xác nhận" },
  FAILED: { color: "red", icon: <CloseCircleOutlined />, label: "Đã hủy" },
};

const Bookings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookings = useSelector((state) => state.booking.bookings);

  const [dateRange, setDateRange] = useState([]);
  const [isFilterActive, setIsFilterActive] = useState(false);

  useEffect(() => {
    dispatch(fetchBookings()).unwrap();
  }, [dispatch]);

  const handleSearch = () => {
  if (dateRange && dateRange.length === 2 && dateRange[0] && dateRange[1]) {
    const startDate = dayjs(dateRange[0]).format("DD/MM/YYYY");
    const endDate = dayjs(dateRange[1]).format("DD/MM/YYYY");
    dispatch(fetchBookingByDate({ startDate, endDate }));
    setIsFilterActive(true);
  }
};


  const handleStatusChange = (bookingId, statusBooking) => {
  dispatch(putStatusBooking({ bookingId, statusBooking }))
    .unwrap()
    .then(() => {
      if (isFilterActive && dateRange.length === 2 && dateRange[0] && dateRange[1]) {
        const startDate = dayjs(dateRange[0]).format("DD/MM/YYYY");
        const endDate = dayjs(dateRange[1]).format("DD/MM/YYYY");
        dispatch(fetchBookingByDate({ startDate, endDate }));
      } else {
        dispatch(fetchBookings());
      }
    });
};


  const columns = [
    { title: <b>Mã Đặt Phòng</b>, dataIndex: "id", key: "id" },
    { title: <b>Tên Khách</b>, dataIndex: "fullName", key: "fullName" },
    { title: <b>SĐT</b>, dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: <b>Phòng</b>, dataIndex: "roomName", key: "roomName" },
    { title: <b>Ngày Đến</b>, dataIndex: "checkinDate", key: "checkinDate" },
    { title: <b>Ngày Đi</b>, dataIndex: "checkoutDate", key: "checkoutDate" },
    {
      title: <b>Trạng thái</b>,
      key: "status",
      render: (_, record) => (
        <Select
          value={record.status}
          style={{
            width: 160,
            fontWeight: "bold",
            borderRadius: 8,
            backgroundColor: "#fffef2",
          }}
          onClick={(e) => e.stopPropagation()}
          onChange={(value) => handleStatusChange(record.id, value)}
        >
          {Object.entries(STATUS_TAGS).map(([value, { label, icon, color }]) => (
            <Select.Option key={value} value={value}>
              <Tag icon={icon} color={color} style={{ fontWeight: 500 }}>
                {label}
              </Tag>
            </Select.Option>
          ))}
        </Select>
      ),
    },
  ];

  const dataSource = bookings;

  return (
    <Card
      title="📋 Quản Lý Đặt Phòng"
      style={{
        margin: 24,
        borderRadius: 16,
        background: "#fffef2",
        boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Row gutter={16} justify="center" style={{ marginBottom: 20 }}>
        <Col span={12}>
          <RangePicker
            format="DD/MM/YYYY"
            value={dateRange}
            onChange={(dates) => setDateRange(dates || [])}
            style={{
              width: "100%",
              padding: 12,
              fontWeight: 600,
              fontFamily: "'Poppins', sans-serif",
              backgroundColor: "#fffbe6",
              border: "2px solid #d4b106",
              borderRadius: 10,
            }}
          />
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={handleSearch}
            style={{ marginRight: 8 }}
            disabled={dateRange.length !== 2}
          >
            Tìm kiếm
          </Button>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        onRow={(record) => ({
          onClick: () => navigate(`/admin/bookings/${record.id}`),
          style: {
            cursor: "pointer",
            fontSize: "15px",
            fontWeight: 500,
            transition: "background 0.3s",
          },
          onMouseEnter: (e) => (e.currentTarget.style.background = "#fff6cc"),
          onMouseLeave: (e) => (e.currentTarget.style.background = "transparent"),
        })}
      />
    </Card>
  );
};

export default Bookings;
