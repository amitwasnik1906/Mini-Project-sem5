import React from 'react';
import { AlertOctagon } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-white">
      <div className="space-y-6 text-center">
        <AlertOctagon 
          className="w-16 h-16 mx-auto text-blue-600 animate-pulse" 
          strokeWidth={1.5}
        />
        
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-gray-900">404</h1>
          <p className="text-gray-600">The page you're looking for cannot be found.</p>
        </div>

        <button 
          onClick={() => window.location.href = '/'}
          className="px-6 py-2 text-white transition-colors duration-200 bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Return Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;