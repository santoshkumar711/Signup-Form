import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Signup.css";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok) {
        setForm({ name: "", email: "", password: "" }); // reset form
      }
    } catch (err) {
      console.error(err);
      alert("Error: Could not connect to server");
    }
  };

  return (
    <div className='addUser'>
      <h3>Sign Up</h3>
      <form className='addUserForm' onSubmit={handleSubmit}>
        <div className='inputGroup'>
          <label htmlFor='name'>Name:</label>
          <input
            type="text"
            id="name"
            autoComplete="off"
            placeholder='Enter your name'
            value={form.name}
            onChange={handleChange}
            required
          />

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

          <button type="submit" className="btn btn-success">Sign Up</button>
        </div>
      </form>

      <div className='login'>
        <p>Already have an account?</p>
        <Link to="/login" className="btn btn-primary">Login</Link>
      </div>
    </div>
  );
};

export default Signup;
