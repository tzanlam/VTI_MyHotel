import { useParams, useNavigate } from "react-router-dom";
import { Card, Descriptions, Divider, Tag, Button } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingById } from "../../../redux/slice/BookingSlice";
import {
  HomeOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  CalendarOutlined,
  TagOutlined,
  FieldTimeOutlined,
  SmileOutlined,
  WarningOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import Title from "antd/es/typography/Title";

const BookingDetails = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const booking = useSelector((state) => state.booking.booking);

  useEffect(() => {
    dispatch(fetchBookingById(bookingId));
  }, [dispatch, bookingId]);

  const renderStatusTag = (status) => {
    switch (status) {
      case "PENDING":
        return <Tag icon={<FieldTimeOutlined />} color="warning">Đang chờ</Tag>;
      case "CONFIRMED":
        return <Tag icon={<SmileOutlined />} color="success">Đã xác nhận</Tag>;
      case "CANCELLED":
        return <Tag icon={<WarningOutlined />} color="error">Đã hủy</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  if (!booking) return <Card>Không tìm thấy thông tin đặt phòng.</Card>;

  return (
    <Card
      style={{
        maxWidth: 700,
        margin: "32px auto",
        backgroundColor: "#fffef2",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: 16,
        padding: 24,
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Title level={3} style={{ textAlign: "center", color: "#bfa300" }}>
        <HomeOutlined /> Chi tiết đặt phòng
      </Title>

      <Divider />

      <Descriptions bordered column={1}>
        <Descriptions.Item label={<><TagOutlined /> Tên khách hàng</>}>
          {booking.fullName}
        </Descriptions.Item>

        <Descriptions.Item label={<><HomeOutlined /> Tên phòng</>}>
          {booking.roomName}
        </Descriptions.Item>

        <Descriptions.Item label={<><ClockCircleOutlined /> Loại đặt phòng</>}>
          {booking.type === "HOURLY"
            ? "Theo giờ"
            : booking.type === "DAILY"
            ? "Theo ngày"
            : "Qua đêm"}
        </Descriptions.Item>

        <Descriptions.Item label={<><CalendarOutlined /> Ngày nhận phòng</>}>
          {booking.checkinDate} lúc {booking.checkinTime}
        </Descriptions.Item>

        <Descriptions.Item label={<><CalendarOutlined /> Ngày trả phòng</>}>
          {booking.checkoutDate} lúc {booking.checkoutTime}
        </Descriptions.Item>

        <Descriptions.Item label={<><ClockCircleOutlined /> Trạng thái</>}>
          {renderStatusTag(booking.status)}
        </Descriptions.Item>

        <Descriptions.Item label={<><DollarOutlined /> Giá</>}>
          <span style={{ fontWeight: "bold", color: "#cf1322" }}>
            {booking.price?.toLocaleString()} VND
          </span>
        </Descriptions.Item>
      </Descriptions>

      <Divider />

      <Button
        type="default"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate("/admin/bookings")}
      >
        Quay lại
      </Button>
    </Card>
  );
};

export default BookingDetails;
