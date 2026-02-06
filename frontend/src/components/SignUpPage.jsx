// import React, { useState} from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from 'axios';
// import bg from '../assets/bg.png';

// const SignUpPage = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     otp: ""
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [otpLoading, setOtpLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [id]: value,
//     }));
//   };

//   const handleRequestOTP = async (e) => {
//     e.preventDefault();
//     setError("");
//     setOtpLoading(true);

//     if (!formData.email) {
//       setError("Email is required to request OTP");
//       setOtpLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/sendotp`,
//         { email: formData.email },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data.success) {
//         setSuccess("OTP sent successfully to your email");
//         setOtpSent(true);
//       } else {
//         setError(response.data.message || "Failed to send OTP");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to send OTP. Please try again.");
//     } finally {
//       setOtpLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     setLoading(true);

//     if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.otp) {
//       setError("All fields are required.");
//       setLoading(false);
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, formData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.status === 200 && response.data.success) {
//         setSuccess("Registration successful! Redirecting to login...");
//         localStorage.setItem("authToken", response.data.token);
//         setTimeout(() => {
//           navigate("/login");
//         }, 2000);
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "An error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const styles = {
//     body: {
//       margin: 0,
//       fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
//       backgroundImage: `url(${bg})`,
//       backgroundSize: 'cover',
//       backgroundPosition: 'center',
//       backgroundRepeat: 'no-repeat',
//       backgroundAttachment: 'fixed',
//       color: '#fff',
//       minHeight: '100vh',
//       position: 'relative'
//     },
//     overlay: {
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       backgroundColor: 'rgba(0, 0, 0, 0.6)',
//       zIndex: 1
//     },
//     signupContainer: {
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       minHeight: '100vh',
//       position: 'relative',
//       zIndex: 2,
//       // padding: '0'
//     },
//     signupForm: {
//       width: '100%',
//       maxWidth: '420px',
//       background: 'rgba(255, 255, 255, 0.95)',
//       paddingRight: '2rem',
//       paddingLeft: '2rem',
//       paddingTop: '1rem',
//       paddingBottom: '2rem',
//       borderRadius: '20px',
//       boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
//       color: '#2e670fff',
//       textAlign: 'center',
//       position: 'relative',
//       zIndex: 3,
//       backdropFilter: 'blur(10px)',
//       border: '1px solid rgba(255, 255, 255, 0.2)'
//     },
//     signupTitle: {
//       marginBottom: '0.5rem',
//       background: 'linear-gradient(135deg, #667eea, #764ba2)',
//       backgroundClip: 'text',
//       WebkitBackgroundClip: 'text',
//       WebkitTextFillColor: 'transparent',
//       fontSize: '2rem',
//       fontWeight: '700'
//     },
//     formGroup: {
//       marginBottom: '0.5rem',
//       textAlign: 'left'
//     },
//     formLabel: {
//       display: 'block',
//       marginBottom: '0.5rem',
//       fontSize: '0.9rem',
//       fontWeight: '600',
//       color: '#374151'
//     },
//     formInput: {
//       width: '100%',
//       padding: '0.875rem',
//       borderRadius: '12px',
//       border: '2px solid #e5e7eb',
//       fontSize: '1rem',
//       transition: 'all 0.3s ease',
//       fontFamily: 'inherit',
//       boxSizing: 'border-box'
//     },
//     formInputDisabled: {
//       backgroundColor: '#f3f4f6',
//       color: '#6b7280',
//       cursor: 'not-allowed'
//     },
//     emailGroup: {
//       display: 'flex',
//       gap: '0.75rem',
//       alignItems: 'center'
//     },
//     emailGroupInput: {
//       flex: 1
//     },
//     otpButton: {
//       background: 'linear-gradient(135deg, #667eea, #764ba2)',
//       color: 'white',
//       border: 'none',
//       borderRadius: '12px',
//       padding: '0.875rem 1.25rem',
//       cursor: 'pointer',
//       fontSize: '0.9rem',
//       fontWeight: '600',
//       transition: 'all 0.3s ease',
//       whiteSpace: 'nowrap'
//     },
//     otpButtonDisabled: {
//       opacity: 0.6,
//       cursor: 'not-allowed',
//       transform: 'none'
//     },
//     signupButton: {
//       width: '100%',
//       padding: '0.875rem',
//       background: 'linear-gradient(135deg, #667eea, #764ba2)',
//       border: 'none',
//       borderRadius: '12px',
//       color: '#fff',
//       fontSize: '1.1rem',
//       fontWeight: '600',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       marginTop: '0.5rem'
//     },
//     signupButtonDisabled: {
//       opacity: 0.6,
//       cursor: 'not-allowed',
//       transform: 'none'
//     },
//     errorMessage: {
//       color: '#ef4444',
//       marginTop: '1rem',
//       textAlign: 'center',
//       fontSize: '0.9rem',
//       padding: '0.5rem',
//       backgroundColor: 'rgba(239, 68, 68, 0.1)',
//       borderRadius: '8px',
//       border: '1px solid rgba(239, 68, 68, 0.2)'
//     },
//     successMessage: {
//       color: '#10b981',
//       marginTop: '1rem',
//       textAlign: 'center',
//       fontSize: '0.9rem',
//       padding: '0.5rem',
//       backgroundColor: 'rgba(16, 185, 129, 0.1)',
//       borderRadius: '8px',
//       border: '1px solid rgba(16, 185, 129, 0.2)'
//     },
//     loginText: {
//       marginTop: '2rem',
//       fontSize: '0.9rem',
//       color: '#6b7280'
//     },
//     loginLink: {
//       color: '#667eea',
//       textDecoration: 'none',
//       fontWeight: '600',
//       transition: 'color 0.3s ease'
//     }
//   };

//   return (
//     <div style={styles.body}>
//       <div style={styles.overlay}></div>
//       <div style={styles.signupContainer}>
//         <div style={styles.signupForm}>
//           <h2 style={styles.signupTitle}>Create Account</h2>

//           <form onSubmit={handleSubmit}>
//             <div style={styles.formGroup}>
//               <label htmlFor="name" style={styles.formLabel}>
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 placeholder="Enter your full name"
//                 style={styles.formInput}
//                 value={formData.name}
//                 onChange={handleChange}
//                 onFocus={(e) => {
//                   e.target.style.outline = 'none';
//                   e.target.style.borderColor = '#667eea';
//                   e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
//                 }}
//                 onBlur={(e) => {
//                   e.target.style.borderColor = '#e5e7eb';
//                   e.target.style.boxShadow = 'none';
//                 }}
//               />
//             </div>

//             <div style={styles.formGroup}>
//               <label htmlFor="email" style={styles.formLabel}>
//                 Email Address
//               </label>
//               <div style={styles.emailGroup}>
//                 <input
//                   type="email"
//                   id="email"
//                   placeholder="Enter your email"
//                   style={{
//                     ...styles.formInput,
//                     ...styles.emailGroupInput,
//                     ...(otpSent ? styles.formInputDisabled : {})
//                   }}
//                   value={formData.email}
//                   onChange={handleChange}
//                   disabled={otpSent}
//                   onFocus={(e) => {
//                     if (!otpSent) {
//                       e.target.style.outline = 'none';
//                       e.target.style.borderColor = '#667eea';
//                       e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
//                     }
//                   }}
//                   onBlur={(e) => {
//                     if (!otpSent) {
//                       e.target.style.borderColor = '#e5e7eb';
//                       e.target.style.boxShadow = 'none';
//                     }
//                   }}
//                 />
//                 {!otpSent && (
//                   <button
//                     type="button"
//                     onClick={handleRequestOTP}
//                     style={{
//                       ...styles.otpButton,
//                       ...(otpLoading ? styles.otpButtonDisabled : {})
//                     }}
//                     disabled={otpLoading}
//                     onMouseEnter={(e) => {
//                       if (!otpLoading) {
//                         e.target.style.transform = 'translateY(-2px)';
//                         e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
//                       }
//                     }}
//                     onMouseLeave={(e) => {
//                       if (!otpLoading) {
//                         e.target.style.transform = 'translateY(0)';
//                         e.target.style.boxShadow = 'none';
//                       }
//                     }}
//                   >
//                     {otpLoading ? "Sending..." : "Get OTP"}
//                   </button>
//                 )}
//               </div>
//             </div>

//             {otpSent && (
//               <div style={styles.formGroup}>
//                 <label htmlFor="otp" style={styles.formLabel}>
//                   OTP Verification
//                 </label>
//                 <input 
//                   type="text"
//                   id="otp"
//                   placeholder="Enter the OTP sent to your email"
//                   style={styles.formInput}
//                   value={formData.otp}
//                   onChange={handleChange}
//                   onFocus={(e) => {
//                     e.target.style.outline = 'none';
//                     e.target.style.borderColor = '#667eea';
//                     e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
//                   }}
//                   onBlur={(e) => {
//                     e.target.style.borderColor = '#e5e7eb';
//                     e.target.style.boxShadow = 'none';
//                   }}
//                 />
//               </div>
//             )}

//             <div style={styles.formGroup}>
//               <label htmlFor="password" style={styles.formLabel}>
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 placeholder="Create a password"
//                 style={styles.formInput}
//                 value={formData.password}
//                 onChange={handleChange}
//                 onFocus={(e) => {
//                   e.target.style.outline = 'none';
//                   e.target.style.borderColor = '#667eea';
//                   e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
//                 }}
//                 onBlur={(e) => {
//                   e.target.style.borderColor = '#e5e7eb';
//                   e.target.style.boxShadow = 'none';
//                 }}
//               />
//             </div>

//             <div style={styles.formGroup}>
//               <label htmlFor="confirmPassword" style={styles.formLabel}>
//                 Confirm Password
//               </label>
//               <input
//                 type="password"
//                 id="confirmPassword"
//                 placeholder="Confirm your password"
//                 style={styles.formInput}
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 onFocus={(e) => {
//                   e.target.style.outline = 'none';
//                   e.target.style.borderColor = '#667eea';
//                   e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
//                 }}
//                 onBlur={(e) => {
//                   e.target.style.borderColor = '#e5e7eb';
//                   e.target.style.boxShadow = 'none';
//                 }}
//               />
//             </div>

//             <button
//               type="submit"
//               style={{
//                 ...styles.signupButton,
//                 ...((loading || !otpSent) ? styles.signupButtonDisabled : {})
//               }}
//               disabled={loading || !otpSent}
//               onMouseEnter={(e) => {
//                 if (!loading && otpSent) {
//                   e.target.style.transform = 'translateY(-2px)';
//                   e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 if (!loading && otpSent) {
//                   e.target.style.transform = 'translateY(0)';
//                   e.target.style.boxShadow = 'none';
//                 }
//               }}
//             >
//               {loading ? "Creating Account..." : "Create Account"}
//             </button>
//           </form>

//           {error && <p style={styles.errorMessage}>{error}</p>}
//           {success && <p style={styles.successMessage}>{success}</p>}

//           <p style={styles.loginText}>
//             Already have an account?{" "}
//             <Link 
//               to="/login" 
//               style={styles.loginLink}
//               onMouseEnter={(e) => {
//                 e.target.style.color = '#764ba2';
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.color = '#667eea';
//               }}
//             >
//               Sign In
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUpPage;


import React, { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "../style/SignUpPage.css";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setError("");
    setOtpLoading(true);

    if (!formData.email) {
      setError("Email is required to request OTP");
      setOtpLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/sendotp`,
        { email: formData.email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setSuccess("OTP sent successfully to your email");
        setOtpSent(true);
      } else {
        setError(response.data.message || "Failed to send OTP");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.otp) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 && response.data.success) {
        setSuccess("Registration successful! Redirecting to login...");
        localStorage.setItem("authToken", response.data.token);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2 className="signup-title">Create Account</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your full name"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <div className="email-group">
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                disabled={otpSent}
              />
              {!otpSent && (
                <button
                  type="button"
                  onClick={handleRequestOTP}
                  className="otp-button"
                  disabled={otpLoading}>
                    {otpLoading ? "Sending..." : "Get OTP"}
                  </button>
              )}
            </div>
          </div>

          {otpSent && (
            <div className="form-group">
              <label htmlFor="otp" className="form-label">
                OTP Verification
              </label>
              <input 
                type="text"
                id="otp"
                placeholder="Enter the OTP sent to your email"
                className="form-input"
                value={formData.otp}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Create a password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              className="form-input"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="signup-button"
            disabled={loading || !otpSent}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <p className="login-text">
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;