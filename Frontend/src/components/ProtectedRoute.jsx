import React, { useState } from 'react';
import { useUser, RedirectToSignIn } from '@clerk/react';
import { Link } from 'react-router-dom';
import { 
  ShieldAlert, 
  Utensils, 
  HeartHandshake, 
  ArrowRight, 
  RefreshCw, 
  CheckCircle2 
} from 'lucide-react';

export default function ProtectedRoute({ allowedRole, children }) {
  const { isLoaded, isSignedIn, user } = useUser();
  const [updatingRole, setUpdatingRole] = useState(false);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex items-center space-x-2 text-slate-500 text-sm font-medium animate-pulse">
          <RefreshCw className="h-5 w-5 animate-spin text-emerald-600" />
          <span>Verifying account permissions...</span>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <RedirectToSignIn redirectUrl={window.location.pathname} />;
  }

  // Get active role from Clerk metadata (defaults to 'donor' if unset)
  const currentRole = user.unsafeMetadata?.role || 'donor';

  // Function to change/set user role in Clerk metadata
  const handleSetRole = async (newRole) => {
    setUpdatingRole(true);
    try {
      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          role: newRole
        }
      });
      window.location.reload();
    } catch (err) {
      console.error('Failed to update role:', err);
    } finally {
      setUpdatingRole(false);
    }
  };

  // Check if user role matches allowed role for this route
  if (currentRole !== allowedRole) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-slate-200 shadow-xl text-center space-y-6">
          <div className="p-4 bg-rose-50 text-rose-600 rounded-2xl w-fit mx-auto border border-rose-100">
            <ShieldAlert className="h-10 w-10" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">Access Restricted</h2>
            <p className="text-slate-600 text-sm mt-2 leading-relaxed">
              This page is reserved exclusively for{' '}
              <strong className="text-slate-900 capitalize">{allowedRole}</strong> members.
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Your current account type is set to:{' '}
              <span className="font-bold text-emerald-700 uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {currentRole}
              </span>
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {/* Primary Action: Go to authorized dashboard */}
            <Link
              to={currentRole === 'donor' ? '/donors' : '/charity'}
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center space-x-2"
            >
              <span>Go to {currentRole === 'donor' ? 'Food Donor' : 'Charity'} Dashboard</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            {/* Role Switcher Option for Testing */}
            <div className="pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-500 mb-2">Switch your account role to access this section:</p>
              <button
                onClick={() => handleSetRole(allowedRole)}
                disabled={updatingRole}
                className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors flex items-center justify-center space-x-1.5"
              >
                {updatingRole ? (
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                )}
                <span>Switch Account Role to {allowedRole === 'charity' ? 'Charity / NGO' : 'Food Donor'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
