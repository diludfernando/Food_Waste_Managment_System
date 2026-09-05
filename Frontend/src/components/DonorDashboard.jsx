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
  Calendar,
  X,
  Building
} from 'lucide-react';

export default function DonorDashboard() {
  const { user } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  // Sample donation list state
  const [donations, setDonations] = useState([
    {
      id: 1,
      title: 'Surplus Fresh Rice & Veggie Curry',
      category: 'Cooked Meals',
      quantity: '40 Servings',
      pickupTime: 'Today by 7:30 PM',
      location: 'Green Garden Restaurant, Main St.',
      status: 'Available',
      createdAt: '2 hours ago'
    },
    {
      id: 2,
      title: 'Assorted Fresh Bakery Items & Bread',
      category: 'Bakery',
      quantity: '25 Bundles',
      pickupTime: 'Today by 9:00 PM',
      location: 'SunRise Bakery, 4th Avenue',
      status: 'Claimed',
      createdAt: '5 hours ago'
    },
    {
      id: 3,
      title: 'Organic Apples & Bananas',
      category: 'Fresh Produce',
      quantity: '15 kg',
      pickupTime: 'Completed yesterday',
      location: 'FreshMart Supermarket',
      status: 'Completed',
      createdAt: '1 day ago'
    }
  ]);

  // Form state for posting new donation
  const [newDonation, setNewDonation] = useState({
    title: '',
    category: 'Cooked Meals',
    quantity: '',
    pickupTime: '',
    location: ''
  });

  const handlePostDonation = (e) => {
    e.preventDefault();
    if (!newDonation.title || !newDonation.quantity || !newDonation.location) return;

    const item = {
      id: Date.now(),
      title: newDonation.title,
      category: newDonation.category,
      quantity: newDonation.quantity,
      pickupTime: newDonation.pickupTime || 'Today by 8:00 PM',
      location: newDonation.location,
      status: 'Available',
      createdAt: 'Just now'
    };

    setDonations([item, ...donations]);
    setNewDonation({ title: '', category: 'Cooked Meals', quantity: '', pickupTime: '', location: '' });
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
            onClick={() => setShowModal(true)}
            className="px-6 py-3.5 bg-white text-emerald-800 font-bold rounded-2xl shadow-lg hover:bg-emerald-50 transition-all flex items-center space-x-2 shrink-0"
          >
            <PlusCircle className="h-5 w-5 text-emerald-600" />
            <span>Post Surplus Food</span>
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
              <h2 className="text-xl font-bold text-slate-900">Your Food Listings</h2>
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
                  <div className="flex justify-between items-start">
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-lg">
                      {item.category}
                    </span>
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
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

                  <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                    <div className="flex items-center space-x-2">
                      <Utensils className="h-3.5 w-3.5 text-slate-400" />
                      <span><strong>Quantity:</strong> {item.quantity}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      <span><strong>Pickup Window:</strong> {item.pickupTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      <span className="truncate"><strong>Location:</strong> {item.location}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60 flex justify-between items-center text-xs text-slate-500">
                  <span>Posted {item.createdAt}</span>
                  <button className="text-emerald-600 font-semibold hover:text-emerald-700">
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Post Surplus Food Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative animate-in fade-in zoom-in duration-150">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
                <Utensils className="h-5 w-5 text-emerald-600" />
                <span>Post Surplus Food</span>
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handlePostDonation} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Food Item Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newDonation.title}
                  onChange={(e) => setNewDonation({ ...newDonation, title: e.target.value })}
                  placeholder="e.g. Fresh Veggie Lunch Boxes"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={newDonation.category}
                    onChange={(e) => setNewDonation({ ...newDonation, category: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="Cooked Meals">Cooked Meals</option>
                    <option value="Bakery">Bakery & Pastry</option>
                    <option value="Fresh Produce">Fresh Produce</option>
                    <option value="Packaged Goods">Packaged Goods</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Quantity <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newDonation.quantity}
                    onChange={(e) => setNewDonation({ ...newDonation, quantity: e.target.value })}
                    placeholder="e.g. 30 Servings / 10 kg"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Pickup Location <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newDonation.location}
                  onChange={(e) => setNewDonation({ ...newDonation, location: e.target.value })}
                  placeholder="e.g. 123 Green St, Bakery Kitchen"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Pickup Window / Expiry
                </label>
                <input
                  type="text"
                  value={newDonation.pickupTime}
                  onChange={(e) => setNewDonation({ ...newDonation, pickupTime: e.target.value })}
                  placeholder="e.g. Today by 8:00 PM"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="pt-4 flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 border border-slate-300 rounded-xl text-slate-700 font-semibold text-sm hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-md transition-all"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
