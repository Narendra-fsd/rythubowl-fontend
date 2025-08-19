import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { verifyForgotPasswordOtp } from '../../features/auth/authThunks';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, Button, Alert } from 'antd';
import Bgimg from '../../assets/bg-img.png';
import './ForgotPasswordOtp.css';

const ForgotPasswordOtp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, successMessage } = useSelector((state) => state.auth);

  const email = location.state?.email || '';

  const initialValues = { email, otp: '' };
  const validationSchema = Yup.object({
    otp: Yup.string()
      .length(6, 'OTP must be 6 digits')
      .required('OTP is required')
      .matches(/^\d+$/, 'Must be only numbers'),
  });

  const handleSubmit = (values) => {
    dispatch(verifyForgotPasswordOtp(values))
      .unwrap()
      .then(() => {
        navigate('/reset-password', { state: { email: values.email } });
      });
  };

  return (
    <div className="forgot-otp-container">
      <Card className="forgot-otp-card">
        <h2 className="forgot-otp-title">Verify Password Reset</h2>
        <p className="forgot-otp-subtitle">
          Enter the 6-digit code sent to{' '}
          <span className="email-highlight">{email}</span>
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
            <Form className="forgot-otp-form">
              <div className="form-group">
                <label className="form-label">Verification Code</label>
                <Field
                  name="otp"
                  type="text"
                  inputMode="numeric"
                  className={`form-input ${errors.otp && touched.otp ? 'error' : ''}`}
                  placeholder="••••••"
                />
                <ErrorMessage
                  name="otp"
                  component="div"
                  className="error-text"
                />
              </div>

              <Button
                type="primary"
                htmlType="submit"
                className="verify-button"
                loading={loading}
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </Button>
            </Form>
          )}
        </Formik>

        <div className="resend-otp">
          Didn't receive code?{' '}
          <Button
            type="link"
            className="resend-link"
            onClick={() => {
              // Add resend OTP logic here
            }}
          >
            Resend OTP
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPasswordOtp;
