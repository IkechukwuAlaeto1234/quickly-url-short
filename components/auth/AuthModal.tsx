import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { User } from '../../types';
import { CloseIcon } from '../icons/CloseIcon';
import { GoogleIcon } from '../icons/GoogleIcon';

interface AuthModalProps {
  onClose: () => void;
  onLogin: (email: string, password: string) => Promise<User>;
  onRegister: (email: string, password: string) => Promise<User>;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLogin, onRegister }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('register');

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in"
        aria-modal="true"
        role="dialog"
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
            <CloseIcon className="w-6 h-6" />
            <span className="sr-only">Close modal</span>
        </button>

        <div className="p-8">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900">
                    {activeTab === 'register' ? 'Create Your Account' : 'Welcome Back!'}
                </h2>
                <p className="text-slate-500 mt-2">
                    Create an account to save and manage your link history.
                </p>
            </div>
          
            <div className="flex border-b border-slate-200 mb-6">
                <button
                    onClick={() => setActiveTab('register')}
                    className={`flex-1 py-3 text-sm font-bold transition-colors ${activeTab === 'register' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
                >
                    Sign Up
                </button>
                <button
                    onClick={() => setActiveTab('login')}
                    className={`flex-1 py-3 text-sm font-bold transition-colors ${activeTab === 'login' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
                >
                    Login
                </button>
            </div>

            {activeTab === 'register' ? <RegisterForm onRegister={onRegister} /> : <LoginForm onLogin={onLogin} />}
            
            <div className="flex items-center my-6">
                <hr className="flex-grow border-slate-200" />
                <span className="px-3 text-slate-400 text-sm">OR</span>
                <hr className="flex-grow border-slate-200" />
            </div>

            <button
                onClick={() => alert("Google Auth not implemented yet.")}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-md border-2 border-slate-200 hover:bg-slate-50 transition-colors"
            >
                <GoogleIcon />
                <span className="font-bold text-slate-700">Continue with Google</span>
            </button>
        </div>
      </div>
    </div>
  );
};
