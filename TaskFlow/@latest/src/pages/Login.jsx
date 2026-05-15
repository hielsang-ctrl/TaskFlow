import { useState, useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  // Already logged in — go straight to home
  if (user) return <Navigate to="/" replace />;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { setError('All fields are required.'); return; }
    setUser({ email: form.email });
    navigate('/dashboard');
  };

  return (
    <div className="w-full max-w-sm mx-auto px-4 pt-20">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col gap-6">

        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-blue-500 mb-4">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900">Sign in to TaskFlow</h1>
          <p className="text-xs text-gray-500 mt-1">Welcome back — let's get things done</p>
        </div>

        {/* Mode Toggle */}
        <div className="flex bg-gray-100 rounded-xl p-1">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(''); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all duration-200 ${
              mode === 'login'
                ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-md'
                : 'text-gray-500 hover:bg-white hover:text-green-600 hover:shadow-sm'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setError(''); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all duration-200 ${
              mode === 'signup'
                ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-md'
                : 'text-gray-500 hover:bg-white hover:text-blue-600 hover:shadow-sm'
            }`}
          >
            Sign Up
          </button>
        </div>

        {error && <p className="text-xs text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600">Email</label>
            <input
              name="email" type="email" value={form.email} onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600">Password</label>
            <input
              name="password" type="password" value={form.password} onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md"
          >
            {mode === 'login' ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <p className="text-xs text-center text-gray-500">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); }}
            className="text-green-600 hover:text-green-800 font-semibold"
          >
            {mode === 'login' ? 'Sign Up' : 'Log In'}
          </button>
        </p>

      </div>
    </div>
  );
};

export default Login;
