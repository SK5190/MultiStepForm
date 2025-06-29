import React from 'react';

interface SidebarProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentStep, onStepClick }) => {
  const steps = [
    { number: 1, title: 'YOUR INFO' },
    { number: 2, title: 'SELECT PLAN' },
    { number: 3, title: 'ADD-ONS' },
    { number: 4, title: 'SUMMARY' },
  ];

  return (
    <div 
      className="w-64 h-full bg-cover  bg-center rounded-l-xl p-9"
      style={{
        backgroundImage: "url('https://fem-multi-step-form-six.vercel.app/assets/bg-sidebar-desktop-e6d2744a.svg')"
      }}
    >
      <div className="flex flex-col gap-6">
        {steps.map((step) => (
          <div key={step.number} className="flex items-center gap-4 ">
            <div 
              onClick={() => onStepClick(step.number)}
              className={`w-10 h-10 rounded-full border-2 flex items-center  justify-center font-bold text-sm transition-colors cursor-pointer hover:scale-105 ${
                currentStep === step.number
                  ? 'bg-light-blue text-marine-blue border-none transition-all duration-300'
                  : 'bg-transparent text-white border-white'
              }`}
            >
              {step.number}
            </div>
            <div className=" md:block ">
              <p className="text-xs text-light-gray ">Step {step.number}</p>
              <p className="text-sm font-bold text-white uppercase">{step.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar; 