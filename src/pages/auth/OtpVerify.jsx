import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyOtp } from '../../features/auth/authThunks';
import { Card, Button, Alert } from 'antd';
import Bgimg from '../../assets/bg-img.png';
import './OtpVerify.css';

const OtpVerify = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error } = useSelector((state) => state.auth);

  const email = location.state?.email || '';

  const initialValues = { otp: '' };

  const validationSchema = Yup.object({
    otp: Yup.string()
      .required('OTP is required')
      .length(6, 'OTP must be 6 digits')
      .matches(/^\d+$/, 'Must be only numbers'),
  });

  const handleSubmit = async (values) => {
    try {
      const result = await dispatch(
        verifyOtp({
          email,
          otp: values.otp,
        })
      ).unwrap();

      navigate('/login', {
        state: {
          verified: true,
          message: 'Email verified successfully!',
        },
      });
    } catch (error) {
      console.error('Verification failed:', error);
    }
  };

  return (
    <div className="otp-verify-container">
      <Card className="otp-verify-card">
        <h2 className="otp-verify-title">Verify Your Email</h2>
        <p className="otp-verify-subtitle">
          Enter the 6-digit code sent to{' '}
          <span className="email-highlight">{email}</span>
        </p>

        {error && (
          <Alert
            message={error.message || 'OTP verification failed'}
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
            <Form className="otp-verify-form">
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

export default OtpVerify;
