import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Card, Descriptions, Button, Divider } from "antd";
import { fetchAccountById } from "../../redux/slice/AccountSlice";
import { ArrowLeftOutlined, SmileOutlined } from "@ant-design/icons";

const GuestDetails = () => {
  const { guestId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const guest = useSelector((state) => state.account.account);

  useEffect(() => {
    dispatch(fetchAccountById(guestId));
  }, [dispatch, guestId]);

  if (!guest) return <Card>Không tìm thấy người dùng.</Card>;

  return (
    <Card style={{ maxWidth: 700, margin: "auto", borderRadius: 16, marginTop: 32 }}>
      <Descriptions
        title={<><SmileOutlined /> Thông tin người dùng</>}
        bordered
        column={1}
      >
        <Descriptions.Item label="Họ tên">{guest.fullName}</Descriptions.Item>
        <Descriptions.Item label="Email">{guest.email}</Descriptions.Item>
        <Descriptions.Item label="Điện thoại">{guest.phone}</Descriptions.Item>
        <Descriptions.Item label="Quyền hạn">{guest.role}</Descriptions.Item>
      </Descriptions>
      <Divider />
      <Button icon={<ArrowLeftOutlined />} onClick={() => navigate("/admin/guests")}>
        Quay lại
      </Button>
    </Card>
  );
};

export default GuestDetails;
