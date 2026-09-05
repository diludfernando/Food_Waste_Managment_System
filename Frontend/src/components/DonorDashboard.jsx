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
  Edit3,
  Eye,
  HeartHandshake,
  ArrowRight,
  History,
  Check,
  AlertTriangle
} from 'lucide-react';

export default function DonorDashboard() {
  const { user } = useUser();

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingDonation, setEditingDonation] = useState(null);
  const [selectedDetails, setSelectedDetails] = useState(null);
  
  const [activeFilter, setActiveFilter] = useState('all');
  const [formError, setFormError] = useState(null);

  // Donations state initialized to empty list
  const [donations, setDonations] = useState([]);

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
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

  // Open Add Modal
  const openAddModal = () => {
    setFormError(null);
    setFormData({
      title: '',
      dietary: 'Veg',
      isHalal: false,
      portions: '',
      weight: '',
      preparedTime: new Date().toISOString().slice(0, 16),
      expiryTime: '',
      address: '',
      city: '',
      contact: ''
    });
    setShowAddModal(true);
  };

  // Open Edit Modal
  const openEditModal = (donation) => {
    setFormError(null);
    setEditingDonation(donation);
    setFormData({
      title: donation.title,
      dietary: donation.dietary,
      isHalal: donation.isHalal,
      portions: donation.portions.toString(),
      weight: donation.weight || '',
      preparedTime: donation.preparedTime || '',
      expiryTime: donation.expiryTime || '',
      address: donation.address,
      city: donation.city,
      contact: donation.contact
    });
  };

  // Validate form fields
  const validateForm = () => {
    if (!formData.title || !formData.portions || !formData.expiryTime || !formData.address || !formData.city || !formData.contact) {
      setFormError('Please fill in all required fields marked with *.');
      return false;
    }

    const portionsNum = Number(formData.portions);
    if (isNaN(portionsNum) || portionsNum <= 0) {
      setFormError('Number of portions must be greater than 0.');
      return false;
    }

    const expiryDate = new Date(formData.expiryTime);
    if (isNaN(expiryDate.getTime()) || expiryDate <= new Date()) {
      setFormError('Expiry time must be in the future (greater than current time).');
      return false;
    }

    return true;
  };

  // Submit Add Donation
  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newItem = {
      id: Date.now(),
      title: formData.title,
      dietary: formData.dietary,
      isHalal: formData.isHalal,
      portions: Number(formData.portions),
      weight: formData.weight || '0',
      preparedTime: formData.preparedTime,
      expiryTime: formData.expiryTime,
      address: formData.address,
      city: formData.city,
      contact: formData.contact,
      status: 'Available',
      reservedBy: null,
      createdAt: 'Just now'
    };

    setDonations([newItem, ...donations]);
    setShowAddModal(false);
  };

  // Submit Edit Donation
  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setDonations(donations.map((item) => {
      if (item.id === editingDonation.id) {
        return {
          ...item,
          title: formData.title,
          dietary: formData.dietary,
          isHalal: formData.isHalal,
          portions: Number(formData.portions),
          weight: formData.weight || '0',
          preparedTime: formData.preparedTime,
          expiryTime: formData.expiryTime,
          address: formData.address,
          city: formData.city,
          contact: formData.contact
        };
      }
      return item;
    }));

    setEditingDonation(null);
  };

  // Workflow State Transitions
  // 1. Available -> Reserved (Simulate Charity Reserve)
  const handleReserve = (id) => {
    setDonations(donations.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: 'Reserved',
          reservedBy: {
            ngoName: 'Caring Hearts Shelter & Food Bank',
            contactPerson: 'David Silva',
            phone: '+94 71 444 5566',
            claimedTime: 'Just now'
          }
        };
      }
      return item;
    }));
  };

  // 2. Reserved -> Collected (Pickup Completed)
  const handleCollect = (id) => {
    setDonations(donations.map(item => {
      if (item.id === id) {
        return { ...item, status: 'Collected' };
      }
      return item;
    }));
  };

  // Filtered List
  const filteredDonations = donations.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'history') return item.status === 'Collected' || item.status === 'Expired';
    return item.status.toLowerCase() === activeFilter.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-100">
              Restaurant & Food Donor Dashboard
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold mt-2 tracking-tight">
              Welcome, {user?.firstName || user?.fullName || 'Food Donor'}! 👋
            </h1>
            <p className="text-emerald-100 mt-1 text-sm sm:text-base">
              Post surplus food, track charity reservations, and manage pickup completions.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="px-6 py-3.5 bg-white text-emerald-800 font-bold rounded-2xl shadow-lg hover:bg-emerald-50 transition-all flex items-center space-x-2 shrink-0"
          >
            <PlusCircle className="h-5 w-5 text-emerald-600" />
            <span>Add Food Donation</span>
          </button>
        </div>

        {/* Workflow Visual Banner */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hidden md:block">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Live Donation Workflow</p>
          <div className="flex items-center justify-between text-xs text-slate-700 font-semibold">
            <div className="flex items-center space-x-2 bg-emerald-50 text-emerald-800 px-3 py-2 rounded-xl border border-emerald-200">
              <Utensils className="h-4 w-4 text-emerald-600" />
              <span>1. Add Donation</span>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-300" />
            <div className="flex items-center space-x-2 bg-blue-50 text-blue-800 px-3 py-2 rounded-xl border border-blue-200">
              <Clock className="h-4 w-4 text-blue-600" />
              <span>2. Available Listing</span>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-300" />
            <div className="flex items-center space-x-2 bg-amber-50 text-amber-800 px-3 py-2 rounded-xl border border-amber-200">
              <HeartHandshake className="h-4 w-4 text-amber-600" />
              <span>3. Charity Reserves</span>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-300" />
            <div className="flex items-center space-x-2 bg-purple-50 text-purple-800 px-3 py-2 rounded-xl border border-purple-200">
              <CheckCircle2 className="h-4 w-4 text-purple-600" />
              <span>4. Pickup Completed</span>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Available</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {donations.filter(d => d.status === 'Available').length} Items
              </p>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <Utensils className="h-6 w-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Reserved</p>
              <p className="text-2xl font-bold text-amber-600 mt-1">
                {donations.filter(d => d.status === 'Reserved').length} Items
              </p>
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <HeartHandshake className="h-6 w-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Collected</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">
                {donations.filter(d => d.status === 'Collected').length} Items
              </p>
            </div>
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <PackageCheck className="h-6 w-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Expired</p>
              <p className="text-2xl font-bold text-slate-500 mt-1">
                {donations.filter(d => d.status === 'Expired').length} Items
              </p>
            </div>
            <div className="p-3 bg-slate-100 text-slate-500 rounded-xl">
              <AlertTriangle className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Donations Management Section */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
            <div>
              <h2 className="text-xl font-bold text-slate-900">My Food Donations</h2>
              <p className="text-sm text-slate-500">Track listings, charity reservations, and pickup history</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex bg-slate-100 p-1 rounded-xl space-x-1 overflow-x-auto max-w-full">
              {['all', 'available', 'reserved', 'collected', 'expired', 'history'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`capitalize px-3 py-1.5 text-xs font-semibold rounded-lg transition-all shrink-0 ${
                    activeFilter === tab
                      ? 'bg-white text-slate-900 shadow-sm font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Empty State when no donations exist */}
          {filteredDonations.length === 0 ? (
            <div className="text-center py-16 bg-slate-50/60 rounded-3xl border border-dashed border-slate-200">
              <Utensils className="h-12 w-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">No Food Donations Posted Yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-5">
                Post your surplus food items to help local charities, shelters, and communities in real-time.
              </p>
              <button
                onClick={openAddModal}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all inline-flex items-center space-x-1.5"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Add Your First Donation</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDonations.map((item) => (
              <div 
                key={item.id}
                className="bg-slate-50/70 rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:border-emerald-300 transition-all hover:shadow-md relative"
              >
                <div className="space-y-3">
                  {/* Status & Dietary Tags */}
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
                        : item.status === 'Reserved'
                        ? 'bg-amber-500 text-white'
                        : item.status === 'Collected'
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-400 text-white'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h3>

                  {/* Summary Details */}
                  <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center space-x-1.5">
                        <Utensils className="h-3.5 w-3.5 text-slate-400" />
                        <span><strong>Portions:</strong> {item.portions}</span>
                      </span>
                      <span className="flex items-center space-x-1.5">
                        <Weight className="h-3.5 w-3.5 text-slate-400" />
                        <span><strong>Weight:</strong> {item.weight} kg</span>
                      </span>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <Clock className="h-3.5 w-3.5 text-rose-400" />
                      <span><strong>Expires:</strong> {new Date(item.expiryTime).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}</span>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      <span className="truncate"><strong>Pickup:</strong> {item.address}, {item.city}</span>
                    </div>
                  </div>

                  {/* Reserved By Banner if Reserved */}
                  {item.status === 'Reserved' && item.reservedBy && (
                    <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-xs space-y-1">
                      <p className="font-bold text-amber-900 flex items-center space-x-1">
                        <HeartHandshake className="h-3.5 w-3.5 text-amber-600" />
                        <span>Reserved by {item.reservedBy.ngoName}</span>
                      </p>
                      <p className="text-amber-800 text-[11px]">Contact: {item.reservedBy.contactPerson} ({item.reservedBy.phone})</p>
                    </div>
                  )}
                </div>

                {/* Workflow Actions */}
                <div className="pt-4 mt-4 border-t border-slate-200/60 flex flex-col space-y-2">
                  {/* Status Specific Workflow Actions */}
                  {item.status === 'Available' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleReserve(item.id)}
                        className="flex-1 py-1.5 px-2 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-800 text-xs font-bold rounded-lg transition-colors flex items-center justify-center space-x-1"
                      >
                        <HeartHandshake className="h-3.5 w-3.5" />
                        <span>Simulate Reserve</span>
                      </button>
                      <button
                        onClick={() => openEditModal(item)}
                        className="py-1.5 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center space-x-1"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                        <span>Edit</span>
                      </button>
                    </div>
                  )}

                  {item.status === 'Reserved' && (
                    <button
                      onClick={() => handleCollect(item.id)}
                      className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-1.5 shadow-sm"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Confirm Pickup Completed</span>
                    </button>
                  )}

                  {/* View Details Button */}
                  <button
                    onClick={() => setSelectedDetails(item)}
                    className="w-full py-1.5 text-center text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors flex items-center justify-center space-x-1"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    <span>View Full Details</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
          )}
        </div>
      </div>

      {/* Add / Edit Form Modal */}
      {(showAddModal || editingDonation) && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5 relative my-8">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
                <Utensils className="h-5 w-5 text-emerald-600" />
                <span>{editingDonation ? 'Edit Food Donation' : 'Add Food Donation'}</span>
              </h3>
              <button 
                onClick={() => { setShowAddModal(false); setEditingDonation(null); }}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl flex items-center space-x-2.5 text-xs font-semibold">
                <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={editingDonation ? handleEditSubmit : handleAddSubmit} className="space-y-4">
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

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Dietary Classification
                </label>
                <div className="flex items-center space-x-3">
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
                </div>
              </div>

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

              <div className="pt-3 flex space-x-3">
                <button
                  type="button"
                  onClick={() => { setShowAddModal(false); setEditingDonation(null); }}
                  className="flex-1 py-2.5 border border-slate-300 rounded-xl text-slate-700 font-semibold text-sm hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-md transition-all"
                >
                  {editingDonation ? 'Save Changes' : 'Publish Donation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Donation Details Modal */}
      {selectedDetails && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative my-8">
            <div className="flex justify-between items-start border-b border-slate-100 pb-4">
              <div>
                <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                  selectedDetails.status === 'Available'
                    ? 'bg-emerald-500 text-white'
                    : selectedDetails.status === 'Reserved'
                    ? 'bg-amber-500 text-white'
                    : selectedDetails.status === 'Collected'
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-400 text-white'
                }`}>
                  {selectedDetails.status}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">
                  {selectedDetails.title}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedDetails(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold">Dietary</p>
                  <p className="font-bold text-slate-900 mt-0.5">
                    {selectedDetails.dietary === 'Veg' ? '🟢 Veg' : '🔴 Non-Veg'}
                    {selectedDetails.isHalal && ' • 🌙 Halal'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-semibold">Portions & Weight</p>
                  <p className="font-bold text-slate-900 mt-0.5">
                    {selectedDetails.portions} Meals ({selectedDetails.weight} kg)
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-slate-700">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-emerald-600" />
                  <span><strong>Prepared:</strong> {selectedDetails.preparedTime ? new Date(selectedDetails.preparedTime).toLocaleString() : 'N/A'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-rose-600" />
                  <span><strong>Expires:</strong> {new Date(selectedDetails.expiryTime).toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-slate-500" />
                  <span><strong>Address:</strong> {selectedDetails.address}, {selectedDetails.city}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-slate-500" />
                  <span><strong>Contact Phone:</strong> {selectedDetails.contact}</span>
                </div>
              </div>

              {/* Reserved Charity Info if Reserved or Collected */}
              {selectedDetails.reservedBy && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-2">
                  <h4 className="font-bold text-amber-900 flex items-center space-x-2 text-sm">
                    <HeartHandshake className="h-4 w-4 text-amber-600" />
                    <span>Reserving Charity Details</span>
                  </h4>
                  <p className="text-xs text-amber-800">
                    <strong>NGO:</strong> {selectedDetails.reservedBy.ngoName}
                  </p>
                  <p className="text-xs text-amber-800">
                    <strong>Contact Person:</strong> {selectedDetails.reservedBy.contactPerson} ({selectedDetails.reservedBy.phone})
                  </p>
                  <p className="text-xs text-amber-800">
                    <strong>Reserved At:</strong> {selectedDetails.reservedBy.claimedTime}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedDetails(null)}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-sm transition-all"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
