import React, { useState } from 'react';
import { User } from '../types';
import { storage } from '../utils/storage';
import { LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) return;

    setIsLoggingIn(true);

    // Simulate login process
    setTimeout(() => {
      const user: User = {
        id: Date.now().toString(),
        email,
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        createdAt: new Date().toISOString()
      };

      storage.saveUser(user);
      setShowSuccess(true);

      setTimeout(() => {
        onLogin(user);
      }, 1500);
    }, 1000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 animate-gradient-xy"></div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-white/10 rounded-full animate-float delay-0"></div>
        <div className="absolute top-3/4 right-1/4 w-32 h-32 bg-white/10 rounded-full animate-float delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-white/10 rounded-full animate-float delay-2000"></div>
      </div>

      {/* Login Container */}
      <div className="relative w-full max-w-md mx-4">
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 transform hover:scale-[1.02] transition-all duration-300 border border-white/20">
          
          {/* Success Message */}
          {showSuccess && (
            <div className="mb-6 p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl text-center animate-slideDown">
              🎉 Welcome to Event Ease! Login successful!
            </div>
          )}

          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2 animate-pulse">
              Event Ease
            </h1>
            <p className="text-gray-600 text-sm italic">Seamless Events, Effortless Management</p>
          </div>

          {!showSuccess && (
            <>
              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-600 transition-colors" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email"
                      className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:outline-none transition-all duration-300 bg-white/80 hover:bg-white focus:bg-white focus:transform focus:scale-[1.02]"
                    />
                    <label className="absolute -top-2 left-3 bg-white px-2 text-sm text-gray-600 group-focus-within:text-purple-600 transition-colors">
                      Email Address
                    </label>
                  </div>

                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-purple-600 transition-colors" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter your password"
                      className="w-full pl-11 pr-11 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:outline-none transition-all duration-300 bg-white/80 hover:bg-white focus:bg-white focus:transform focus:scale-[1.02]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                    <label className="absolute -top-2 left-3 bg-white px-2 text-sm text-gray-600 group-focus-within:text-purple-600 transition-colors">
                      Password
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transform hover:scale-[1.02] hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 relative overflow-hidden"
                >
                  {isLoggingIn ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Signing In...
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5" />
                      Sign In to Event Ease
                    </>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000"></div>
                </button>
              </form>

              {/* Divider */}
              <div className="my-6 relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">or continue with</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-red-500 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-[1.02]">
                  <span className="text-lg">📧</span>
                  Google
                </button>
                <button className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-[1.02]">
                  <span className="text-lg">📘</span>
                  Facebook
                </button>
              </div>

              {/* Footer Links */}
              <div className="mt-6 text-center space-x-4">
                <button className="text-purple-600 hover:text-blue-600 transition-colors text-sm">
                  Forgot Password?
                </button>
                <button className="text-purple-600 hover:text-blue-600 transition-colors text-sm">
                  Create Account
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-xy {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes slideDown {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .animate-gradient-xy { animation: gradient-xy 15s ease infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-slideDown { animation: slideDown 0.5s ease-out; }
      `}</style>
    </div>
  );
};