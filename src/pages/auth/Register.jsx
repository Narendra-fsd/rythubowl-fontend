import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../features/auth/authThunks';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'antd';
import Bgimg from '../../assets/bg-img.png';
import './Register.css';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);
  const [loadingState, setLoadingState] = useState(false);

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    password: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    password: Yup.string()
      .min(6, 'Minimum 6 characters')
      .required('Password is required'),
  });

  const handleSubmit = (values) => {
    setLoadingState(true);
    dispatch(registerUser(values))
      .unwrap()
      .then(() => {
        navigate('/otp-verify', {
          state: {
            email: values.email,
            message: 'OTP sent to your email',
          },
        });
      })
      .finally(() => {
        setLoadingState(false);
      });
  };

  return (
    <div className="register-container">
      <Card className="register-card">
        <h2 className="register-title">Create Account</h2>
        <p className="register-subtitle">Join us today</p>

        {error && <div className="error-message">{error}</div>}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="register-form">
              <div className="form-group">
                <label className="form-label">Name</label>
                <Field
                  name="name"
                  className={`form-input ${errors.name && touched.name ? 'error' : ''}`}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="error-text"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <Field
                  name="email"
                  type="email"
                  className={`form-input ${errors.email && touched.email ? 'error' : ''}`}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-text"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone</label>
                <Field
                  name="phone"
                  className={`form-input ${errors.phone && touched.phone ? 'error' : ''}`}
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="error-text"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <Field
                  name="password"
                  type="password"
                  className={`form-input ${errors.password && touched.password ? 'error' : ''}`}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-text"
                />
              </div>

              <Button
                type="primary"
                htmlType="submit"
                className="register-button"
                loading={loadingState}
              >
                {loadingState ? 'Registering...' : 'Register'}
              </Button>
            </Form>
          )}
        </Formik>

        <div className="login-cta">
          <span className="login-text">Already have an account?</span>
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

export default Register;
