import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Descriptions, Divider, Button } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import {
  DollarOutlined,
  GiftOutlined,
  ScheduleOutlined,
  StarOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { fetchVoucherById } from "../../../redux/slice/VoucherSlice";

const VoucherDetails = () => {
  const { voucherId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const voucher = useSelector((state) => state.voucher.voucher);

  useEffect(() => {
    dispatch(fetchVoucherById(voucherId));
  }, [dispatch, voucherId]);

  if (!voucher) return <Card>Không tìm thấy voucher.</Card>;

  return (
    <Card
      style={{
        maxWidth: 700,
        margin: "auto",
        marginTop: 32,
        padding: 24,
        backgroundColor: "#fffef2",
        borderRadius: 16,
      }}
    >
      <Descriptions
        title={<><GiftOutlined /> Thông tin voucher</>}
        bordered
        column={1}
        styles={{ backgroundColor: "#fffbe6", fontWeight: 500 }}
      >
        <Descriptions.Item label="Tên">{voucher.name}</Descriptions.Item>
        <Descriptions.Item label={<DollarOutlined />}>
          {voucher.amount}% giảm giá
        </Descriptions.Item>
        <Descriptions.Item label={<StarOutlined />}>
          {voucher.point} điểm
        </Descriptions.Item>
        <Descriptions.Item label={<ScheduleOutlined />}>
          {voucher.expiryDateTime}
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái">
          {voucher.status}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày tạo">
          {voucher.created}
        </Descriptions.Item>
        <Descriptions.Item label="Cập nhật gần nhất">
          {voucher.updated}
        </Descriptions.Item>
      </Descriptions>
      <Divider />
      <Button icon={<ArrowLeftOutlined />} onClick={() => navigate("/admin/vouchers")}>
        Quay lại
      </Button>
    </Card>
  );
};

export default VoucherDetails;
