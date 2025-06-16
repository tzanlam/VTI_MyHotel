import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  DatePicker,
  Button,
  Card,
  Typography,
  message,
  Row,
  Col,
  Radio,
} from "antd";
import dayjs from "dayjs";
import { fetchRoomById, fetchRooms } from "../../redux/slice/RoomSlice";
import { postBooking } from "../../redux/slice/BookingSlice";
import { fetchAccountById } from "../../redux/slice/AccountSlice";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);

const { Title, Text } = Typography;

const BookingGuest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");
  const [imageTransition, setImageTransition] = useState(false);

  const {
    // eslint-disable-next-line no-unused-vars
    room,
    rooms,
  } = useSelector((state) => state.room);
  const { accountId } = useSelector((state) => state.auth);
  // eslint-disable-next-line no-unused-vars
  const { account, loading: accountLoading } = useSelector(
    (state) => state.account
  );

  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);
  const [type, setType] = useState("HOURLY");
  const [showHourPickers, setShowHourPickers] = useState(false);
  const [checkinHour, setCheckinHour] = useState(null);
  const hourOptions = Array.from(
    { length: 18 },
    (_, i) => `${(i + 6).toString().padStart(2, "0")}:00`
  );

  useEffect(() => {
    if (roomId) {
      dispatch(fetchRoomById(roomId));
    } else {
      dispatch(fetchRooms());
    }
  }, [dispatch, roomId]);

  useEffect(() => {
    if (roomId && rooms.length > 0) {
      const index = rooms.findIndex((r) => r.id === parseInt(roomId));
      setSelectedRoomIndex(index >= 0 ? index : 0);
    }
  }, [rooms, roomId]);

  useEffect(() => {
    if (accountId) dispatch(fetchAccountById(accountId));
  }, [accountId, dispatch]);

  useEffect(() => {
    if (account) {
      form.setFieldsValue({
        fullName: account.fullName,
        phoneNumber: account.phoneNumber,
      });
    }
  }, [account, form]);

  const handleTypeChange = (value) => {
    setType(value);
    setShowHourPickers(value === "HOURLY");
    setCheckinHour(null);
    form.setFieldsValue({
      type: value,
      checkin: null,
      checkout: null,
      checkinHour: null,
      checkoutHour: null,
      date: null,
    });
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const roomFound = rooms[selectedRoomIndex];
      if (!roomFound) {
        message.error("Vui lòng chọn phòng hợp lệ!");
        return;
      }

      let checkinTime, checkoutTime;

      if (type === "HOURLY") {
        const today = dayjs().startOf("day");
        const selectedDate = values.date.startOf("day");
        const now = dayjs();

        if (selectedDate.isBefore(today)) {
          message.error("Ngày đặt phải lớn hơn hoặc bằng hôm nay!");
          return;
        }

        checkinTime = dayjs(
          `${values.date.format("YYYY-MM-DD")} ${values.checkinHour}`
        );
        checkoutTime = dayjs(
          `${values.date.format("YYYY-MM-DD")} ${values.checkoutHour}`
        );

        if (checkinTime.isBefore(now)) {
          message.error("Giờ nhận phòng phải lớn hơn thời gian hiện tại!");
          return;
        }

        if (checkoutTime.isSameOrBefore(checkinTime)) {
          message.error("Giờ trả phòng phải sau giờ nhận phòng!");
          return;
        }
      } else {
        checkinTime = values.checkin;
        checkoutTime =
          values.checkout ||
          checkinTime.add(1, "day").hour(12).minute(0).second(0);
      }

      const payload = {
        fullName: values.fullName || account?.fullName,
        phoneNumber: values.phoneNumber || account?.phoneNumber,
        roomId: roomFound.id,
        type: values.type,
        checkinDate: checkinTime.format("DD/MM/YYYY"),
        checkinTime: checkinTime.format("HH:mm"),
        checkoutDate: checkoutTime.format("DD/MM/YYYY"),
        checkoutTime: checkoutTime.format("HH:mm"),
        voucherId: values.voucher ? parseInt(values.voucher) : null,
      };

      const result = await dispatch(postBooking(payload)).unwrap();
      message.success("Đặt phòng thành công!");
      navigate(`/booking/${result.id}`);
    } catch (error) {
      message.error("Đặt phòng thất bại. Vui lòng thử lại!");
    }
  };

  const currentRoom = rooms[selectedRoomIndex] || {};

  const handleRoomChange = (next) => {
    setImageTransition(true);
    setTimeout(() => {
      setSelectedRoomIndex((prev) => prev + next);
      setImageTransition(false);
    }, 300);
  };

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "auto",
        padding: 32,
        background: "#fffef2",
      }}
    >
      <Card
        style={{
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          borderRadius: 16,
          padding: 32,
        }}
      >
        <Title level={3} style={{ textAlign: "center", color: "#bfa300" }}>
          Đặt phòng khách sạn
        </Title>
        <Text
          type="secondary"
          style={{ display: "block", textAlign: "center", marginBottom: 24 }}
        >
          Vui lòng điền thông tin để hoàn tất đặt phòng
        </Text>

        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <div
            style={{
              textAlign: "center",
              marginBottom: 24,
              position: "relative",
            }}
          >
            <img
              src={
                currentRoom?.image ||
                "https://via.placeholder.com/300x200?text=Room"
              }
              alt={currentRoom?.name}
              style={{
                width: "100%",
                maxHeight: 240,
                objectFit: "cover",
                borderRadius: 8,
                transition: "opacity 0.3s ease-in-out",
                opacity: imageTransition ? 0.4 : 1,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                width: 50,
                background: "linear-gradient(to right, #fffef2, transparent)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                right: 0,
                width: 50,
                background: "linear-gradient(to left, #fffef2, transparent)",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 12,
              }}
            >
              <Button
                type="default"
                disabled={selectedRoomIndex <= 0}
                onClick={() => handleRoomChange(-1)}
                style={{ backgroundColor: "#fffbe6" }}
              >
                ← Trước
              </Button>
              <div style={{ fontWeight: "bold", color: "#bfa300" }}>
                {currentRoom?.name}
              </div>
              <Button
                type="default"
                disabled={selectedRoomIndex >= rooms.length - 1}
                onClick={() => handleRoomChange(1)}
                style={{ backgroundColor: "#fffbe6" }}
              >
                Sau →
              </Button>
            </div>
          </div>
          <Form.Item
            label="Loại đặt phòng"
            name="type"
            initialValue="HOURLY"
            rules={[{ required: true, message: "Vui lòng chọn loại đặt phòng" }]}
          >
            <Row gutter={[16, 16]} justify="center">
              <Col>
                <Button
                  type={type === "HOURLY" ? "primary" : "default"}
                  onClick={() => handleTypeChange("HOURLY")}
                  style={{
                    background: type === "HOURLY" ? "#fadb14" : "white",
                    borderColor: "#d4b106",
                  }}
                >
                  Theo giờ
                </Button>
              </Col>
              <Col>
                <Button
                  type={type === "NIGHTLY" ? "primary" : "default"}
                  onClick={() => handleTypeChange("NIGHTLY")}
                  style={{
                    background: type === "NIGHTLY" ? "#fadb14" : "white",
                    borderColor: "#d4b106",
                  }}
                >
                  Qua đêm
                </Button>
              </Col>
              <Col>
                <Button
                  type={type === "DAILY" ? "primary" : "default"}
                  onClick={() => handleTypeChange("DAILY")}
                  style={{
                    background: type === "DAILY" ? "#fadb14" : "white",
                    borderColor: "#d4b106",
                  }}
                >
                  Theo ngày
                </Button>
              </Col>
            </Row>
          </Form.Item>

          {type === "HOURLY" && (
            <>
              <Form.Item
                name="date"
                label="Chọn ngày"
                rules={[{ required: true, message: "Vui lòng chọn ngày" }]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  disabledDate={(current) =>
                    current && current < dayjs().startOf("day")
                  }
                  onChange={() => setShowHourPickers(true)}
                />
              </Form.Item>
              {showHourPickers && (
                <Row
                  gutter={16}
                  style={{ overflowX: "auto", whiteSpace: "nowrap" }}
                >
                  <Col span={12}>
                    <Form.Item
                      name="checkinHour"
                      label="Giờ nhận phòng"
                      rules={[
                        { required: true, message: "Vui lòng chọn giờ nhận phòng" },
                      ]}
                    >
                      <Radio.Group
                        style={{
                          display: "flex",
                          flexWrap: "nowrap",
                          overflowX: "auto",
                        }}
                        onChange={(e) => setCheckinHour(e.target.value)}
                      >
                        {hourOptions.map((hour) => (
                          <Radio.Button key={hour} value={hour}>
                            {hour}
                          </Radio.Button>
                        ))}
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="checkoutHour"
                      label="Giờ trả phòng"
                      rules={[
                        { required: true, message: "Vui lòng chọn giờ trả phòng" },
                      ]}
                    >
                      <Radio.Group
                        style={{
                          display: "flex",
                          flexWrap: "nowrap",
                          overflowX: "auto",
                        }}
                      >
                        {hourOptions
                          .filter((h) => !checkinHour || h > checkinHour)
                          .map((hour) => (
                            <Radio.Button key={hour} value={hour}>
                              {hour}
                            </Radio.Button>
                          ))}
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
              )}
            </>
          )}

          {type === "DAILY" && (
            <>
              <Form.Item
                name="checkin"
                label="Ngày nhận phòng"
                rules={[{ required: true, message: "Vui lòng chọn ngày nhận phòng" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                name="checkout"
                label="Ngày trả phòng"
                rules={[{ required: true, message: "Vui lòng chọn ngày trả phòng" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </>
          )}

          {type === "NIGHTLY" && (
            <Form.Item
              name="checkin"
              label="Ngày nhận phòng"
              rules={[{ required: true, message: "Vui lòng chọn ngày nhận phòng" }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          )}

          <Form.Item
            name="fullName"
            label="Tên khách hàng"
            rules={[{ required: true, message: "Vui lòng nhập tên khách hàng" }]}
          >
            <Input
              placeholder="Nhập tên khách hàng"
              style={{ backgroundColor: "#fffbe6" }}
            />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Số điện thoại"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          >
            <Input
              placeholder="Nhập số điện thoại"
              style={{ backgroundColor: "#fffbe6" }}
            />
          </Form.Item>
          <Form.Item name="voucher" label="Mã voucher">
            <Input
              placeholder="Nhập mã voucher (nếu có)"
              style={{ backgroundColor: "#fffbe6" }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ backgroundColor: "#fadb14", borderColor: "#fadb14" }}
            >
              Xác nhận đặt phòng
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default BookingGuest;