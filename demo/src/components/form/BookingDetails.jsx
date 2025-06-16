import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Descriptions,
  Typography,
  Spin,
  Tag,
  Divider,
} from "antd";
import {
  HomeOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  CalendarOutlined,
  TagOutlined,
  FieldTimeOutlined,
  SmileOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { fetchBookingById } from "../../redux/slice/BookingSlice";

const { Title } = Typography;

const BookingDetailss = () => {
  const dispatch = useDispatch();
  const { bookingId } = useParams();

  const booking = useSelector((state) => state.booking.booking);

  useEffect(() => {
    dispatch(fetchBookingById(bookingId)).unwrap();
  }, [bookingId, dispatch]);

  if (!booking) {
    return (
      <div style={{ textAlign: "center", padding: 50 }}>
        <Spin size="large" />
      </div>
    );
  }

  const renderStatusTag = (status) => {
    switch (status) {
      case "PENDING":
        return <Tag icon={<FieldTimeOutlined />} color="warning">Đang chờ</Tag>;
      case "CONFIRMED":
        return <Tag icon={<SmileOutlined />} color="success">Đã xác nhận</Tag>;
      case "CANCELLED":
        return <Tag icon={<WarningOutlined />} color="error">Đã hủy</Tag>;
      default:
        return <Tag color="default">{status}</Tag>;
    }
  };

  return (
    <Card
      style={{
        maxWidth: 700,
        margin: "auto",
        marginTop: 32,
        backgroundColor: "#fffef2",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: 16,
        padding: 24,
      }}
    >
      <Title level={3} style={{ textAlign: "center", color: "#bfa300", marginBottom: 8 }}>
        <HomeOutlined /> Chi tiết đặt phòng
      </Title>
      <Divider style={{ borderColor: "#faeb91" }} />

      <Descriptions
        bordered
        column={1}
        styles={{
          backgroundColor: "#fffbe6",
          fontWeight: 500,
          fontSize: "16px",
        }}
        contentStyle={{
          backgroundColor: "#fffef9",
          fontSize: "16px",
        }}
      >
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
    </Card>
  );
};

export default BookingDetailss;
