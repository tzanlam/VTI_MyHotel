import { useEffect, useState } from "react";
import { Table, Card, Space, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms } from "../../redux/slice/RoomSlice";
import UpdateQuantityModal from "../../components/admin/modal/RoomQuantityModal";

const Rooms = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rooms = useSelector((state) => state.room.rooms);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchRooms()).unwrap();
  }, [dispatch]);

  const columns = [
    {
      title: <b>Mã Phòng</b>,
      dataIndex: "id",
      key: "id",
    },
    {
      title: <b>Tên Phòng</b>,
      dataIndex: "name",
      key: "name",
    },
     {
      title: <b>Hành động</b>,
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            onClick={(e) => {
                        e.stopPropagation(); // ⛔ Ngăn chuyển trang

              setSelectedRoom(record);
              setShowModal(true);
            }}
          >
            Cập nhật số lượng
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card title="📦 Quản Lý Phòng" style={{ margin: 24, borderRadius: 16 }}>
      <Table
        columns={columns}
        dataSource={rooms}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        onRow={(record) => ({
          onClick: () => navigate(`/admin/rooms/${record.id}`),
          style: {
            cursor: "pointer",
            fontSize: "15px",
            fontWeight: 500,
            transition: "background 0.3s",
          },
          onMouseEnter: (e) => (e.currentTarget.style.background = "#fff6cc"),
          onMouseLeave: (e) => (e.currentTarget.style.background = "transparent"),
        })}
      />
      {showModal && selectedRoom && (
        <UpdateQuantityModal
          open={showModal}
          onClose={() => setShowModal(false)}
          room={selectedRoom}
        />
      )}
    </Card>
  );
};

export default Rooms;
