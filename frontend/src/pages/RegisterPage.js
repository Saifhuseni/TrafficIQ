import React, { useState } from 'react';
import authService from '../services/authService';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
    gender: 'Other',
    contact: '',
    bio: '',
    age: '',
  });
  const [errors, setErrors] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors('');
    setSuccessMessage('');
    try {
      await authService.register(formData);
      setSuccessMessage('Registration successful. Please log in.');
    } catch (err) {
      // Ensure error message is correctly extracted
      setErrors(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {errors && <div className="error">{errors}</div>}
      {successMessage && <div className="success">{successMessage}</div>}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={onChange}
          required
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={onChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={onChange}
          required
        />
        <input
          type="text"
          placeholder="Full Name"
          name="name"
          value={formData.name}
          onChange={onChange}
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={onChange}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="text"
          placeholder="Contact"
          name="contact"
          value={formData.contact}
          onChange={onChange}
        />
        <textarea
          placeholder="Bio"
          name="bio"
          value={formData.bio}
          onChange={onChange}
        />
        <input
          type="number"
          placeholder="Age"
          name="age"
          value={formData.age}
          onChange={onChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
