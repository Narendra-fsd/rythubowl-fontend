import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../features/auth/authThunks";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPasswordForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, successMessage } = useSelector((state) => state.auth);

  const email = location.state?.email;
  const otp = location.state?.otp;

  if (!email || !otp) {
    navigate("/forgot-password"); // If direct access, redirect back
  }

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
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
        navigate("/login");
      });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-4">
          <div>
            <label>New Password</label>
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
          <div>
            <label>Confirm Password</label>
            <Field
              name="confirmPassword"
              type="password"
              className="w-full border p-2 rounded"
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          {error && <div className="text-red-500">{error}</div>}
          {successMessage && (
            <div className="text-green-500">{successMessage}</div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ResetPasswordForm;
