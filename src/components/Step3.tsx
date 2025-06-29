import React from 'react';

interface AddOns {
  onlineService: boolean;
  largerStorage: boolean;
  customizableProfile: boolean;
}

interface FormData {
  addOns: AddOns;
  billing: 'monthly' | 'yearly';
}

interface Step3Props {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const addOns = [
  {
    id: 'onlineService',
    name: 'Online service',
    description: 'Access to multiplayer games',
    monthlyPrice: 1,
    yearlyPrice: 10,
  },
  {
    id: 'largerStorage',
    name: 'Larger storage',
    description: 'Extra 1TB of cloud save',
    monthlyPrice: 2,
    yearlyPrice: 20,
  },
  {
    id: 'customizableProfile',
    name: 'Customizable Profile',
    description: 'Custom theme on your profile',
    monthlyPrice: 2,
    yearlyPrice: 20,
  },
];

const Step3: React.FC<Step3Props> = ({ formData, updateFormData, onNext, onBack }) => {
  const handleAddOnToggle = (addOnId: keyof AddOns) => {
    updateFormData({
      addOns: {
        ...formData.addOns,
        [addOnId]: !formData.addOns[addOnId],
      },
    });
  };

  const getPrice = (addOn: typeof addOns[0]) => {
    return formData.billing === 'monthly' ? addOn.monthlyPrice : addOn.yearlyPrice;
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-marine-blue mb-2">Pick add-ons</h1>
        <p className="text-cool-gray">Add-ons help enhance your gaming experience.</p>
      </div>

      <div className="space-y-4 mb-8">
        {addOns.map((addOn) => (
          <div
            key={addOn.id}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
              formData.addOns[addOn.id as keyof AddOns]
                ? 'border-purplish-blue bg-magnolia'
                : 'border-light-gray hover:border-purplish-blue'
            }`}
            onClick={() => handleAddOnToggle(addOn.id as keyof AddOns)}
          >
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={formData.addOns[addOn.id as keyof AddOns]}
                onChange={() => handleAddOnToggle(addOn.id as keyof AddOns)}
                className="w-5 h-5 text-purplish-blue border-light-gray rounded focus:ring-purplish-blue"
              />
              <div className="flex-1">
                <h3 className="font-bold text-marine-blue">{addOn.name}</h3>
                <p className="text-cool-gray text-sm">{addOn.description}</p>
              </div>
              <div className="text-purplish-blue text-sm">
                +${getPrice(addOn)}/{formData.billing === 'monthly' ? 'mo' : 'yr'}
              </div>
            </div>
          </div>
        ))}
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

export default Step3; 