import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  Card,
  Descriptions,
  Button,
  Tag,
  Image,
  Row,
  Col,
  Input,
  InputNumber,
  message,
} from "antd";
import { ArrowLeftOutlined, EditOutlined, CheckOutlined } from "@ant-design/icons";
import { fetchRoomById, putRoom } from "../../../redux/slice/RoomSlice";
import dayjs from "dayjs";

const RoomDetails = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const room = useSelector((state) => state.room.room);
  const [editMode, setEditMode] = useState(false);
  const [editedRoom, setEditedRoom] = useState({});

  useEffect(() => {
    dispatch(fetchRoomById(roomId));
  }, [dispatch, roomId]);

  useEffect(() => {
    if (room) {
      setEditedRoom({
        ...room,
        date: room.date || dayjs().format("DD/MM/YYYY"),
      });
    }
  }, [room]);

  const getStatusTag = (status) => {
    if (status === "OPEN") return <Tag color="green">Mở</Tag>;
    if (status === "CLOSE") return <Tag color="red">Đóng</Tag>;
    return <Tag color="default">{status}</Tag>;
  };

  const handleInputChange = (field, value) => {
    setEditedRoom((prev) => ({ ...prev, [field]: value }));
  };

  const handleConfirmEdit = () => {
    const { id, ...requestWithoutId } = editedRoom;

    dispatch(putRoom({ id: editedRoom.id, request: requestWithoutId }))
      .unwrap()
      .then(() => {
        message.success("Cập nhật thông tin phòng thành công!");
        setEditMode(false);
        dispatch(fetchRoomById(roomId));
      })
      .catch(() => {
        message.error("Cập nhật thất bại!");
      });
  };

  if (!room) return <Card>Không tìm thấy thông tin phòng.</Card>;

  return (
    <Card style={{ maxWidth: 800, margin: "32px auto", borderRadius: 16 }}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Image
            src={room.image}
            alt={room.name}
            width="100%"
            height={300}
            style={{ objectFit: "cover", borderRadius: 12 }}
            fallback="https://via.placeholder.com/800x300?text=No+Image"
          />
        </Col>

        <Col span={24}>
          <Descriptions
            title="🏠 Thông Tin Chi Tiết Phòng"
            bordered
            column={1}
            styles={{ fontWeight: "bold", width: 200 }}
          >
            <Descriptions.Item label="Tên phòng">
              {editMode ? (
                <Input
                  value={editedRoom.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              ) : (
                room.name
              )}
            </Descriptions.Item>

            <Descriptions.Item label="Giá theo ngày">
              {editMode ? (
                <InputNumber
                  value={editedRoom.priceDay}
                  onChange={(value) => handleInputChange("priceDay", value)}
                  style={{ width: "100%" }}
                />
              ) : (
                room.priceDay?.toLocaleString() + " VND"
              )}
            </Descriptions.Item>

            <Descriptions.Item label="Giá ban đêm">
              {editMode ? (
                <InputNumber
                  value={editedRoom.priceNight}
                  onChange={(value) => handleInputChange("priceNight", value)}
                  style={{ width: "100%" }}
                />
              ) : (
                room.priceNight?.toLocaleString() + " VND"
              )}
            </Descriptions.Item>

            <Descriptions.Item label="Giá giờ đầu tiên">
              {editMode ? (
                <InputNumber
                  value={editedRoom.priceFirstHour}
                  onChange={(value) => handleInputChange("priceFirstHour", value)}
                  style={{ width: "100%" }}
                />
              ) : (
                room.priceFirstHour?.toLocaleString() + " VND"
              )}
            </Descriptions.Item>

            <Descriptions.Item label="Giá giờ tiếp theo">
              {editMode ? (
                <InputNumber
                  value={editedRoom.priceNextHour}
                  onChange={(value) => handleInputChange("priceNextHour", value)}
                  style={{ width: "100%" }}
                />
              ) : (
                room.priceNextHour?.toLocaleString() + " VND"
              )}
            </Descriptions.Item>

            <Descriptions.Item label="Mô tả">
              {editMode ? (
                <Input.TextArea
                  rows={3}
                  value={editedRoom.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                />
              ) : (
                room.description
              )}
            </Descriptions.Item>

            <Descriptions.Item label="Trạng thái">
              {getStatusTag(room.status)}
            </Descriptions.Item>
          </Descriptions>
        </Col>

        <Col span={24} style={{ textAlign: "center", marginTop: 20 }}>
          {editMode ? (
            <Button
              type="primary"
              icon={<CheckOutlined />}
              style={{ marginRight: 16, width: 140, fontWeight: 600 }}
              onClick={handleConfirmEdit}
            >
              Xác nhận
            </Button>
          ) : (
            <Button
              type="primary"
              icon={<EditOutlined />}
              style={{ marginRight: 16, width: 140, fontWeight: 600 }}
              onClick={() => setEditMode(true)}
            >
              Chỉnh sửa
            </Button>
          )}

          <Button
            icon={<ArrowLeftOutlined />}
            style={{ width: 140, fontWeight: 600 }}
            onClick={() => navigate("/admin/rooms")}
          >
            Quay lại
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default RoomDetails;
