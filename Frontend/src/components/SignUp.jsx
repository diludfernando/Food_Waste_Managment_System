import React from 'react';
import { SignUp as ClerkSignUp } from '@clerk/react';

export default function SignUp() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full flex justify-center">
        <ClerkSignUp 
          routing="path" 
          path="/signup" 
          signInUrl="/signin" 
          fallbackRedirectUrl="/donors"
          forceRedirectUrl="/donors"
        />
      </div>
    </div>
  );
}
