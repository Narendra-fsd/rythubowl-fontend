// import React from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useLocation } from "react-router-dom";
// import { verifyOtp } from "../../features/auth/authThunks";

// const OtpForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { loading, error } = useSelector((state) => state.auth);

//   const email = location.state?.email || "";

//   const initialValues = { otp: "" };

//   const validationSchema = Yup.object({
//     otp: Yup.string()
//       .required("OTP is required")
//       .length(6, "OTP must be 6 digits")
//       .matches(/^\d+$/, "Must be only numbers")
//   });

//   const handleSubmit = async (values) => {
//     try {
//       const result = await dispatch(verifyOtp({ 
//         email, 
//         otp: values.otp 
//       })).unwrap();
      
//       // Only navigate on successful verification
//       navigate("/login", {
//         state: {
//           verified: true,
//           message: "Email verified successfully!"
//         }
//       });
//     } catch (error) {
//       // Error is already displayed from authSlice
//       // Don't redirect - let user try again
//       console.error("Verification failed:", error);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
//       <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
      
//       {/* Show any API errors */}
//       {error && (
//         <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
//           {error.message || "OTP verification failed"}
//         </div>
//       )}

//       <p className="mb-4 text-sm text-gray-600">
//         Enter the 6-digit code sent to <strong>{email}</strong>
//       </p>

//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         <Form className="space-y-4">
//           <div>
//             <label className="block">Verification Code</label>
//             <Field 
//               name="otp" 
//               type="text"
//               inputMode="numeric"
//               className="w-full border p-2 rounded"
//               placeholder="123456"
//             />
//             <ErrorMessage 
//               name="otp" 
//               component="div" 
//               className="text-red-500 text-sm" 
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//           >
//             {loading ? "Verifying..." : "Verify OTP"}
//           </button>
//         </Form>
//       </Formik>

//       <div className="mt-4 text-center text-sm">
//         Didn't receive code?{" "}
//         <button 
//           type="button" 
//           className="text-blue-600 hover:underline"
//           onClick={() => {
//             // Add resend OTP logic here
//           }}
//         >
//           Resend OTP
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OtpForm;