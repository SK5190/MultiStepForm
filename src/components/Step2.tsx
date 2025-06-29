import React from 'react';

interface FormData {
  plan: string;
  billing: 'monthly' | 'yearly';
}

interface Step2Props {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const plans = [
  {
    id: 'arcade',
    name: 'Arcade',
    monthlyPrice: 9,
    yearlyPrice: 90,
    icon: '🎮',
  },
  {
    id: 'advanced',
    name: 'Advanced',
    monthlyPrice: 12,
    yearlyPrice: 120,
    icon: '🚀',
  },
  {
    id: 'pro',
    name: 'Pro',
    monthlyPrice: 15,
    yearlyPrice: 150,
    icon: '👑',
  },
];

const Step2: React.FC<Step2Props> = ({ formData, updateFormData, onNext, onBack }) => {
  const handlePlanSelect = (planId: string) => {
    updateFormData({ plan: planId });
  };

  const handleBillingToggle = () => {
    updateFormData({ billing: formData.billing === 'monthly' ? 'yearly' : 'monthly' });
  };

  const getPrice = (plan: typeof plans[0]) => {
    return formData.billing === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-marine-blue mb-2">Select your plan</h1>
        <p className="text-cool-gray">You have the option of monthly or yearly billing.</p>
      </div>

      <div className="space-y-4 mb-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => handlePlanSelect(plan.id)}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
              formData.plan === plan.id
                ? 'border-purplish-blue bg-magnolia'
                : 'border-light-gray hover:border-purplish-blue'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="text-2xl">{plan.icon}</div>
              <div className="flex-1">
                <h3 className="font-bold text-marine-blue">{plan.name}</h3>
                <p className="text-cool-gray text-sm">
                  ${getPrice(plan)}/{formData.billing === 'monthly' ? 'mo' : 'yr'}
                </p>
                {formData.billing === 'yearly' && (
                  <p className="text-marine-blue text-sm">2 months free</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-magnolia rounded-lg p-4 mb-8">
        <div className="flex items-center justify-center gap-6">
          <span className={`text-sm font-medium ${formData.billing === 'monthly' ? 'text-marine-blue' : 'text-cool-gray'}`}>
            Monthly
          </span>
          <button
            onClick={handleBillingToggle}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              formData.billing === 'yearly' ? 'bg-marine-blue' : 'bg-marine-blue'
            }`}
          >
            <div
              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                formData.billing === 'yearly' ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`text-sm font-medium ${formData.billing === 'yearly' ? 'text-marine-blue' : 'text-cool-gray'}`}>
            Yearly
          </span>
        </div>
      </div>

      <div className="flex justify-between pt-8">
        <button
          onClick={onBack}
          className="text-cool-gray hover:text-marine-blue transition-colors"
        >
          Go Back
        </button>
        <button
          onClick={onNext}
          className="bg-marine-blue text-white px-6 py-3 rounded-lg hover:bg-marine-blue/90 transition-colors"
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

export default Step2; 