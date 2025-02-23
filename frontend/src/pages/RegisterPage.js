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
      setErrors(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen w-screen bg-slate-900 flex flex-col justify-center items-center pt-16 p-4"> {/* Added pt-16 */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">
          Traffic<span className="text-blue-400">IQ</span>
          <span className="text-blue-400">.</span>
        </h1>
        <p className="text-slate-400">Create a new account</p>
      </div>

      <div className="w-full max-w-md bg-slate-800 rounded-lg shadow-xl p-8">
        {errors && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500 rounded-lg flex items-center text-red-500">
            <span>{errors}</span>
          </div>
        )}
        {successMessage && (
          <div className="mb-4 p-4 bg-green-500/10 border border-green-500 rounded-lg flex items-center text-green-500">
            <span>{successMessage}</span>
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={onChange}
              required
              className="w-full py-2 px-4 border border-slate-600 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={onChange}
              required
              className="w-full py-2 px-4 border border-slate-600 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={onChange}
              required
              className="w-full py-2 px-4 border border-slate-600 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              value={formData.name}
              onChange={onChange}
              className="w-full py-2 px-4 border border-slate-600 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <select
              name="gender"
              value={formData.gender}
              onChange={onChange}
              className="w-full py-2 px-4 border border-slate-600 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              placeholder="Contact"
              name="contact"
              value={formData.contact}
              onChange={onChange}
              className="w-full py-2 px-4 border border-slate-600 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <textarea
              placeholder="Bio"
              name="bio"
              value={formData.bio}
              onChange={onChange}
              className="w-full py-2 px-4 border border-slate-600 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Age"
              name="age"
              value={formData.age}
              onChange={onChange}
              required
              className="w-full py-2 px-4 border border-slate-600 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
