import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import ThankYou from './components/ThankYou';
import './App.css';

interface FormData {
  // Step 1: Personal Info
  name: string;
  email: string;
  phone: string;
  
  // Step 2: Select Plan
  plan: string;
  billing: 'monthly' | 'yearly';
  
  // Step 3: Add-ons
  addOns: {
    onlineService: boolean;
    largerStorage: boolean;
    customizableProfile: boolean;
  };
}

const App = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    plan: 'arcade',
    billing: 'monthly',
    addOns: {
      onlineService: false,
      largerStorage: false,
      customizableProfile: false,
    },
  });

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConfirm = () => {
    setCurrentStep(5); // Show thank you page
  };

  const handleStepClick = (step: number) => {
    // Only allow navigation to steps 1-4 (not the thank you page)
    if (step >= 1 && step <= 4) {
      setCurrentStep(step);
    }
  };

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData({ ...formData, ...updates });
  };

  return (
    <div className="min-h-screen bg-magnolia flex items-center justify-center p-4">
      <div className="bg-white p-3 rounded-xl shadow-lg max-w-4xl w-full h-[600px] flex ">
        <Sidebar currentStep={currentStep} onStepClick={handleStepClick} />
        
        <div className="flex-1 p-8 lg:p-12 overflow-y-auto">
          {currentStep === 1 && (
            <Step1 
              formData={formData} 
              updateFormData={updateFormData} 
              onNext={handleNext} 
            />
          )}
          
          {currentStep === 2 && (
            <Step2 
              formData={formData} 
              updateFormData={updateFormData} 
              onNext={handleNext} 
              onBack={handleBack} 
            />
          )}
          
          {currentStep === 3 && (
            <Step3 
              formData={formData} 
              updateFormData={updateFormData} 
              onNext={handleNext} 
              onBack={handleBack} 
            />
          )}
          
          {currentStep === 4 && (
            <Step4 
              formData={formData} 
              onConfirm={handleConfirm} 
              onBack={handleBack} 
            />
          )}
          
          {currentStep === 5 && (
            <ThankYou />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
