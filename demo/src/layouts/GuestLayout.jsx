import { useState } from "react";
import {
  Layout,
  Menu,
  Avatar,
  Dropdown,
  Button,
  Row,
  Col,
} from "antd";
import {
  FacebookFilled,
  InstagramFilled,
  YoutubeFilled,
  LinkedinFilled,
  TwitterOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthModal from "../components/form/AuthModal";
import { logout } from "../redux/slice/AuthSlice";
import "../assets/css/GuestLayout.css";

const { Header, Content, Footer } = Layout;

const GuestLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const isAuthentication = useSelector((state) => state.auth.isAuthentication);
  const fullName = useSelector((state) => state.auth.fullName);
  const avatar = useSelector((state) => state.auth.avatar);
  const accountId = useSelector((state) => state.auth.accountId);

  const [modalOpen, setModalOpen] = useState(false);

  const handleLogout = () => dispatch(logout());
  const handleLoginClick = () => setModalOpen(true);

  const navItems = [
    { label: "Trang chủ", key: "/" },
    { label: "Phòng", key: "/rooms" },
    { label: "Đặt phòng", key: "/booking" },
    { label: "Liên hệ", key: "/contact" },
  ];

  const userMenuItems = [
    {
      key: "profile",
      label: (
        <span onClick={() => navigate(`/profile/${accountId}`)}>
          Thông tin cá nhân
        </span>
      ),
    },
    {
      key: "logout",
      label: <span onClick={handleLogout}>Đăng xuất</span>,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh", background: "#fffef5" }}>
      {/* HEADER */}
      <Header
        style={{
          background: "#ffe8b3",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingInline: 24,
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            fontSize: 20,
            color: "#d48806",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          🦁 HOTEL
        </div>

        <Menu
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={navItems}
          theme="light"
          style={{
            flex: 1,
            justifyContent: "center",
            background: "#ffe8b3",
            borderBottom: "none",
            fontWeight: 500,
          }}
          onClick={({ key }) => {
            navigate(key); // ✅ Không chặn booking nữa
          }}
        />

        {isAuthentication ? (
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <div
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Avatar src={avatar || undefined}>
                {fullName?.charAt(0).toUpperCase()}
              </Avatar>
              <span style={{ color: "#d48806", fontWeight: "bold" }}>
                {fullName}
              </span>
            </div>
          </Dropdown>
        ) : (
          <Button
            style={{
              backgroundColor: "#fadb14",
              color: "#000",
              border: "none",
              borderRadius: 10,
              padding: "0 20px",
              fontWeight: "bold",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
            }}
            onClick={handleLoginClick}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#faad14")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#fadb14")
            }
          >
            Đăng nhập
          </Button>
        )}
      </Header>

      {/* CONTENT */}
      <Content style={{ padding: 24, background: "#fffef5" }}>
        <Outlet />
      </Content>

      {/* FOOTER */}
      <Footer style={{ background: "#fffbe6", padding: "40px 24px 24px" }}>
        <Row gutter={[32, 24]} justify="space-between">
          <Col xs={24} md={8}>
            <h4 style={{ color: "#d48806", fontWeight: "bold" }}>LIÊN HỆ</h4>
            <p>🏢 Tầng 9, 6 Thái Văn Lung, Q1, TP.HCM</p>
            <p>📧 connect@hotel.com</p>
            <p>📞 +84 28 2250 8530</p>
          </Col>

          <Col xs={24} md={6}>
            <h4 style={{ color: "#d48806", fontWeight: "bold" }}>
              VỀ CHÚNG TÔI
            </h4>
            <p>Giới thiệu</p>
            <p>Dịch vụ</p>
            <p>Ưu đãi</p>
            <p>Liên hệ</p>
          </Col>

          <Col xs={24} md={6}>
            <h4 style={{ color: "#d48806", fontWeight: "bold" }}>
              THEO DÕI CHÚNG TÔI
            </h4>
            <div style={{ display: "flex", gap: 16, fontSize: 24 }}>
              <FacebookFilled />
              <InstagramFilled />
              <YoutubeFilled />
              <LinkedinFilled />
              <TwitterOutlined />
            </div>
          </Col>
        </Row>

        <div style={{ textAlign: "center", marginTop: 40, color: "#999" }}>
          © {new Date().getFullYear()} Guest View - Huy Phương Hotel
        </div>
      </Footer>

      {/* AUTH MODAL (manual trigger only) */}
      <AuthModal visible={modalOpen} onClose={() => setModalOpen(false)} />
    </Layout>
  );
};

export default GuestLayout;
