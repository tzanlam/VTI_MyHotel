import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({ status = 500, title = "Có lỗi xảy ra", subtitle = "Hệ thống gặp sự cố hoặc không tìm thấy nội dung." }) => {
  const navigate = useNavigate();

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fffef2",
    }}>
      <Result
        status={status}
        title={title}
        subTitle={subtitle}
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            Về trang chủ
          </Button>
        }
      />
    </div>
  );
};

export default ErrorPage;
