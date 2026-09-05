import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Utensils, 
  HeartHandshake, 
  Truck, 
  Users, 
  ShieldCheck, 
  Leaf, 
  ArrowRight,
  PlusCircle,
  BarChart3
} from 'lucide-react';

export default function Home() {
  const stats = [
    { id: 1, name: 'Food Meals Saved', value: '12,450+', icon: Utensils, color: 'text-emerald-600 bg-emerald-50' },
    { id: 2, name: 'Active Donors', value: '340+', icon: Users, color: 'text-blue-600 bg-blue-50' },
    { id: 3, name: 'Partner NGOs', value: '85', icon: HeartHandshake, color: 'text-rose-600 bg-rose-50' },
    { id: 4, name: 'CO2 Waste Reduced', value: '4.8 Tons', icon: Leaf, color: 'text-amber-600 bg-amber-50' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-emerald-50/50 to-slate-50 py-16 lg:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
              <Leaf className="h-3.5 w-3.5" />
              <span>Zero Hunger • Zero Waste</span>
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Connecting Surplus Food With Those In Need
            </h1>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Empowering restaurants, supermarkets, and events to seamlessly donate surplus food to local shelters, food banks, and communities in real-time.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/signup"
                className="px-6 py-3 text-base font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <span>Get Started Now</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link 
                to="/signin"
                className="px-6 py-3 text-base font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl shadow-sm transition-all text-center"
              >
                Sign In to Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item) => {
            const IconComponent = item.icon;
            return (
              <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">{item.name}</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">{item.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl ${item.color}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works */}
      <section id="about" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">How It Works</h2>
          <p className="text-slate-600 mt-2">A simple, transparent process to reduce food waste.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center flex flex-col items-center">
            <div className="p-4 bg-emerald-50 text-emerald-600 rounded-full mb-6">
              <Utensils className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">1. Donors Post Surplus</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Restaurants and businesses list safe surplus food specifying quantity, dietary details, and pickup windows.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center flex flex-col items-center">
            <div className="p-4 bg-blue-50 text-blue-600 rounded-full mb-6">
              <Truck className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">2. Real-Time Matching</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Nearby verified NGOs and volunteer drivers receive instant alerts to claim and pick up food shipments.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center flex flex-col items-center">
            <div className="p-4 bg-purple-50 text-purple-600 rounded-full mb-6">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">3. Track & Verify</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Ensure safety standards, confirm delivery receipt, and track real-time environmental impact metrics.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
