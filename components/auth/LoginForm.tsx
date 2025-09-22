import React, { useState } from 'react';
import { User } from '../../types';
import { SpinnerIcon } from '../icons/SpinnerIcon';

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<User>;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await onLogin(email, password);
      // Success will be handled by parent component closing the modal
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="login-email" className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="test@user.com"
          required
          className="w-full px-4 py-2 rounded-md bg-slate-100 border-2 border-transparent focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring-2 transition-colors"
        />
      </div>
      <div>
        <label htmlFor="login-password" className="block text-sm font-bold text-slate-700 mb-1">Password</label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          required
          className="w-full px-4 py-2 rounded-md bg-slate-100 border-2 border-transparent focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring-2 transition-colors"
        />
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white font-bold px-6 py-3 rounded-md hover:bg-blue-700 transition-all duration-200 flex items-center justify-center disabled:bg-blue-400 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <SpinnerIcon className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
            Logging in...
          </>
        ) : (
          'Login'
        )}
      </button>
    </form>
  );
};