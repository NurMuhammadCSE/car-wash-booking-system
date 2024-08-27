import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
        <p className="text-gray-700 mb-8">Thank you for your payment. Your booking has been confirmed.</p>
        <div className="flex justify-center mb-6">
          <svg
            className="w-16 h-16 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <button
          onClick={handleGoHome}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-500 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
