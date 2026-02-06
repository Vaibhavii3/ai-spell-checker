// import React, { useState} from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from 'axios';
// import bg from '../assets/bg.png';

// const LoginPage = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [id]: value,
//     }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, formData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       localStorage.setItem("authToken", response.data.token);
//       navigate("/text");
//     } catch (err) {
//       setError(err.response?.data?.message || "Invalid login credentials");
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
//     loginContainer: {
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       minHeight: '100vh',
//       position: 'relative',
//       zIndex: 2
//     },
//     loginForm: {
//       width: '100%',
//       maxWidth: '400px',
//       background: 'rgba(255, 255, 255, 0.95)',
//       padding: '2.5rem',
//       borderRadius: '20px',
//       boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
//       color: '#1f2937',
//       textAlign: 'center',
//       position: 'relative',
//       zIndex: 3,
//       backdropFilter: 'blur(10px)',
//       border: '1px solid rgba(255, 255, 255, 0.2)'
//     },
//     loginTitle: {
//       marginBottom: '2rem',
//       background: 'linear-gradient(135deg, #667eea, #764ba2)',
//       backgroundClip: 'text',
//       WebkitBackgroundClip: 'text',
//       WebkitTextFillColor: 'transparent',
//       fontSize: '2rem',
//       fontWeight: '700'
//     },
//     formGroup: {
//       marginBottom: '1.5rem',
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
//     loginButton: {
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
//     loginButtonDisabled: {
//       opacity: 0.7,
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
//     signupText: {
//       marginTop: '2rem',
//       fontSize: '0.9rem',
//       color: '#6b7280'
//     },
//     signupLink: {
//       color: '#667eea',
//       textDecoration: 'none',
//       fontWeight: '600',
//       transition: 'color 0.3s ease'
//     }
//   };

//   return (
//     <div style={styles.body}>
//       <div style={styles.overlay}></div>
//       <div style={styles.loginContainer}>
//         <div style={styles.loginForm}>
//           <h2 style={styles.loginTitle}>Welcome Back</h2>
//           <form onSubmit={handleSubmit}>
//             <div style={styles.formGroup}>
//               <label htmlFor="email" style={styles.formLabel}>
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 placeholder="Enter your email"
//                 aria-required="true"
//                 style={styles.formInput}
//                 value={formData.email}
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
//               <label htmlFor="password" style={styles.formLabel}>
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 placeholder="Enter your password"
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

//             <button
//               type="submit"
//               style={{
//                 ...styles.loginButton,
//                 ...(loading ? styles.loginButtonDisabled : {})
//               }}
//               disabled={loading}
//               onMouseEnter={(e) => {
//                 if (!loading) {
//                   e.target.style.transform = 'translateY(-2px)';
//                   e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 if (!loading) {
//                   e.target.style.transform = 'translateY(0)';
//                   e.target.style.boxShadow = 'none';
//                 }
//               }}
//             >
//               {loading ? "Signing In..." : "Sign In"}
//             </button>
//           </form>

//           {error && <p style={styles.errorMessage}>{error}</p>}
          
//           <p style={styles.signupText}>
//             Don't have an account?{" "}
//             <Link 
//               to="/signup" 
//               style={styles.signupLink}
//               onMouseEnter={(e) => {
//                 e.target.style.color = '#764ba2';
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.color = '#667eea';
//               }}
//             >
//               Create Account
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;



import React, { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "../style/LoginPage.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      localStorage.setItem("authToken", response.data.token);
      navigate("/text");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid login credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              aria-required="true"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}
        
        <p className="signup-text">
          Don't have an account?{" "}
          <Link to="/signup" className="signup-link">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;