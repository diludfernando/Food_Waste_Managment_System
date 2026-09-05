import React, { useState } from 'react';
import { useUser } from '@clerk/react';
import { 
  Utensils, 
  HeartHandshake, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Leaf, 
  Phone, 
  ShieldCheck, 
  Building2, 
  Check, 
  X, 
  Eye, 
  Filter, 
  PackageCheck,
  AlertCircle,
  Home,
  Users
} from 'lucide-react';

export default function CharityDashboard() {
  const { user } = useUser();

  const [activeTab, setActiveTab] = useState('available'); // 'available' | 'reservations' | 'completed'
  const [cityFilter, setCityFilter] = useState('all');
  const [dietaryFilter, setDietaryFilter] = useState('all');
  
  const [selectedListing, setSelectedListing] = useState(null); // For Reserve Modal
  const [viewDetails, setViewDetails] = useState(null); // For View Details Modal
  const [notification, setNotification] = useState(null);

  // Available Surplus Food Posted by Donors
  const [availableFood, setAvailableFood] = useState([
    {
      id: 101,
      donorName: 'Green Garden Restaurant',
      title: 'Chicken Biryani & Raitha Packages',
      dietary: 'Non-Veg',
      isHalal: true,
      portions: 45,
      weight: '14.0 kg',
      preparedTime: '2 hours ago',
      expiryTime: 'Today by 9:00 PM',
      address: '45 Main Street',
      city: 'Colombo',
      contact: '+94 77 123 4567',
      distance: '1.2 km away'
    },
    {
      id: 102,
      donorName: 'SunRise Bakery & Cafe',
      title: 'Assorted Veg Sandwiches & Whole Wheat Breads',
      dietary: 'Veg',
      isHalal: true,
      portions: 30,
      weight: '6.0 kg',
      preparedTime: '3 hours ago',
      expiryTime: 'Today by 8:30 PM',
      address: '88 4th Avenue',
      city: 'Kandy',
      contact: '+94 81 987 6543',
      distance: '2.5 km away'
    },
    {
      id: 103,
      donorName: 'Grand Hotel Banquet',
      title: 'Vegetable Fried Rice & Mushroom Curry Trays',
      dietary: 'Veg',
      isHalal: false,
      portions: 60,
      weight: '18.5 kg',
      preparedTime: '1 hour ago',
      expiryTime: 'Today by 10:00 PM',
      address: '12 Beach Road',
      city: 'Colombo',
      contact: '+94 11 444 7788',
      distance: '3.0 km away'
    }
  ]);

  // Active Reservations claimed by this Charity
  const [reservations, setReservations] = useState([
    {
      id: 201,
      donorName: 'City Fresh Supermarket',
      title: 'Box of Fresh Apples, Oranges & Bananas',
      dietary: 'Veg',
      isHalal: true,
      portions: 25,
      weight: '10.0 kg',
      expiryTime: 'Today by 7:00 PM',
      address: '100 Galle Road',
      city: 'Colombo',
      contact: '+94 71 888 9900',
      reservedAt: '30 mins ago',
      status: 'Reserved'
    }
  ]);

  // Completed Rescues History
  const [completedRescues, setCompletedRescues] = useState([
    {
      id: 301,
      donorName: 'Ocean View Hotel',
      title: 'Steamed Rice & Fish Curry Bowls',
      dietary: 'Non-Veg',
      isHalal: true,
      portions: 50,
      weight: '15.0 kg',
      completedAt: 'Yesterday at 4:30 PM',
      address: 'Sea Street',
      city: 'Colombo'
    },
    {
      id: 302,
      donorName: 'Royal Bakery',
      title: 'Vegetable Buns & Muffins',
      dietary: 'Veg',
      isHalal: true,
      portions: 40,
      weight: '8.0 kg',
      completedAt: '3 days ago',
      address: 'Central Bus Stand Rd',
      city: 'Kandy'
    }
  ]);

  // Action: Reserve Food Item
  const handleConfirmReservation = () => {
    if (!selectedListing) return;

    const newReservation = {
      ...selectedListing,
      reservedAt: 'Just now',
      status: 'Reserved'
    };

    // Move from Available -> Reservations
    setReservations([newReservation, ...reservations]);
    setAvailableFood(availableFood.filter(item => item.id !== selectedListing.id));
    
    setSelectedListing(null);
    setNotification({
      type: 'success',
      text: `Successfully reserved "${newReservation.title}"! Please review pickup details.`
    });

    setTimeout(() => setNotification(null), 4000);
  };

  // Action: Confirm Pickup Completed
  const handleCompletePickup = (reservation) => {
    const completedItem = {
      ...reservation,
      completedAt: 'Just now'
    };

    setCompletedRescues([completedItem, ...completedRescues]);
    setReservations(reservations.filter(r => r.id !== reservation.id));

    setNotification({
      type: 'success',
      text: `Rescue completed! ${reservation.portions} meals added to your rescue record.`
    });

    setTimeout(() => setNotification(null), 4000);
  };

  // Filtered available food
  const filteredAvailableFood = availableFood.filter((item) => {
    if (cityFilter !== 'all' && item.city.toLowerCase() !== cityFilter.toLowerCase()) return false;
    if (dietaryFilter !== 'all' && item.dietary.toLowerCase() !== dietaryFilter.toLowerCase()) return false;
    return true;
  });

  // Calculate Total Meals Received
  const totalMealsReceived = completedRescues.reduce((sum, r) => sum + r.portions, 0);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Notification Banner */}
        {notification && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl flex items-center justify-between shadow-sm animate-in fade-in">
            <div className="flex items-center space-x-3 text-sm font-semibold">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              <span>{notification.text}</span>
            </div>
            <button onClick={() => setNotification(null)} className="text-slate-400 hover:text-slate-600">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Charity Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider text-blue-100 flex items-center space-x-1">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Verified Charity / Food Rescue Partner</span>
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold mt-2 tracking-tight">
              Welcome, {user?.firstName || user?.fullName || 'Charity Partner'}! 🏢
            </h1>
            <p className="text-blue-100 mt-1 text-sm sm:text-base">
              Connecting children's homes, elderly care centers, and shelters with fresh surplus food.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-center shrink-0">
            <p className="text-xs text-blue-100 uppercase font-semibold">Total Meals Rescued</p>
            <p className="text-3xl font-extrabold text-white mt-1">{totalMealsReceived + 75} Meals</p>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Available Nearby</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{availableFood.length} Listings</p>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Utensils className="h-6 w-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Reservations</p>
              <p className="text-2xl font-bold text-amber-600 mt-1">{reservations.length} Items</p>
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <Clock className="h-6 w-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Completed Rescues</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">{completedRescues.length} Pickups</p>
            </div>
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <PackageCheck className="h-6 w-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">CO2 Saved</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">62.8 kg</p>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <Leaf className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Main Section with Tabs */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6">
          {/* Navigation Tabs Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Food Rescue Hub</h2>
              <p className="text-sm text-slate-500">Browse available food, manage active claims, and view rescue history</p>
            </div>

            <div className="flex bg-slate-100 p-1 rounded-xl space-x-1">
              <button
                onClick={() => setActiveTab('available')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center space-x-1.5 ${
                  activeTab === 'available'
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Utensils className="h-3.5 w-3.5" />
                <span>Available Food ({availableFood.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('reservations')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center space-x-1.5 ${
                  activeTab === 'reservations'
                    ? 'bg-white text-amber-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Clock className="h-3.5 w-3.5" />
                <span>Reservations ({reservations.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('completed')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center space-x-1.5 ${
                  activeTab === 'completed'
                    ? 'bg-white text-purple-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <PackageCheck className="h-3.5 w-3.5" />
                <span>Completed Rescues ({completedRescues.length})</span>
              </button>
            </div>
          </div>

          {/* TAB 1: Available Food Nearby */}
          {activeTab === 'available' && (
            <div className="space-y-6">
              {/* Filters Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-700">
                  <Filter className="h-4 w-4 text-blue-600" />
                  <span>Filter Available Food:</span>
                </div>

                <div className="flex items-center space-x-3 text-xs">
                  <select
                    value={cityFilter}
                    onChange={(e) => setCityFilter(e.target.value)}
                    className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-700 outline-none font-medium"
                  >
                    <option value="all">All Cities</option>
                    <option value="colombo">Colombo</option>
                    <option value="kandy">Kandy</option>
                    <option value="galle">Galle</option>
                  </select>

                  <select
                    value={dietaryFilter}
                    onChange={(e) => setDietaryFilter(e.target.value)}
                    className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-700 outline-none font-medium"
                  >
                    <option value="all">All Dietary Types</option>
                    <option value="veg">🟢 Veg</option>
                    <option value="non-veg">🔴 Non-Veg</option>
                  </select>
                </div>
              </div>

              {/* Food Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAvailableFood.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:border-blue-400 transition-all hover:shadow-md space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                          {item.donorName}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">{item.distance}</span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 leading-snug">
                        {item.title}
                      </h3>

                      <div className="flex items-center space-x-1.5">
                        <span className={`px-2 py-0.5 text-xs font-bold rounded-lg ${
                          item.dietary === 'Veg' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {item.dietary === 'Veg' ? '🟢 Veg' : '🔴 Non-Veg'}
                        </span>
                        {item.isHalal && (
                          <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs font-bold rounded-lg">
                            🌙 Halal
                          </span>
                        )}
                      </div>

                      <div className="space-y-1 text-xs text-slate-600 pt-1">
                        <p><strong>Portions:</strong> {item.portions} Meals ({item.weight})</p>
                        <p><strong>Expiry Window:</strong> {item.expiryTime}</p>
                        <p><strong>Location:</strong> {item.address}, {item.city}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex space-x-2">
                      <button
                        onClick={() => setSelectedListing(item)}
                        className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center space-x-1"
                      >
                        <HeartHandshake className="h-4 w-4" />
                        <span>Reserve Food</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Current Reservations */}
          {activeTab === 'reservations' && (
            <div className="space-y-6">
              {reservations.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
                  <Clock className="h-10 w-10 text-slate-300 mx-auto mb-2" />
                  <p className="text-slate-600 font-semibold">No active reservations right now</p>
                  <p className="text-xs text-slate-400 mt-1">Browse available food nearby to reserve meals for your shelter.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {reservations.map((item) => (
                    <div 
                      key={item.id}
                      className="bg-amber-50/50 rounded-2xl border border-amber-200 p-6 space-y-4 shadow-sm"
                    >
                      <div className="flex justify-between items-start">
                        <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full">
                          Active Reservation
                        </span>
                        <span className="text-xs text-amber-800 font-semibold">Claimed {item.reservedAt}</span>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                        <p className="text-xs font-semibold text-amber-900 mt-0.5">Donor: {item.donorName}</p>
                      </div>

                      <div className="bg-white p-4 rounded-xl border border-amber-200/80 space-y-2 text-xs text-slate-700">
                        <p className="flex items-center space-x-2">
                          <Utensils className="h-4 w-4 text-emerald-600" />
                          <span><strong>Quantity:</strong> {item.portions} Meals ({item.weight})</span>
                        </p>
                        <p className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-rose-500" />
                          <span><strong>Pickup Address:</strong> {item.address}, {item.city}</span>
                        </p>
                        <p className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-blue-600" />
                          <span><strong>Donor Phone:</strong> {item.contact}</span>
                        </p>
                      </div>

                      <button
                        onClick={() => handleCompletePickup(item)}
                        className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center justify-center space-x-2"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Confirm Pickup Completed</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Completed Rescues & History */}
          {activeTab === 'completed' && (
            <div className="space-y-6">
              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-4">Food Description</th>
                      <th className="p-4">Donor Name</th>
                      <th className="p-4">Meals Received</th>
                      <th className="p-4">Completed Date</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                    {completedRescues.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50">
                        <td className="p-4 font-bold">{item.title}</td>
                        <td className="p-4 text-slate-600">{item.donorName}</td>
                        <td className="p-4 font-bold text-emerald-700">{item.portions} Meals ({item.weight})</td>
                        <td className="p-4 text-slate-500">{item.completedAt}</td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-full text-[11px] inline-flex items-center space-x-1">
                            <Check className="h-3 w-3" />
                            <span>Rescued</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Reserve Confirmation Modal */}
      {selectedListing && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5 relative">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <span className="px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-lg">
                  Confirm Food Reservation
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">
                  {selectedListing.title}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedListing(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <p><strong>Donor:</strong> {selectedListing.donorName}</p>
              <p><strong>Portions:</strong> {selectedListing.portions} Meals ({selectedListing.weight})</p>
              <p><strong>Expiry Window:</strong> {selectedListing.expiryTime}</p>
              <p><strong>Pickup Address:</strong> {selectedListing.address}, {selectedListing.city}</p>
              <p><strong>Contact Phone:</strong> {selectedListing.contact}</p>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs font-medium leading-relaxed">
              ⚠️ By reserving, you confirm your charity will arrange pickup before <strong>{selectedListing.expiryTime}</strong>.
            </div>

            <div className="pt-2 flex space-x-3">
              <button
                onClick={() => setSelectedListing(null)}
                className="flex-1 py-2.5 border border-slate-300 rounded-xl text-slate-700 font-semibold text-xs hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReservation}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-1"
              >
                <HeartHandshake className="h-4 w-4" />
                <span>Confirm Reservation</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
