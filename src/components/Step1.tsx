import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
}

interface Step1Props {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
}

const Step1: React.FC<Step1Props> = ({ formData, updateFormData, onNext }) => {
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'This field is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'This field is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'This field is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    updateFormData({ [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-marine-blue mb-2">Personal info</h1>
        <p className="text-cool-gray">Please provide your name, email address, and phone number.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-marine-blue mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="e.g. Raj Kumar"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purplish-blue ${
              errors.name ? 'border-strawberry-red' : 'border-light-gray'
            }`}
          />
          {errors.name && (
            <p className="text-strawberry-red text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-marine-blue mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="e.g. rajkumar@gmail.com"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purplish-blue ${
              errors.email ? 'border-strawberry-red' : 'border-light-gray'
            }`}
          />
          {errors.email && (
            <p className="text-strawberry-red text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-marine-blue mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="e.g. +91 23456 78901"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purplish-blue ${
              errors.phone ? 'border-strawberry-red' : 'border-light-gray'
            }`}
          />
          {errors.phone && (
            <p className="text-strawberry-red text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <div className="flex justify-end pt-8">
          <button
            type="submit"
            className="bg-marine-blue text-white px-6 py-3 rounded-lg hover:bg-marine-blue/90 transition-colors"
          >
            Next Step
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step1; 