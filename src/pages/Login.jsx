
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
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
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
