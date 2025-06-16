import { Modal, Tabs, Form, Input, Button, message } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slice/AuthSlice';
import '../../assets/css/AuthModal.css';
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [registerRole, setRegisterRole] = useState('USER'); // USER or ADMIN
  const handleLogin = async (values) => {
    const { email, password } = values;

    if (!email || !password) {
      message.error('Vui lòng nhập đầy đủ email và mật khẩu!');
      return;
    }

    try {
      const result = await dispatch(login({ email, password })).unwrap(); // result chứa toàn bộ payload trả về

    message.success('Đăng nhập thành công');

    if (result.authorities?.[0]?.authority === "ADMIN") {
      navigate("/admin");
    } else {
      navigate("/");
    }

      loginForm.resetFields();
      onClose();
    } catch (err) {
      message.error('Đăng nhập thất bại. Vui lòng kiểm tra lại!');
    }
  };

  const handleRegister = async (values) => {
    const { username, email, password } = values;
    setLoading(true);

    try {
      const payload = {
        email,
        password,
        fullName: username,
        phoneNumber: '',
        position: registerRole === 'ADMIN' ? 'ADMIN' : 'USER',
        level: registerRole === 'ADMIN' ? 'ADMIN_CUSTOMER' : 'NEW_CUSTOMER',
      };

      console.log('Đăng ký với payload:', payload);
      message.success(`Đăng ký ${registerRole === 'ADMIN' ? 'Admin' : 'Người dùng'} thành công`);
      registerForm.resetFields();
      onClose();
    } catch (error) {
      message.error('Đăng ký thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={visible} onCancel={onClose} footer={null} centered className="auth-modal">
      <div className="auth-header">
        <h2>Chào mừng bạn đến với Huy Phương Hotel</h2>
      </div>

      <Tabs
        defaultActiveKey="login"
        centered
        className="custom-tabs"
        items={[
          {
            key: 'login',
            label: 'Đăng nhập',
            children: (
              <Form form={loginForm} layout="vertical" onFinish={handleLogin}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: 'Vui lòng nhập email!' },
                    { type: 'email', message: 'Email không hợp lệ!' },
                  ]}
                >
                  <Input placeholder="Nhập email" />
                </Form.Item>

                <Form.Item
                  label="Mật khẩu"
                  name="password"
                  rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                >
                  <Input.Password placeholder="Nhập mật khẩu" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading} className="btn-login">
                    Đăng nhập
                  </Button>
                </Form.Item>
              </Form>
            ),
          },
          {
            key: 'register',
            label: 'Đăng ký',
            children: (
              <Form form={registerForm} layout="vertical" onFinish={handleRegister}>
                <Form.Item
                  label="Tên người dùng"
                  name="username"
                  rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}
                >
                  <Input placeholder="Nhập tên người dùng" />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: 'Vui lòng nhập email!' },
                    { type: 'email', message: 'Email không hợp lệ!' },
                  ]}
                >
                  <Input placeholder="Nhập email" />
                </Form.Item>

                <Form.Item
                  label="Mật khẩu"
                  name="password"
                  rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                >
                  <Input.Password placeholder="Nhập mật khẩu" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading} className="btn-register">
                    Đăng ký
                  </Button>
                </Form.Item>
              </Form>
            ),
          },
        ]}
      />
    </Modal>
  );
};

export default AuthModal;
