
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import './Login.css';

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    try {
      // eslint-disable-next-line no-console
      console.log("Login payload:", form);
      const res = await api.post("/auth/login", form);
      // eslint-disable-next-line no-console
      console.log("Login success response:", res.data);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Login error status:", err.response?.status);
      // eslint-disable-next-line no-console
      console.error("Login error data:", JSON.stringify(err.response?.data, null, 2));
      setError(err.response?.data?.message || `Login failed (${err.response?.status})`);
    }
  };

  return (
    <div className="form-container">
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <input name="email" placeholder="Email" onChange={handleChange} />
      <input
        name="password"
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        onChange={handleChange}
      />
      <small className="toggle" onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? "Hide" : "Show"} Password
      </small>

      {error && <small className="error">{error}</small>}

      <button type="submit">Login</button>
    </form></div>
  );
}

export default Login;
