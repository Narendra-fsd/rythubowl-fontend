// import React from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useDispatch, useSelector } from "react-redux";
// import { verifyForgotPasswordOtp } from "../../features/auth/authThunks";
// import { useNavigate, useLocation } from "react-router-dom";

// const ForgotPasswordOtpForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { loading, error, successMessage } = useSelector((state) => state.auth);

//   const email = location.state?.email || "";

//   const initialValues = { email, otp: "" };
//   const validationSchema = Yup.object({
//     otp: Yup.string()
//       .length(6, "OTP must be 6 digits")
//       .required("OTP is required"),
//   });

//   const handleSubmit = (values) => {
//     dispatch(verifyForgotPasswordOtp(values))
//       .unwrap()
//       .then(() => {
//         navigate("/reset-password", { state: { email: values.email } });
//       });
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
//       <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
//       <p className="mb-4 text-gray-600">OTP sent to: <strong>{email}</strong></p>

//       <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
//         <Form className="space-y-4">
//           <div>
//             <label>OTP</label>
//             <Field name="otp" type="text" className="w-full border p-2 rounded" />
//             <ErrorMessage name="otp" component="div" className="text-red-500 text-sm" />
//           </div>
//           {error && <div className="text-red-500">{error}</div>}
//           {successMessage && <div className="text-green-500">{successMessage}</div>}
//           <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded">
//             {loading ? "Verifying..." : "Verify OTP"}
//           </button>
//         </Form>
//       </Formik>
//     </div>
//   );
// };

// export default ForgotPasswordOtpForm;
