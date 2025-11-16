import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Login.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Login successful!");
        navigate("/"); // Login ke baad kahin aur le jao (home/dashboard)
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error: Could not connect to server");
    }
  };

  return (
    <div className='addUser'>
      <h3>SIGN IN</h3>
      <form className='addUserForm' onSubmit={handleSubmit}>
        <div className='inputGroup'>
          <label htmlFor='email'>Email:</label>
          <input
            type="email"
            id="email"
            autoComplete="off"
            placeholder='Enter your Email'
            value={form.email}
            onChange={handleChange}
            required
          />

          <label htmlFor='password'>Password:</label>
          <input
            type="password"
            id="password"
            autoComplete="off"
            placeholder='Enter your Password'
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn btn-primary">Login</button>
        </div>
      </form>

      <div className='login'>
        <p>Don't have an account?</p>
        <Link to="/" className="btn btn-success">Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;
