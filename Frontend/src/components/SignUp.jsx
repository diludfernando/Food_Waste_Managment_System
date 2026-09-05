import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Leaf, 
  User, 
  Mail, 
  Lock, 
  Phone, 
  Building2, 
  Eye, 
  EyeOff, 
  Utensils, 
  HeartHandshake, 
  Truck, 
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function SignUp() {
  const navigate = useNavigate();
  const [role, setRole] = useState('donor');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    orgName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  
  const [statusMessage, setStatusMessage] = useState(null);

  const roles = [
    { 
      id: 'donor', 
      title: 'Food Donor', 
      icon: Utensils, 
      desc: 'Restaurants, Hotels, Bakeries, Supermarkets & Event Organizers' 
    },
    { 
      id: 'ngo', 
      title: 'Recipient / NGO', 
      icon: HeartHandshake, 
      desc: 'Shelters, Food Banks, Community Kitchens & Charities' 
    },
    { 
      id: 'volunteer', 
      title: 'Volunteer / Driver', 
      icon: Truck, 
      desc: 'Individuals helping with food collection & delivery logistics' 
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setStatusMessage({ type: 'error', text: 'Please fill in all required fields.' });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setStatusMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }

    if (!formData.agreeTerms) {
      setStatusMessage({ type: 'error', text: 'Please agree to the Terms of Service and Privacy Policy.' });
      return;
    }

    setStatusMessage({
      type: 'success',
      text: `Account created successfully as ${roles.find(r => r.id === role)?.title}! Redirecting to login...`
    });

    setTimeout(() => {
      navigate('/signin');
    }, 1800);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="flex justify-center">
          <div className="p-3 bg-emerald-500 rounded-2xl text-white shadow-md">
            <Leaf className="h-8 w-8" />
          </div>
        </div>
        <h2 className="mt-4 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
          Join FoodRescueHub
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Create an account to start reducing food waste and serving your community
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-6 shadow-xl shadow-slate-200/50 rounded-2xl border border-slate-200/80 sm:px-10">
          
          {/* Status Alert */}
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

          {/* Account Role Selection Cards */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              1. Choose Account Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {roles.map((r) => {
                const IconComp = r.icon;
                const selected = role === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRole(r.id)}
                    className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      selected
                        ? 'border-emerald-600 bg-emerald-50/60 text-emerald-900 ring-2 ring-emerald-500/20 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                    }`}
                  >
                    <div>
                      <div className={`p-2 rounded-lg w-fit mb-2 ${selected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                        <IconComp className="h-5 w-5" />
                      </div>
                      <h4 className="text-sm font-bold">{r.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{r.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider pt-2">
              2. Enter Details
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Jane Doe"
                    className="block w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                  />
                </div>
              </div>

              {/* Organization/Business Name (Optional or conditional) */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {role === 'volunteer' ? 'Affiliation (Optional)' : 'Organization / Business Name'}
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    value={formData.orgName}
                    onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                    placeholder={role === 'donor' ? 'e.g. Green Bakery' : role === 'ngo' ? 'e.g. Hope Shelter' : 'e.g. Community Drivers'}
                    className="block w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email Address */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="block w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Phone Number
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Phone className="h-4 w-4" />
                  </div>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="block w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="block w-full pl-10 pr-10 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Confirm Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    placeholder="••••••••"
                    className="block w-full pl-10 pr-10 py-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms Agreement Checkbox */}
            <div className="pt-2">
              <label className="flex items-start space-x-2 text-sm text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.agreeTerms}
                  onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                  className="mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 h-4 w-4 shrink-0"
                />
                <span>
                  I agree to the{' '}
                  <a href="#" className="text-emerald-600 font-medium hover:underline">Terms of Service</a>{' '}
                  and{' '}
                  <a href="#" className="text-emerald-600 font-medium hover:underline">Privacy Policy</a>.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all flex items-center justify-center space-x-2 mt-4"
            >
              <span>Create Account as {roles.find(r => r.id === role)?.title}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Already registered redirect prompt */}
          <div className="mt-6 pt-6 border-t border-slate-200 text-center">
            <p className="text-sm text-slate-600">
              Already have an account?{' '}
              <Link to="/signin" className="font-semibold text-emerald-600 hover:text-emerald-500">
                Sign in instead
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
