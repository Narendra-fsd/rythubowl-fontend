import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '@/features/auth/authThunks';
import ForgotPasswordForm from '@/components/forms/ForgotPasswordForm';
import { message } from 'antd';

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const onSubmit = (values) => {
    dispatch(forgotPassword(values)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        message.success(res.payload?.message || 'Password reset link sent to your email');
      } else {
        message.error(res.payload || 'Failed to send reset link');
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white w-full max-w-sm p-6 rounded-xl shadow">
        <h1 className="text-2xl font-semibold mb-4">Forgot Password</h1>
        <ForgotPasswordForm onSubmit={onSubmit} loading={loading} />
      </div>
    </div>
  );
}
