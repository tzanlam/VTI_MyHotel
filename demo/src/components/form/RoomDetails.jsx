import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoomById } from "../../redux/slice/RoomSlice";
import { Modal, Typography, Button, Spin } from "antd";
import "../../assets/css/RoomGuest.css";
import { useNavigate } from 'react-router-dom';

const { Paragraph, Title } = Typography;

const RoomDetailsModal = ({ roomId, isVisible, onClose }) => {
  const dispatch = useDispatch();
  const room = useSelector((state) => state.room.room);
  const loading = useSelector((state) => state.room.loading);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("RoomDetailsModal useEffect - roomId:", roomId, "room:", room, "loading:", loading);
    if (roomId && isVisible && !room) {
      dispatch(fetchRoomById(roomId));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, roomId, isVisible, room]);

  return (
    <Modal
      title={<Title level={3} className="modal-title">{room?.name || "Thông tin phòng"}</Title>}
      open={isVisible}
      onCancel={onClose}
      footer={null}
      width={800}
      styles={{
        body: {
          padding: 0,
        },
      }}
    >
      <div className="room-modal-container">
        {loading ? (
          <div className="spinner-wrapper">
            <Spin size="large" />
            <p>Đang tải dữ liệu...</p>
          </div>
        ) : !room ? (
          <div className="no-room">Không tìm thấy thông tin phòng.</div>
        ) : (
          <div className="room-modal-content">
            <div className="room-image-wrapper">
              <img
                src={
                  room.image && room.image !== "không có"
                    ? room.image
                    : "/default-room.jpg"
                }
                alt={room.name}
                className="room-image"
              />
            </div>

            <Paragraph className="room-description">
              {room.description || "Không có mô tả chi tiết cho phòng này."}
            </Paragraph>

            <div className="room-info-grid">
              <p><strong>Số lượng:</strong> {room.quantity}</p>
              <p><strong>Giá ngày:</strong> {room.priceDay?.toLocaleString()} VND</p>
              <p><strong>Giá đêm:</strong> {room.priceNight?.toLocaleString()} VND</p>
              <p><strong>Giá giờ đầu:</strong> {room.priceFirstHour?.toLocaleString()} VND</p>
              <p><strong>Giá giờ tiếp theo:</strong> {room.priceNextHour?.toLocaleString()} VND</p>
            </div>

            <div className="button-wrapper">
              <Button
                type="primary"
                size="large"
                className="booking-button"
                onClick={() => {
                  onClose();
                  navigate(`/booking?roomId=${room.id}`)
                }}
              ksi>
                Đặt phòng ngay
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default RoomDetailsModal;