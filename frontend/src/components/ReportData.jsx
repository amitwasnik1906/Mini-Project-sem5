import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ReportData = ({ user }) => {
  const [reportData, setReportData] = useState(null);
  const { id } = useParams()

  const getReportData = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${user?.refreshToken}`,
        },
      };

      const { data } = await axios.get(`http://localhost:4000/api/v1/user/report/${id}`, config);
      setReportData(data.report)
    } catch (error) {
      console.log(error);
    }
  }

  const getReportDataByAuthority = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${user?.refreshToken}`,
        },
      };

      const { data } = await axios.get(`http://localhost:4000/api/v1/authority/report/${id}`, config);
      setReportData(data.report)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user && id && user.isAuthority == false) {
      getReportData()
    }
    if (user && id && user.isAuthority == true) {
      getReportDataByAuthority()
    }

  }, [user, id]);

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
      </div>

      {/* Incident Info Section */}
      <h2 className="text-xl font-semibold mb-4 text-blue-600">Incident Info</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <p><strong>Location Of Incident:</strong> {reportData.incidentLocation}</p>
        <p><strong>State:</strong> {reportData.incidentState}</p>
        <p><strong>City:</strong> {reportData.incidentCity}</p>
        <p><strong>Date Of Incident:</strong>{new Date(reportData.incidentDate).toLocaleDateString()} </p>
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
