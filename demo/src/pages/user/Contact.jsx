import { Card, Row, Col, Avatar } from "antd";

const staff = [
  {
    name: "Nguyễn Văn A",
    role: "Quản lý khách sạn",
    avatar: "/assets/staff/manager.jpg",
    description: "Phụ trách vận hành và đảm bảo dịch vụ khách sạn hoạt động trơn tru.",
  },
  {
    name: "Trần Thị B",
    role: "Lễ tân",
    avatar: "/assets/staff/receptionist.jpg",
    description: "Đón tiếp và hỗ trợ khách hàng 24/7 với thái độ thân thiện, chuyên nghiệp.",
  },
  {
    name: "Lê Văn C",
    role: "Nhân viên kỹ thuật",
    avatar: "/assets/staff/maintenance.jpg",
    description: "Đảm bảo cơ sở vật chất và kỹ thuật khách sạn luôn trong tình trạng tốt.",
  },
];

const Contact = () => {
  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ textAlign: "center", marginBottom: 32, color: "#bfa300" }}>Đội ngũ nhân viên khách sạn</h2>
      <Row gutter={[24, 24]} justify="center">
        {staff.map((person, index) => (
          <Col key={index} xs={24} sm={12} md={8}>
            <Card hoverable style={{ borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <Card.Meta
                avatar={<Avatar src={person.avatar} size={64} />}
                title={<span style={{ fontWeight: "bold", color: "#bfa300" }}>{person.name}</span>}
                description={
                  <>
                    <p style={{ marginBottom: 4, fontStyle: "italic", color: "#555" }}>{person.role}</p>
                    <p style={{ fontSize: 13 }}>{person.description}</p>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Contact;
