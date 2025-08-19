import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../features/auth/authThunks';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Button, Alert } from 'antd';
import Bgimg from '../../assets/bg-img.png';
import './ResetPassword.css';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, successMessage } = useSelector((state) => state.auth);

  const email = location.state?.email;
  const otp = location.state?.otp;

  if (!email || !otp) {
    navigate('/forgot-password');
    return null;
  }

  const initialValues = {
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
  });

  const handleSubmit = (values) => {
    dispatch(
      resetPassword({
        email,
        otp,
        newPassword: values.password,
      })
    )
      .unwrap()
      .then(() => {
        navigate('/login', {
          state: {
            success: true,
            message: 'Password reset successfully!',
          },
        });
      });
  };

  return (
    <div className="reset-password-container">
      <Card className="reset-password-card">
        <h2 className="reset-password-title">Create New Password</h2>
        <p className="reset-password-subtitle">
          Enter a new password for your account
        </p>

        {error && (
          <Alert
            message={error}
            type="error"
            className="error-alert"
            showIcon
          />
        )}

        {successMessage && (
          <Alert
            message={successMessage}
            type="success"
            className="success-alert"
            showIcon
          />
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="reset-password-form">
              <div className="form-group">
                <label className="form-label">New Password</label>
                <Field
                  name="password"
                  type="password"
                  className={`form-input ${errors.password && touched.password ? 'error' : ''}`}
                  placeholder="Enter new password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-text"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <Field
                  name="confirmPassword"
                  type="password"
                  className={`form-input ${errors.confirmPassword && touched.confirmPassword ? 'error' : ''}`}
                  placeholder="Confirm new password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="error-text"
                />
              </div>

              <Button
                type="primary"
                htmlType="submit"
                className="reset-button"
                loading={loading}
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default ResetPassword;
