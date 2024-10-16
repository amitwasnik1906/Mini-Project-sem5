import axios from 'axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

function Header({ user, setUser }) {

  const handleLogout = async () => {
    console.log(user);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${user.refreshToken}`,
        },
      };
      axios.get("http://localhost:4000/api/v1/user/logout", config)
      Cookies.remove('refreshToken');
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <header className="flex items-center justify-between px-6 py-2 shadow-md header">
      {/* Logo Section */}
      <div className="header__logo">
        <img src="" alt="" className="w-12 h-12" />
      </div>

      {/* Navigation Links */}
      <nav className="space-x-6 header__content">
        <Link to="/" className="transition-colors duration-300 hover:text-indigo-400">
          <span>Home</span>
        </Link>
        {
          !user?.isAuthority &&
          <>
            <Link to="/abuse-report-form" className="transition-colors duration-300 hover:text-indigo-400">
              <span>Submit Report</span>
            </Link>
            <Link to="/my-reports" className="transition-colors duration-300 hover:text-indigo-400">
              <span>My Report</span>
            </Link>
          </>
        }
        {
          user?.isAuthority &&
          <Link to="/authority-all-reports" className="transition-colors duration-300 hover:text-indigo-400">
            <span>All Reports</span>
          </Link>
        }
      </nav>

      {/* Profile Button & Logout */}
      <div className="flex items-center space-x-4 header__right">
        

        {!user ? (
          <Link to="/login">
            <button className="px-4 py-2 font-semibold text-white transition-colors duration-300 bg-indigo-500 rounded hover:bg-indigo-600">
              Login/Signup
            </button>
          </Link>
        ) : (
          <button onClick={handleLogout} className="px-4 py-2 font-semibold text-white transition-colors duration-300 bg-indigo-500 rounded hover:bg-indigo-600">
            Logout
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
