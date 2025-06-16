import { Card, Row, Col, Button, Typography } from "antd";
import {
  WifiOutlined,
  HomeOutlined,
  CarOutlined,
  ClockCircleOutlined,
  ToolOutlined,
  RestOutlined,
  AppstoreAddOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import baotanglichsutphcm1 from "../../assets/default/baotanglichsutphcm1.jpg"
import damsen from "../../assets/default/damsen.jpg"
import diadaocuchi from "../../assets/default/diadaocuchi.jpg"

const { Title, Paragraph } = Typography;
const HomeGuest = () => {
  const navigate = useNavigate()
  const handleSearchClick = () => {
    navigate("/rooms")
  }
  const amenities = [
    { icon: <WifiOutlined style={{ fontSize: 36 }} />, label: "WiFi miễn phí" },
    {
      icon: <HomeOutlined style={{ fontSize: 36 }} />,
      label: "Phòng gia đình",
    },
    {
      icon: <CarOutlined style={{ fontSize: 36 }} />,
      label: "Bãi đậu xe miễn phí",
    },
    {
      icon: <ClockCircleOutlined style={{ fontSize: 36 }} />,
      label: "Lễ tân 24 giờ",
    },
    {
      icon: <ToolOutlined style={{ fontSize: 36 }} />,
      label: "Điều hòa không khí",
    },
    { icon: <RestOutlined style={{ fontSize: 36 }} />, label: "Dịch vụ phòng" },
    {
      icon: <AppstoreAddOutlined style={{ fontSize: 36 }} />,
      label: "Thang máy",
    },
    { icon: <StarOutlined style={{ fontSize: 36 }} />, label: "Giặt ủi" },
  ];

  const attractions = [
    {
      img: baotanglichsutphcm1,
      title: "Bảo tàng lịch sử TP.HCM",
      type: "Lịch sử và văn hoá",
      desc: "Để hiểu được lịch sử và văn hoá của một vùng đất, Bảo tàng Lịch sử là nơi đáng để khám phá.",
    },
    {
      img: diadaocuchi,
      title: "Địa đạo Củ Chi",
      type: "Di tích lịch sử",
      desc: "Địa đạo Củ Chi là một kỳ tích về ý chí và tinh thần anh hùng dân tộc trong kháng chiến.",
    },
    {
      img: damsen,
      title: "Công viên văn hoá Đầm Sen",
      type: "Giải trí",
      desc: "Công viên Đầm Sen là điểm đến vui chơi, thư giãn với nhiều hoạt động thú vị cho cả gia đình.",
    },
  ];

  return (
    <div className="p-6 min-h-screen bg-[#fffbe6] flex flex-col items-center">
      {/* Giới thiệu */}
      <div className="text-center mb-8">
        <Title level={2} style={{ color: "#bfa300" }}>
          Chào mừng đến với Huy Phương Hotel
        </Title>
        <Paragraph className="max-w-2xl mx-auto text-gray-600">
          Tận hưởng kỳ nghỉ tuyệt vời với không gian sang trọng, tiện nghi hiện
          đại và dịch vụ tận tâm.
        </Paragraph>
      </div>

      <div className="p-6 min-h-screen bg-[#fffef5]">
        {/* GIỚI THIỆU */}
        <div className="text-center mb-12">
          <Title
            level={3}
            style={{
              color: "#bfa300",
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Tọa lạc tại ngoại ô thành phố
          </Title>
          <Title level={1} style={{ color: "#1d3557", fontWeight: 700 }}>
            Khách sạn đầy đủ tiện nghi, thoải mái tại TP.Hồ Chí Minh
          </Title>
          <Paragraph className="max-w-3xl mx-auto text-gray-600 text-lg">
            Tọa lạc ở TP. Hồ Chí Minh, khách sạn Huy Phương cung cấp chỗ nghỉ
            tiện nghi, chỗ đậu xe riêng miễn phí, Wi-Fi miễn phí, lễ tân 24/7,
            dịch vụ phòng và nhiều tiện ích khác.
          </Paragraph>
<Button
  style={{
    backgroundColor: "#ffffff", // Trạng thái ban đầu màu trắng
    color: "#000",
    border: "none",
    borderRadius: 10,
    padding: "0 20px",
    fontWeight: "bold",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
    transition: "background-color 0.3s ease-in-out",
  }}
  onClick={handleSearchClick}
  onMouseEnter={(e) =>
    (e.currentTarget.style.backgroundColor = "#e0e0e0") // Hover màu xám nhẹ
  }
  onMouseLeave={(e) =>
    (e.currentTarget.style.backgroundColor = "#ffffff") // Trở lại màu trắng
  }
  onMouseDown={(e) =>
    (e.currentTarget.style.backgroundColor = "#d6d6d6") // Khi click giữ màu xám nhạt hơn
  }
  onMouseUp={(e) =>
    (e.currentTarget.style.backgroundColor = "#e0e0e0") // Khi nhả chuột, trở về màu xám nhẹ
  }
>
  Tìm kiếm phòng
</Button>


        </div>

        {/* TIỆN NGHI */}
        <div className="mb-20">
          <Row gutter={[24, 24]} justify="center">
            {amenities.map((item, index) => (
              <Col xs={12} sm={8} md={6} key={index} className="text-center">
                <div className="text-[#bfa300] mb-2">{item.icon}</div>
                <div className="font-semibold text-black">
                  {item.label.toUpperCase()}
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* KHÁM PHÁ THÀNH PHỐ */}
        <div className="text-center mb-12">
          <Title
            level={4}
            style={{
              color: "#bfa300",
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Các địa điểm và tour du lịch trong thành phố
          </Title>
          <Title level={2} style={{ color: "#1d3557", fontWeight: 700 }}>
            Khám phá thành phố
          </Title>
          <Paragraph className="max-w-2xl mx-auto text-gray-600 text-base">
            Immerse yourself in local art exhibitions, events, and famous
            landmarks across Hồ Chí Minh City.
          </Paragraph>
        </div>

        <Row gutter={[24, 24]} justify="center">
          {attractions.map((place, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <Card
                hoverable
                cover={
                  <img
                    alt={place.title}
                    src={place.img}
                    style={{ height: 200, objectFit: "cover" }}
                  />
                }
                className="rounded-xl shadow-md"
              >
                <div className="text-sm font-medium text-[#bfa300] uppercase">
                  {place.type}
                </div>
                <div className="text-lg font-bold text-[#1d3557] mb-2">
                  {place.title}
                </div>
                <Paragraph className="text-gray-600">{place.desc}</Paragraph>
                <Button type="link" className="p-0 text-[#bfa300] font-medium">
                  Xem chi tiết
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default HomeGuest;
