import React from 'react';

interface AddOns {
  onlineService: boolean;
  largerStorage: boolean;
  customizableProfile: boolean;
}

interface FormData {
  plan: string;
  billing: 'monthly' | 'yearly';
  addOns: AddOns;
}

interface Step4Props {
  formData: FormData;
  onConfirm: () => void;
  onBack: () => void;
}

const plans = [
  { id: 'arcade', name: 'Arcade', monthlyPrice: 9, yearlyPrice: 90 },
  { id: 'advanced', name: 'Advanced', monthlyPrice: 12, yearlyPrice: 120 },
  { id: 'pro', name: 'Pro', monthlyPrice: 15, yearlyPrice: 150 },
];

const addOns = [
  { id: 'onlineService', name: 'Online service', monthlyPrice: 1, yearlyPrice: 10 },
  { id: 'largerStorage', name: 'Larger storage', monthlyPrice: 2, yearlyPrice: 20 },
  { id: 'customizableProfile', name: 'Customizable Profile', monthlyPrice: 2, yearlyPrice: 20 },
];

const Step4: React.FC<Step4Props> = ({ formData, onConfirm, onBack }) => {
  const selectedPlan = plans.find(plan => plan.id === formData.plan);
  const selectedAddOns = addOns.filter(addOn => formData.addOns[addOn.id as keyof AddOns]);

  const getPlanPrice = () => {
    if (!selectedPlan) return 0;
    return formData.billing === 'monthly' ? selectedPlan.monthlyPrice : selectedPlan.yearlyPrice;
  };

  const getAddOnPrice = (addOn: typeof addOns[0]) => {
    return formData.billing === 'monthly' ? addOn.monthlyPrice : addOn.yearlyPrice;
  };

  const getTotalPrice = () => {
    const planPrice = getPlanPrice();
    const addOnsPrice = selectedAddOns.reduce((total, addOn) => total + getAddOnPrice(addOn), 0);
    return planPrice + addOnsPrice;
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-marine-blue mb-2">Finishing up</h1>
        <p className="text-cool-gray">Double-check everything looks OK before confirming.</p>
      </div>

      <div className="bg-magnolia rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-marine-blue">
              {selectedPlan?.name} ({formData.billing === 'monthly' ? 'Monthly' : 'Yearly'})
            </h3>
            <button className="text-cool-gray underline text-sm hover:text-purplish-blue">
              Change
            </button>
          </div>
          <span className="font-bold text-marine-blue">
            ${getPlanPrice()}/{formData.billing === 'monthly' ? 'mo' : 'yr'}
          </span>
        </div>

        {selectedAddOns.length > 0 && (
          <div className="border-t border-light-gray pt-4 space-y-3">
            {selectedAddOns.map((addOn) => (
              <div key={addOn.id} className="flex items-center justify-between">
                <span className="text-cool-gray text-sm">{addOn.name}</span>
                <span className="text-marine-blue text-sm">
                  +${getAddOnPrice(addOn)}/{formData.billing === 'monthly' ? 'mo' : 'yr'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between px-6 mb-8">
        <span className="text-cool-gray text-sm">
          Total (per {formData.billing === 'monthly' ? 'month' : 'year'})
        </span>
        <span className="text-2xl font-bold text-purplish-blue">
          ${getTotalPrice()}/{formData.billing === 'monthly' ? 'mo' : 'yr'}
        </span>
      </div>

      <div className="flex justify-between pt-8">
        <button
          onClick={onBack}
          className="text-cool-gray hover:text-marine-blue transition-colors"
        >
          Go Back
        </button>
        <button
          onClick={onConfirm}
          className="bg-purplish-blue text-white px-6 py-3 rounded-lg hover:bg-purplish-blue/90 transition-colors"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Step4; 