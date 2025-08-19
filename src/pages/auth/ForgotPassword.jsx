import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../features/auth/authThunks';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Alert } from 'antd';
import Bgimg from '../../assets/bg-img.png';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const initialValues = { email: '' };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  });

  const handleSubmit = (values) => {
    dispatch(forgotPassword(values))
      .unwrap()
      .then(() => {
        navigate('/verify-forgot-otp', {
          state: {
            email: values.email,
            message: 'OTP sent to your email for password reset',
          },
        });
      })
      .catch(() => {});
  };

  return (
    <div className="forgot-password-container">
      <Card className="forgot-password-card">
        <h2 className="forgot-password-title">Reset Your Password</h2>
        <p className="forgot-password-subtitle">
          Enter your email to receive a password reset OTP
        </p>

        {error && (
          <Alert
            message={error}
            type="error"
            className="error-alert"
            showIcon
          />
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="forgot-password-form">
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <Field
                  name="email"
                  type="email"
                  className={`form-input ${errors.email && touched.email ? 'error' : ''}`}
                  placeholder="you@example.com"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-text"
                />
              </div>

              <Button
                type="primary"
                htmlType="submit"
                className="submit-button"
                loading={loading}
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </Button>
            </Form>
          )}
        </Formik>

        <div className="back-to-login">
          Remember your password?{' '}
          <Button
            type="link"
            className="login-link"
            onClick={() => navigate('/login')}
          >
            Sign in
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPassword;
