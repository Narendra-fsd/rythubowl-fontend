import { Form, Input, Button } from 'antd';

export default function ResetPasswordForm({ onSubmit, loading }) {
  return (
    <Form layout="vertical" onFinish={onSubmit}>
      <Form.Item name="password" label="New Password" rules={[{ required: true }]}>
        <Input.Password placeholder="Enter new password" />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        label="Confirm Password"
        dependencies={['password']}
        rules={[{ required: true }]}
      >
        <Input.Password placeholder="Confirm password" />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={loading} block>
        Reset Password
      </Button>
    </Form>
  );
}
