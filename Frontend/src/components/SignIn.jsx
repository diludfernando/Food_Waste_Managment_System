import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Leaf, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Utensils, 
  HeartHandshake, 
  Truck, 
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function SignIn() {
  const navigate = useNavigate();
  const [role, setRole] = useState('donor');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [statusMessage, setStatusMessage] = useState(null);

  const roles = [
    { id: 'donor', name: 'Food Donor', icon: Utensils, desc: 'Restaurant, Store, Hotel' },
    { id: 'ngo', name: 'NGO / Recipient', icon: HeartHandshake, desc: 'Shelter, Food Bank' },
    { id: 'volunteer', name: 'Volunteer', icon: Truck, desc: 'Logistics & Pickup' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setStatusMessage({ type: 'error', text: 'Please fill in all required fields.' });
      return;
    }

    setStatusMessage({
      type: 'success',
      text: `Successfully signed in as ${roles.find(r => r.id === role)?.name}! Redirecting...`
    });

    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="p-3 bg-emerald-500 rounded-2xl text-white shadow-md">
            <Leaf className="h-8 w-8" />
          </div>
        </div>
        <h2 className="mt-4 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Sign in to your account to continue rescuing food
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-8 px-6 shadow-xl shadow-slate-200/50 rounded-2xl border border-slate-200/80 sm:px-10">
          
          {/* Status Message Alert */}
          {statusMessage && (
            <div className={`mb-6 p-4 rounded-xl flex items-center space-x-3 text-sm font-medium ${
              statusMessage.type === 'success' 
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}>
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="h-5 w-5 text-rose-600 shrink-0" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Select Account Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {roles.map((r) => {
                const IconComp = r.icon;
                const selected = role === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRole(r.id)}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center ${
                      selected
                        ? 'border-emerald-600 bg-emerald-50/60 text-emerald-900 ring-2 ring-emerald-500/20 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white text-slate-600'
                    }`}
                  >
                    <IconComp className={`h-5 w-5 mb-1 ${selected ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span className="text-xs font-bold block">{r.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Address Input */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                  className="block w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="block w-full pl-11 pr-11 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-sm font-medium text-emerald-600 hover:text-emerald-500">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all flex items-center justify-center space-x-2"
            >
              <span>Sign In as {roles.find(r => r.id === role)?.name}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Register Redirect Prompt */}
          <div className="mt-6 pt-6 border-t border-slate-200 text-center">
            <p className="text-sm text-slate-600">
              Don't have an account yet?{' '}
              <Link to="/signup" className="font-semibold text-emerald-600 hover:text-emerald-500">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
