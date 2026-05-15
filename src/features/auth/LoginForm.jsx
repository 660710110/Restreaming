import React, { useState } from 'react';
import { User, Lock, ArrowRight } from 'lucide-react';

const LoginForm = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Sending to Backend:', formData);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (onLoginSuccess) {
        // Return mock backend response
        onLoginSuccess({
          status: 'success',
          sessionToken: 'auth_session_temp_998877',
          availableMethods: [
            { id: 'token', name: 'Streaming Token', desc: 'A 6-digit code from the Streaming app.', type: 'streaming_token', security: 'HIGH', recommended: true },
            { id: 'qr', name: 'QR Code', desc: 'Scan via the Streaming app', type: 'qr_scanner', security: 'HIGH' },
            { id: 'auth', name: 'Authenticator App', desc: 'Google / Microsoft Auth', type: 'otp_app', security: 'HIGH' },
            { id: 'sms', name: 'SMS OTP', desc: 'OTP via SMS', type: 'sms', security: 'MEDIUM' },
            { id: 'email', name: 'Email OTP', desc: 'OTP via registered email', type: 'email', security: 'MEDIUM' },
            { id: 'pin', name: 'PIN Code', desc: 'A 6-digit backup PIN', type: 'pin', security: 'STANDARD' },
          ]
        });
      }
    }, 1000);
  };

  return (
    <div className="bg-white dark:bg-[#0c1421] border border-gray-200 dark:border-[#1e3a8a] rounded-xl overflow-hidden shadow-xl transition-colors duration-300">
      <div className="bg-gray-50 dark:bg-[#111827] py-4 text-center border-b border-gray-200 dark:border-[#1e3a8a]">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Login</h2>
      </div>
      
      <div className="p-6 md:p-8">
        {/* Trial Banner */}
        <div className="bg-orange-50 dark:bg-[#1e140a] border border-orange-200 dark:border-yellow-700/50 rounded-lg p-4 flex flex-wrap items-center justify-between gap-4 mb-8 cursor-pointer hover:bg-orange-100 dark:hover:bg-[#2a1d0f] transition">
          <div className="flex items-center gap-3">
            <span className="bg-yellow-500 text-black font-bold text-xs px-2 py-1 rounded">FREE !</span>
            <span className="text-orange-700 dark:text-yellow-500 font-semibold text-sm">15 DAYS TRIAL</span>
          </div>
          <div className="flex items-center gap-2 text-orange-800 dark:text-white text-sm font-semibold">
            OPEN ACCOUNT <ArrowRight size={16} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-2 font-medium">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
                <User size={18} />
              </div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
                className="w-full bg-gray-50 dark:bg-[#090e19] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-2 font-medium">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
                <Lock size={18} />
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full bg-gray-50 dark:bg-[#090e19] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 cursor-pointer">
              <input type="checkbox" className="rounded bg-white dark:bg-[#090e19] border-gray-300 dark:border-gray-700 text-blue-500 focus:ring-blue-500 w-4 h-4" />
              Show Password
            </label>
            <a href="#" className="text-xs text-blue-600 dark:text-blue-500 hover:underline">Forgotten your password ?</a>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full text-white font-medium py-3 rounded-lg mt-6 transition shadow-lg shadow-blue-500/20 disabled:opacity-70 text-lg bg-blue-400 hover:bg-blue-500 dark:bg-[#1b84ff] dark:hover:bg-[#006ee6]"
            >
            {isLoading ? 'Logging in...' : 'Go'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;