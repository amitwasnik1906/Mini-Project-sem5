import React, { useEffect, useState } from 'react';

// Mock function to simulate fetching the report from a backend or local storage
const fetchReport = () => {
  return {
    victimName: 'John Doe',
    victimPhone: '555-5678', // Added phone number
    abuseType: 'Physical Abuse',
    gender: 'Male',
    age: 25,
    victimState: 'California',
    victimCity: 'Los Angeles',
    incidentLocation: 'Public Park',
    incidentState: 'California',
    incidentCity: 'Los Angeles',
    incidentDate: '2024-09-23',
    description: 'A detailed description of the incident that took place at the park.',
    witnessName: 'Jane Doe',
    witnessPhone: '555-1234',
    evidence: 'evidence_file.pdf',
    consent: true,
    legalDisclaimer: true,
    status: 'Under Investigation', // New field for report status
  };
};

const ReportData = () => {
  const [reportData, setReportData] = useState(null);

  // Simulate fetching the report data when the component mounts
  useEffect(() => {
    const report = fetchReport();
    setReportData(report);
  }, []);

  if (!reportData) {
    return <p className="text-center mt-10">Loading report...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Submitted Report</h1>

      {/* Victim's Info Section */}
      <h2 className="text-xl font-semibold mb-4 text-blue-600">Victim's Info</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <p><strong>Name Of Victim:</strong> {reportData.victimName}</p>
        <p><strong>Phone Number:</strong> {reportData.victimPhone}</p> {/* Added Phone Number */}
        <p><strong>Type Of Abuse:</strong> {reportData.abuseType}</p>
        <p><strong>Gender:</strong> {reportData.gender}</p>
        <p><strong>Age Of Victim:</strong> {reportData.age}</p>
        <p><strong>State:</strong> {reportData.victimState}</p>
        <p><strong>City:</strong> {reportData.victimCity}</p>
      </div>

      {/* Incident Info Section */}
      <h2 className="text-xl font-semibold mb-4 text-blue-600">Incident Info</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <p><strong>Location Of Incident:</strong> {reportData.incidentLocation}</p>
        <p><strong>State:</strong> {reportData.incidentState}</p>
        <p><strong>City:</strong> {reportData.incidentCity}</p>
        <p><strong>Date Of Incident:</strong> {reportData.incidentDate}</p>
      </div>
      <p className="mb-6"><strong>Detailed Description:</strong> {reportData.description}</p>

      {/* Witness Info (Optional) */}
      {reportData.witnessName && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <p><strong>Witness Name:</strong> {reportData.witnessName}</p>
          <p><strong>Witness Phone:</strong> {reportData.witnessPhone}</p>
        </div>
      )}

      {/* Evidence File */}
      {reportData.evidence && (
        <div className="mb-6">
          <strong>Supporting Evidence:</strong>{' '}
          <a href={`path_to_files/${reportData.evidence}`} className="text-blue-600 underline" download>
            {reportData.evidence}
          </a>
        </div>
      )}

      {/* Status of the Report */}
      <div className="mb-6">
        <strong>Report Status:</strong>{' '}
        <span className={`px-2 py-1 rounded ${reportData.status === 'Resolved' ? 'bg-green-200' : 'bg-yellow-200'}`}>
          {reportData.status}
        </span>
      </div>  

    </div>
  );
};

export default ReportData;
