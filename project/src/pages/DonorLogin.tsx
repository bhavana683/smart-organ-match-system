import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/auth.css";

const DonorLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await axios.post(
        "https://smart-organ-match-system.onrender.com/api/auth/donor/login",
        formData
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/donor-dashboard");
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Donor Login</h1>
          <p>Access your donor dashboard</p>
        </div>
<p className="text-center mt-3 text-gray-600">
  ← 
  <span
    className="text-blue-600 font-semibold cursor-pointer hover:underline ml-1"
    onClick={() => navigate("/")}
  >
    Back to Home
  </span>
</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="auth-input"
            required
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="auth-input"
            required
            onChange={handleChange}
          />

          <div className="forgot-password">
            <span>Forgot password?</span>
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="auth-footer">
          Already registered as Recipient?{" "}
          <Link to="/recipient-login">Login here</Link>
        </div>

        <div className="auth-footer">
          New Donor? <Link to="/donor-register">Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default DonorLogin;
