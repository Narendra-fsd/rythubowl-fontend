import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, message } from 'antd';
import { resetPassword } from '@/features/auth/authThunks';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { loading } = useSelector((state) => state.auth);

  const onFinish = (values) => {
    dispatch(resetPassword({ ...values, token })).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        message.success('Password reset successfully');
        navigate('/login');
      }
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-xl font-bold mb-4">Reset Password</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="password" label="New Password" rules={[{ required: true }]}>
            <Input.Password placeholder="Enter new password" />
          </Form.Item>
          <Form.Item name="confirmPassword" label="Confirm Password" rules={[{ required: true }]}>
            <Input.Password placeholder="Confirm password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Reset Password
          </Button>
        </Form>
      </div>
    </div>
  );
}
