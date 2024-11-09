import React, { useState } from 'react';
import ReportData from '../components/Reportdata';
import UpdatesAndCommits from '../components/UpdatesAndCommits';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MessageCircle, Loader2, Shield } from 'lucide-react';

function Report({ user }) {
  const [commit, setCommit] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${user?.refreshToken}`,
        },
      };

      await axios.post(
        "http://localhost:4000/api/v1/user/give-commit",
        { reportId: id, msg: commit },
        config
      );

      setShowSuccess(true);
      setCommit("");
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="px-4 py-8 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Main Report Section */}
          <div className="space-y-6 lg:col-span-8">
            {/* Report Details Card */}
            <div className="overflow-hidden bg-white border-2 rounded-lg shadow-md border-slate-200">
              <div className="px-6 py-4 border-b-2 border-slate-200 bg-slate-50">
                <h2 className="text-lg font-medium text-slate-800">Report Details</h2>
              </div>
              <div className="p-6">
                <ReportData user={user} />
              </div>
            </div>

            {/* Communication Section */}
            <div className="overflow-hidden bg-white border-2 rounded-lg shadow-md border-slate-200">
              <div className="px-6 py-4 border-b-2 border-slate-200 bg-slate-50">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-slate-800">Case Communication</h2>
                  <span className="text-sm text-slate-500">Confidential</span>
                </div>
              </div>
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-700">
                      Add Update
                    </label>
                    <textarea
                      value={commit}
                      onChange={(e) => setCommit(e.target.value)}
                      rows="4"
                      className="w-full px-4 py-3 transition-all duration-200 ease-in-out bg-white border-2 rounded-lg resize-none text-slate-800 border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 placeholder-slate-400"
                      placeholder="Enter case update or response..."
                    />
                    <p className="mt-1 text-sm text-slate-500">
                      All communications are logged and encrypted
                    </p>
                  </div>

                  <div className="flex items-center justify-end space-x-4">
                    <span className="text-sm text-slate-500">
                      {commit.length} characters
                    </span>
                    <button
                      type="submit"
                      disabled={isLoading || !commit.trim()}
                      className={`flex items-center px-5 py-2.5 rounded-lg font-medium text-sm
                                transition-all duration-200 
                                ${isLoading || !commit.trim() 
                                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                                  : 'bg-teal-600 text-white hover:bg-teal-700 active:scale-98'}`}
                    >
                      {isLoading ? (
                        <Loader2 className="mr-2 animate-spin" size={18} />
                      ) : (
                        <MessageCircle className="mr-2" size={18} />
                      )}
                      {isLoading ? 'Sending...' : 'Send Update'}
                    </button>
                  </div>
                </form>

                {showSuccess && (
                  <div className="mt-4 p-4 bg-teal-50 border-2 border-teal-200 rounded-lg 
                                flex items-center justify-center text-teal-700 text-sm
                                animate-[slideUp_0.3s_ease-out]">
                    Update sent successfully
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Case Updates */}
          <div className="space-y-6 lg:col-span-4">
            <div className="overflow-hidden bg-white border-2 rounded-lg shadow-md border-slate-200">
              <div className="px-6 py-4 border-b-2 border-slate-200 bg-slate-50">
                <h2 className="text-lg font-medium text-slate-800">Case Updates</h2>
              </div>
              <div className="p-6">
                <UpdatesAndCommits user={user} />
              </div>
            </div>

            {/* Quick Resources Card */}
            <div className="overflow-hidden bg-white border-2 rounded-lg shadow-md border-slate-200">
              <div className="px-6 py-4 border-b-2 border-slate-200 bg-slate-50">
                <h2 className="text-lg font-medium text-slate-800">Resources</h2>
              </div>
              <div className="p-6">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center text-teal-600 hover:text-teal-700">
                    <Shield className="mr-2" size={16} />
                    <a href="#" className="hover:underline">Response Guidelines</a>
                  </li>
                  <li className="flex items-center text-teal-600 hover:text-teal-700">
                    <Shield className="mr-2" size={16} />
                    <a href="#" className="hover:underline">Support Services Directory</a>
                  </li>
                  <li className="flex items-center text-teal-600 hover:text-teal-700">
                    <Shield className="mr-2" size={16} />
                    <a href="#" className="hover:underline">Emergency Contacts</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(0.5rem);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default Report;