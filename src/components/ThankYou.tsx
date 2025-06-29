import React from 'react';

const ThankYou: React.FC = () => {
  return (
    <div className="max-w-md mx-auto text-center">
      <div className="mb-8">
        <div className="w-16 h-16 bg-purplish-blue rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-marine-blue mb-2">Thank you!</h1>
        <p className="text-cool-gray">
          Thanks for confirming your subscription! We hope you have fun using our platform. 
          If you ever need support, please feel free to email us at xyz@gmail.com.
        </p>
      </div>
    </div>
  );
};

export default ThankYou; 