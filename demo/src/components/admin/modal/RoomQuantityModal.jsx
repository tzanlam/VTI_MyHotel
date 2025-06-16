// components/admin/room/UpdateQuantityModal.jsx
import { Modal, InputNumber, DatePicker, Form, message } from "antd";
import { useDispatch } from "react-redux";
import { updateQuantityRoomByDate, fetchRooms } from "../../../redux/slice/RoomSlice";
import dayjs from "dayjs";

const UpdateQuantityModal = ({ open, onClose, room }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      const payload = {
        roomId: room.id,
        quantity: values.quantity,
        startDate: values.dateRange[0].format("DD/MM/YYYY"),
        endDate: values.dateRange[1].format("DD/MM/YYYY"),
      };

      await dispatch(updateQuantityRoomByDate(payload)).unwrap();
      console.log("put quantity room by date :"+payload);
      message.success("Cập nhật số lượng phòng thành công!");
      onClose();
      dispatch(fetchRooms());
    } catch (error) {
      message.error("Cập nhật thất bại!");
    }
  };

  return (
    <Modal
      title={`🛏 Cập nhật số lượng phòng - ${room?.name}`}
      open={open}
      onCancel={onClose}
      onOk={handleOk}
      okText="Xác nhận"
      cancelText="Hủy"
      centered
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Số lượng"
          name="quantity"
          rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Khoảng thời gian"
          name="dateRange"
          rules={[{ required: true, message: "Vui lòng chọn khoảng thời gian!" }]}
        >
          <DatePicker.RangePicker
            format="DD/MM/YYYY"
            style={{ width: "100%" }}
            defaultValue={[dayjs(), dayjs().add(1, "day")]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateQuantityModal;
