// import { useState } from "react";
// import './Register.css';

// import { useNavigate } from "react-router-dom";
// import api from "../services/api";

// function Register() {
//   const [form, setForm] = useState({
//     username: "",
//     email: "",
//     password: ""
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await api.post("/auth/register", form);
//     navigate("/login");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Register</h2>

//       <input name="username" placeholder="Username" onChange={handleChange} />
//       <input name="email" placeholder="Email" onChange={handleChange} />
//       <input name="password" type="password" placeholder="Password" onChange={handleChange} />

//       <button>Register</button>
//     </form>
//   );
// }

// export default Register;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import './Register.css';

function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.username.trim()) newErrors.username = "Username is required";
    if (!form.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email is invalid";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await api.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setApiError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="form-container">
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <input name="username" placeholder="Username" onChange={handleChange} />
      {errors.username && <small className="error">{errors.username}</small>}

      <input name="email" placeholder="Email" onChange={handleChange} />
      {errors.email && <small className="error">{errors.email}</small>}

      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      {errors.password && <small className="error">{errors.password}</small>}

      {apiError && <small className="error">{apiError}</small>}

      <button type="submit">Register</button>
    </form></div>
  );
}

export default Register;
