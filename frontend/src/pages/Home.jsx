import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className=' mb-10'>
        <img src="/photo.png" alt="" />
      </div>
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Welcome to the Abuse Reporting System</h1>

        <p className="text-lg mb-6 text-gray-700 text-center">
          Our platform provides a secure and confidential environment for victims to report cases of abuse.
          This system is designed to ensure that your reports are handled with the highest level of care and transparency, 
          all the way through from submission to resolution.
        </p>

        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>

        <div className="text-center mb-10">
          <div className="flex justify-around items-center mb-8">
            <div className="flex-1">
              <div className="bg-blue-200 p-4 rounded-lg shadow-lg">
                <h3 className="font-semibold text-lg">1. Submit Report</h3>
                <p className="text-gray-600 mt-2">
                  Victims can submit their reports online, detailing the type of abuse, incident location, and any available evidence.
                </p>
              </div>
            </div>
            <div className="flex-1">
              <div className="h-1 w-20 bg-gray-300 mx-4"></div>
            </div>
            <div className="flex-1">
              <div className="bg-yellow-200 p-4 rounded-lg shadow-lg">
                <h3 className="font-semibold text-lg">2. Case Investigation</h3>
                <p className="text-gray-600 mt-2">
                  The authority reviews the submitted reports, initiates an investigation, and provides updates on the case status.
                </p>
              </div>
            </div>
            <div className="flex-1">
              <div className="h-1 w-20 bg-gray-300 mx-4"></div>
            </div>
            <div className="flex-1">
              <div className="bg-green-200 p-4 rounded-lg shadow-lg">
                <h3 className="font-semibold text-lg">3. Case Resolved</h3>
                <p className="text-gray-600 mt-2">
                  Upon completing the investigation, the case is marked as resolved, and the victim is notified.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => alert('Start Report Submission')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
          >
            Start Report Submission
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
