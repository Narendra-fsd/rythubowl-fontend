import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Card, Alert, Checkbox } from 'antd';
import { loginUser } from '../../features/auth/authThunks';
import { useNavigate } from 'react-router-dom';
import Bgimg from '../../assets/bg-img.png';
import './Login.css'; // Import the CSS file

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((s) => s.auth);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    dispatch(loginUser({ email: values.email, password: values.password }))
      .unwrap()
      .then(({ user }) => {
        // role based redirect
        if (user?.role === 'SuperAdmin') navigate('/admin');
        else if (user?.role === 'DeliveryAgent') navigate('/delivery');
        else navigate('/');
      })
      .catch((error) => {
        // Handle unverified email case
        if (error.isVerified === false) {
          navigate('/otp-verify', {
            state: {
              email: error.email || values.email,
              error: error.message,
            },
          });
        }
      });
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Sign in to your account</p>

        {error && error.isVerified !== false && (
          <Alert type="error" message={error.message} className="error-alert" />
        )}

        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Invalid email' },
            ]}
          >
            <Input placeholder="you@example.com" className="login-input" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password placeholder="••••••••" className="login-input" />
          </Form.Item>

          <div className="login-options">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className="remember-checkbox">Remember me</Checkbox>
            </Form.Item>
            <Button
              type="link"
              className="forgot-password-link"
              onClick={() => navigate('/forgot-password')}
            >
              Forgot password?
            </Button>
          </div>

          <Button
            type="primary"
            htmlType="submit"
            className="login-button"
            loading={loading}
          >
            Sign in
          </Button>

          <div className="register-cta">
            <span className="register-text">New here?</span>
            <Button
              type="link"
              className="register-link"
              onClick={() => navigate('/register')}
            >
              Create an account
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
