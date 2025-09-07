import React, { useState } from 'react';

// NOTE: This is a client-side only authentication mechanism for demonstration purposes.
// In a real-world application, credentials should NEVER be hardcoded in the frontend.
// Authentication should be handled by a secure backend server.

const ADMIN_USERNAME = 'titustroke';
const ADMIN_PASSWORD = 'admintroke';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate network delay
    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        onLoginSuccess();
      } else {
        setError('Invalid username or password.');
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/1920/1080?random=2&grayscale&blur=2')" }}>
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 w-full max-w-sm mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold tracking-wider text-cyan-400 mb-4">TROKE STUDIOS</h1>
        <div className="bg-slate-900/80 backdrop-blur-sm p-8 rounded-lg shadow-2xl">
          <h2 className="text-2xl font-semibold text-white mb-6">Admin Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 text-left">
              <label htmlFor="username" className="block text-slate-400 mb-2">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>
            <div className="mb-4 text-left">
              <label htmlFor="password" className="block text-slate-400 mb-2">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
            </div>
            
            {error && <p className="text-red-400 mt-4 text-center">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="mt-6 w-full bg-cyan-500 text-slate-900 font-bold py-3 rounded-md text-lg hover:bg-cyan-400 transition-colors duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Logging In...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;