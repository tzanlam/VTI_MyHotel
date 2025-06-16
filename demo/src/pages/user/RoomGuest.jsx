import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Row, Col, Button, Typography, Spin } from "antd";
import { fetchRooms } from "../../redux/slice/RoomSlice";
import room1 from "../../assets/default/room1.jpg";
import RoomDetailsModal from "../../components/form/RoomDetails";

const { Title } = Typography;

const RoomGuest = () => {
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.room.rooms) || [];
  const loading = useSelector((state) => state.room.loading);

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedRoomId(null);
  };

  useEffect(() => {
    dispatch(fetchRooms()).then((res) =>
      console.log("Dữ liệu fetchRooms:", res)
    );
  }, [dispatch]);

  return (
    <div className="p-6 min-h-screen bg-[#fffbe6]">
      <Title level={2} className="text-center text-yellow-700 mb-8">
        Danh sách các loại phòng
      </Title>

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Row gutter={[24, 24]} justify="center">
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <Col key={room.id} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    hoverable
                    className="room-card"
                    cover={
                      <img
                        alt={room.name}
                        src={
                          room.image && room.image !== "không có"
                            ? room.image
                            : room1
                        }
                        className="h-56 w-full object-cover rounded-t-2xl"
                      />
                    }
                  >
                    <Card.Meta
                      title={<div className="room-card-title">{room.name}</div>}
                      description={
                        <p className="room-card-price">
                          {room.priceDay?.toLocaleString()} đ / đêm
                        </p>
                      }
                    />
                    <Button
                      block
                      className="room-card-button"
                      onClick={() => {
                        console.log("Room ID selected:", room.id);
                        setSelectedRoomId(room.id);
                        setIsModalVisible(true);
                      }}
                    >
                      Chi tiết
                    </Button>
                  </Card>
                </Col>
              ))
            ) : (
              <Col span={24}>
                <h3 className="text-center text-gray-600">Không có phòng nào.</h3>
              </Col>
            )}
          </Row>

          {isModalVisible && (
            <RoomDetailsModal
              roomId={selectedRoomId}
              isVisible={isModalVisible}
              onClose={handleCloseModal}
            />
          )}
        </>
      )}
    </div>
  );
};

export default RoomGuest;
