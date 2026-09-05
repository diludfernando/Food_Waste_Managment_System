import React from 'react';
import { SignIn as ClerkSignIn } from '@clerk/react';

export default function SignIn() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full flex justify-center">
        <ClerkSignIn 
          routing="path" 
          path="/signin" 
          signUpUrl="/signup" 
          fallbackRedirectUrl="/"
        />
      </div>
    </div>
  );
}
