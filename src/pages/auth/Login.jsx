import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Card, Alert, Checkbox } from "antd";
import { loginUser } from "../../features/auth/authThunks";
import { useNavigate } from "react-router-dom";
import Bgimg from "../../assets/bg-img.png";


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
        if (user?.role === "SuperAdmin") navigate("/admin");
        else if (user?.role === "DeliveryAgent") navigate("/delivery");
        else navigate("/");
      })
      .catch((error) => {
        // Handle unverified email case
        if (error.isVerified === false) {
          navigate("/otp-verify", {
            state: {
              email: error.email || values.email,
              error: error.message,
            },
          });
        }
      });
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-start p-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${Bgimg})` }}
    >
      <Card className="w-full max-w-md shadow-lg bg-white/90 backdrop-blur-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

        {error && error.isVerified !== false && (
          <Alert type="error" message={error.message} className="mb-3" />
        )}

        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Invalid email" },
            ]}
          >
            <Input placeholder="you@example.com" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="••••••••" />
          </Form.Item>

          <div className="flex items-center justify-between mb-3">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Button type="link" onClick={() => navigate("/forgot-password")}>
              Forgot password?
            </Button>
          </div>

          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={loading}
          >
            Sign in
          </Button>

          <div className="text-center mt-3">
            <span className="text-sm">
              New here?{" "}
              <Button type="link" onClick={() => navigate("/register")}>
                Create an account
              </Button>
            </span>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
