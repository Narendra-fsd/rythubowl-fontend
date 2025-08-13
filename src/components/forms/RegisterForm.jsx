import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../features/auth/authThunks';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
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
          message: "OTP sent to your email" 
        },
      });
    })
    .finally(() => {
      setLoadingState(false);
    });
};

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-4">
          <div>
            <label className="block">Name</label>
            <Field name="name" className="w-full border p-2 rounded" />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div>
            <label className="block">Email</label>
            <Field
              name="email"
              type="email"
              className="w-full border p-2 rounded"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div>
            <label className="block">Phone</label>
            <Field name="phone" className="w-full border p-2 rounded" />
            <ErrorMessage
              name="phone"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div>
            <label className="block">Password</label>
            <Field
              name="password"
              type="password"
              className="w-full border p-2 rounded"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            disabled={loadingState}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            {loadingState ? 'Registering...' : 'Register'}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterForm;
