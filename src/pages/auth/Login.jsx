import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthLogo } from "../../components/AuthLogo";
import { AuthWaves } from "../../components/AuthWaves";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/auth-new.css";
import api from "../../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail");
    const savedPassword = localStorage.getItem("rememberPassword");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
    if (savedPassword) {
      setPassword(savedPassword);
    }
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Enter a valid email address";
    }
    if (!password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const handleLogin = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      let res;
      if (email === "superadmin@gmail.com") {
        res = await api.auth.superAdminLogin({ email, password });
      } else {
        res = await api.auth.login({ email, password });
      }

      if (res?.token) {
        localStorage.setItem("authToken", res.token);
        localStorage.setItem("role", res.role);
        localStorage.setItem("name", res.name);

        if (rememberMe) {
          localStorage.setItem("rememberEmail", email);
          localStorage.setItem("rememberPassword", password);
        } else {
          localStorage.removeItem("rememberEmail");
          localStorage.removeItem("rememberPassword");
        }

        toast.success("Login successful!", { position: "top-center", autoClose: 1000 });
        setFieldErrors({});

        switch (res.role) {
          case "SuperAdmin":
            navigate("/super-admin-dashboard");
            break;
          case "Admin":
            navigate("/admin-dashboard");
            break;
          case "Doctor":
            navigate("/doctor-dashboard");
            break;
          case "Receptionist":
            navigate("/receptionist-dashboard");
            break;
          case "Patient":
            navigate("/patient-dashboard");
            break;
          default:
            toast.error("Unknown role. Contact support.", { position: "top-center", autoClose: 2000 });
        }
      } else {
        setFieldErrors({ password: res?.message || "Login failed. Try again." });
        toast.error(res?.message || "Login failed. Try again.", { position: "top-center", autoClose: 1000 });
      }
    } catch (err) {
      setFieldErrors({ password: err.message || "Login failed. Try again." });
      toast.error(err.message || "Login failed. Try again.", { position: "top-center", autoClose: 1000 });
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <div className="auth-hero">
          <div className="auth-hero-base" />
          <div className="auth-hero-inner">
            <div className="auth-welcome">
              Welcome to
              <br />
              Your Clinic
            </div>
            <div className="auth-brand">
              <AuthLogo />
              <div className="auth-brand-copy">
                <h1>Clinical</h1>
                <h2>Management System</h2>
              </div>
            </div>
            <AuthWaves />
          </div>
        </div>

        <div className="auth-panel">
          <div className="auth-form-card auth-form-card-login">
            <div className="auth-form-header">
              <h2>CMS Login</h2>
              <p>Access the CMS panel to manage users, roles, and system settings.</p>
            </div>

            <div className="auth-form-grid">
              <div className="auth-form-group">
                <label>Email</label>
                <input
                  type="email"
                  className={fieldErrors.email ? "auth-input-error" : ""}
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setFieldErrors((prev) => ({ ...prev, email: "" }));
                  }}
                />
                {fieldErrors.email && <div className="auth-field-error">{fieldErrors.email}</div>}
              </div>

              <div className="auth-form-group">
                <label>Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className={fieldErrors.password ? "auth-input-error" : ""}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setFieldErrors((prev) => ({ ...prev, password: "" }));
                  }}
                  style={{ paddingRight: 40 }}
                />
                <span className="auth-password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
                {fieldErrors.password && <div className="auth-field-error">{fieldErrors.password}</div>}
              </div>
            </div>

            <div className="auth-form-options">
              <label className="auth-check">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <span className="auth-link" onClick={() => navigate("/forgot-password")}>
                Forgot Password?
              </span>
            </div>

            <button className="auth-btn" onClick={handleLogin}>Login</button>

            <div className="auth-bottom-text">
              Not registered yet?
              <span onClick={() => navigate("/register")}> Create an Account</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
