import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../features/auth/authThunks";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, successMessage } = useSelector((state) => state.auth);

  const email = location.state?.email;
  const otp = location.state?.otp;

  if (!email || !otp) {
    navigate("/forgot-password"); // If direct access, redirect back
    return null; // Return early to prevent rendering
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
        navigate("/login", {
          state: { 
            success: true,
            message: "Password reset successfully!" 
          }
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-4">
            <div>
              <label className="block">New Password</label>
              <Field
                name="password"
                type="password"
                className="w-full border p-2 rounded"
                placeholder="Enter new password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            
            <div>
              <label className="block">Confirm Password</label>
              <Field
                name="confirmPassword"
                type="password"
                className="w-full border p-2 rounded"
                placeholder="Confirm new password"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            
            {error && (
              <div className="p-2 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}
            
            {successMessage && (
              <div className="p-2 bg-green-100 text-green-700 rounded">
                {successMessage}
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ResetPassword;