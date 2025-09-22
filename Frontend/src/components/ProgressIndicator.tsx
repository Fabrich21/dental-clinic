import React from 'react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  currentStep, 
  totalSteps, 
  stepLabels 
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const isConnected = index < totalSteps - 1;

          return (
            <div key={stepNumber} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className={`
                relative flex items-center justify-center w-10 h-10 rounded-full border-2 font-medium text-sm
                ${isActive 
                  ? 'bg-teal-500 border-teal-500 text-white' 
                  : isCompleted 
                    ? 'bg-teal-500 border-teal-500 text-white'
                    : 'bg-gray-200 border-gray-300 text-gray-500'
                }
              `}>
                {isCompleted ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  stepNumber
                )}
              </div>

              {/* Step Label */}
              <div className="hidden md:block ml-3 flex-1">
                <p className={`text-sm font-medium ${
                  isActive ? 'text-teal-600' : isCompleted ? 'text-teal-500' : 'text-gray-500'
                }`}>
                  {stepLabels[index]}
                </p>
              </div>

              {/* Connector Line */}
              {isConnected && (
                <div className={`hidden md:block flex-1 h-0.5 mx-4 ${
                  isCompleted ? 'bg-teal-500' : 'bg-gray-300'
                }`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Step Labels */}
      <div className="md:hidden mt-4 text-center">
        <p className="text-sm font-medium text-teal-600">
          {stepLabels[currentStep - 1]}
        </p>
      </div>
    </div>
  );
};

export default ProgressIndicator;