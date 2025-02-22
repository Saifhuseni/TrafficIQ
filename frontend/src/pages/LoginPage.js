import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import authService from '../services/authService';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState('');

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors('');
    try {
      const data = await authService.login(formData);
      login(data.token);
    } catch (err) {
      // Adjust error handling to reflect correct message from server response
      setErrors(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {errors && <div className="error">{errors}</div>}
      <form onSubmit={onSubmit}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
