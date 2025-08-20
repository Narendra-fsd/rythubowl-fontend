import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Card, Alert, Checkbox } from 'antd';
import { loginUser } from '../../features/auth/authThunks';
import { useNavigate, useLocation } from 'react-router-dom';
import Bgimg from '../../assets/bg-img.png';
import './Login.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error } = useSelector((s) => s.auth);
  const [form] = Form.useForm();

  // Check for success message from registration/verification
  const successMessage = location.state?.message;

  const onFinish = (values) => {
    dispatch(loginUser({ email: values.email, password: values.password }))
      .unwrap()
      .then(({ user, token }) => {
        // role based redirect
        if (user?.role === 'SuperAdmin') navigate('/admin');
        else if (user?.role === 'DeliveryAgent') navigate('/delivery');
        else {
          localStorage.setItem('isAuthenticated', true);
          localStorage.setItem('token', token);
          localStorage.setItem('userDetails', JSON.stringify(user));

          navigate('/');
        }
      })
      .catch((error) => {
        // Handle unverified email case - ONLY if specifically indicated
        if (error.isVerified === false) {
          navigate('/verify-email', {
            state: {
              email: error.email || values.email,
              error: error.message,
            },
          });
        }
        // For other errors, they will be displayed in the error alert below
      });
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Sign in to your account</p>

        {/* Show success message if coming from registration/verification */}
        {successMessage && (
          <Alert
            type="success"
            message={successMessage}
            className="success-alert"
          />
        )}

        {/* Show error only if it's NOT an unverified email error */}
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
