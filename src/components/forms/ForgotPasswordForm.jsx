import { Form, Input, Button } from 'antd';

export default function ForgotPasswordForm({ onSubmit, loading }) {
  return (
    <Form layout="vertical" onFinish={onSubmit}>
      <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
        <Input placeholder="Enter registered email" />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={loading} block>
        Send Reset Link
      </Button>
    </Form>
  );
}
