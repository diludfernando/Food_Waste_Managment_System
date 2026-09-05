import React, { useState } from 'react';
import { useUser } from '@clerk/react';
import { 
  PlusCircle, 
  Utensils, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  Leaf, 
  PackageCheck, 
  Phone,
  Weight,
  Calendar,
  X,
  ShieldCheck,
  Building2
} from 'lucide-react';

export default function DonorDashboard() {
  const { user } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [formError, setFormError] = useState(null);

  // Initial sample donations
  const [donations, setDonations] = useState([
    {
      id: 1,
      title: 'Chicken Biryani & Raitha',
      dietary: 'Non-Veg',
      isHalal: true,
      portions: 40,
      weight: '12 kg',
      preparedTime: '2026-09-05T09:00',
      expiryTime: '2026-09-05T20:00',
      address: 'Green Garden Restaurant, 45 Main St',
      city: 'Colombo',
      contact: '+94 77 123 4567',
      status: 'Available',
      createdAt: '2 hours ago'
    },
    {
      id: 2,
      title: 'Assorted Veg Sandwich & Pastries',
      dietary: 'Veg',
      isHalal: true,
      portions: 25,
      weight: '5 kg',
      preparedTime: '2026-09-05T07:30',
      expiryTime: '2026-09-05T21:00',
      address: 'SunRise Bakery, 4th Avenue',
      city: 'Kandy',
      contact: '+94 81 987 6543',
      status: 'Claimed',
      createdAt: '5 hours ago'
    }
  ]);

  // New donation form state
  const [formData, setFormData] = useState({
    title: '',
    dietary: 'Veg', // 'Veg' | 'Non-Veg'
    isHalal: false,
    portions: '',
    weight: '',
    preparedTime: '',
    expiryTime: '',
    address: '',
    city: '',
    contact: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(null);

    // 1. Required field validation
    if (!formData.title || !formData.portions || !formData.expiryTime || !formData.address || !formData.city || !formData.contact) {
      setFormError('Please fill in all required fields marked with *.');
      return;
    }

    // 2. Validation: portions > 0
    const portionsNum = Number(formData.portions);
    if (isNaN(portionsNum) || portionsNum <= 0) {
      setFormError('Number of portions must be greater than 0.');
      return;
    }

    // 3. Validation: expiryTime > currentTime
    const expiryDate = new Date(formData.expiryTime);
    const currentDate = new Date();
    if (isNaN(expiryDate.getTime()) || expiryDate <= currentDate) {
      setFormError('Expiry time must be in the future (greater than current time).');
      return;
    }

    // Construct new donation object
    const newDonation = {
      id: Date.now(),
      title: formData.title,
      dietary: formData.dietary,
      isHalal: formData.isHalal,
      portions: portionsNum,
      weight: formData.weight ? `${formData.weight} kg` : 'N/A',
      preparedTime: formData.preparedTime || new Date().toISOString().slice(0, 16),
      expiryTime: formData.expiryTime,
      address: formData.address,
      city: formData.city,
      contact: formData.contact,
      status: 'Available',
      createdAt: 'Just now'
    };

    setDonations([newDonation, ...donations]);
    
    // Reset Form & Close Modal
    setFormData({
      title: '',
      dietary: 'Veg',
      isHalal: false,
      portions: '',
      weight: '',
      preparedTime: '',
      expiryTime: '',
      address: '',
      city: '',
      contact: ''
    });
    setShowModal(false);
  };

  const filteredDonations = donations.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.status.toLowerCase() === activeFilter.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-100">
              Food Donor Portal
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold mt-2">
              Welcome, {user?.firstName || user?.fullName || 'Food Donor'}! 👋
            </h1>
            <p className="text-emerald-100 mt-1 text-sm sm:text-base">
              Manage your surplus food donations and connect with local charities in real-time.
            </p>
          </div>

          <button
            onClick={() => { setFormError(null); setShowModal(true); }}
            className="px-6 py-3.5 bg-white text-emerald-800 font-bold rounded-2xl shadow-lg hover:bg-emerald-50 transition-all flex items-center space-x-2 shrink-0"
          >
            <PlusCircle className="h-5 w-5 text-emerald-600" />
            <span>Add Food Donation</span>
          </button>
        </div>

        {/* Impact Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Donated</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">128 Meals</p>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <Utensils className="h-6 w-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Active Listings</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {donations.filter(d => d.status === 'Available').length} Items
              </p>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Clock className="h-6 w-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Claimed & Delivered</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {donations.filter(d => d.status !== 'Available').length} Items
              </p>
            </div>
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <PackageCheck className="h-6 w-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">CO2 Reduced</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">45.2 kg</p>
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <Leaf className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Donations Management Section */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Your Food Donations</h2>
              <p className="text-sm text-slate-500">Track and manage active or completed surplus food postings</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex bg-slate-100 p-1 rounded-xl space-x-1">
              {['all', 'available', 'claimed', 'completed'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`capitalize px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    activeFilter === tab
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Donation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDonations.map((item) => (
              <div 
                key={item.id}
                className="bg-slate-50/70 rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:border-emerald-300 transition-all hover:shadow-md"
              >
                <div className="space-y-3">
                  {/* Category & Status Header */}
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
                      <span className={`px-2.5 py-0.5 text-xs font-bold rounded-lg ${
                        item.dietary === 'Veg' 
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                          : 'bg-rose-100 text-rose-800 border border-rose-300'
                      }`}>
                        {item.dietary === 'Veg' ? '🟢 Veg' : '🔴 Non-Veg'}
                      </span>
                      {item.isHalal && (
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs font-bold rounded-lg border border-amber-300">
                          🌙 Halal
                        </span>
                      )}
                    </div>

                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full shrink-0 ${
                      item.status === 'Available'
                        ? 'bg-emerald-500 text-white'
                        : item.status === 'Claimed'
                        ? 'bg-amber-500 text-white'
                        : 'bg-slate-400 text-white'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h3>

                  {/* Details Grid */}
                  <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center space-x-1.5">
                        <Utensils className="h-3.5 w-3.5 text-slate-400" />
                        <span><strong>Portions:</strong> {item.portions}</span>
                      </span>
                      <span className="flex items-center space-x-1.5">
                        <Weight className="h-3.5 w-3.5 text-slate-400" />
                        <span><strong>Weight:</strong> {item.weight}</span>
                      </span>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <Clock className="h-3.5 w-3.5 text-rose-400" />
                      <span><strong>Expires:</strong> {new Date(item.expiryTime).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</span>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      <span className="truncate"><strong>Location:</strong> {item.address}, {item.city}</span>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <Phone className="h-3.5 w-3.5 text-slate-400" />
                      <span><strong>Contact:</strong> {item.contact}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60 flex justify-between items-center text-xs text-slate-500">
                  <span>Posted {item.createdAt}</span>
                  <button className="text-emerald-600 font-semibold hover:text-emerald-700">
                    Manage Listing →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Food Donation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5 relative my-8">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
                <Utensils className="h-5 w-5 text-emerald-600" />
                <span>Add Food Donation</span>
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Error Alert Box */}
            {formError && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl flex items-center space-x-2.5 text-xs font-semibold">
                <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 1. Food Name / Type */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Food Name / Type <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Chicken Rice & Curry / Fresh Vegetable Salad"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              {/* 2. Veg / Non-Veg / Halal Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Dietary Classification
                </label>
                <div className="flex items-center space-x-3">
                  {/* Veg Option */}
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, dietary: 'Veg' })}
                    className={`px-4 py-2 rounded-xl border text-xs font-bold transition-all flex items-center space-x-1.5 ${
                      formData.dietary === 'Veg'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>🟢 Veg</span>
                  </button>

                  {/* Non-Veg Option */}
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, dietary: 'Non-Veg' })}
                    className={`px-4 py-2 rounded-xl border text-xs font-bold transition-all flex items-center space-x-1.5 ${
                      formData.dietary === 'Non-Veg'
                        ? 'border-rose-500 bg-rose-50 text-rose-800 ring-2 ring-rose-500/20'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>🔴 Non-Veg</span>
                  </button>

                  {/* Halal Toggle Checkbox */}
                  <label className="flex items-center space-x-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer text-xs font-bold text-slate-700 hover:bg-slate-100">
                    <input
                      type="checkbox"
                      checked={formData.isHalal}
                      onChange={(e) => setFormData({ ...formData, isHalal: e.target.checked })}
                      className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                    />
                    <span>🌙 Halal</span>
                  </label>
                </div>
              </div>

              {/* 3 & 4. Number of Portions & Estimated Weight */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Portions <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.portions}
                    onChange={(e) => setFormData({ ...formData, portions: e.target.value })}
                    placeholder="e.g. 50 (must be > 0)"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                  <p className="text-[10px] text-slate-500 mt-0.5">Validation: portions &gt; 0</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Est. Weight (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    placeholder="e.g. 10.5"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              {/* 5 & 6. Prepared Time & Expiry Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Prepared Time
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.preparedTime}
                    onChange={(e) => setFormData({ ...formData, preparedTime: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Expiry Time <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={formData.expiryTime}
                    onChange={(e) => setFormData({ ...formData, expiryTime: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                  <p className="text-[10px] text-slate-500 mt-0.5">Validation: expiryTime &gt; now</p>
                </div>
              </div>

              {/* 7. Pickup Address & City */}
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Pickup Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="e.g. 123 Main Street"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    City <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Colombo"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              {/* 8. Contact Number */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Contact Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  placeholder="e.g. +94 77 123 4567"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 border border-slate-300 rounded-xl text-slate-700 font-semibold text-sm hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-md transition-all"
                >
                  Post Donation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
