import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header({ user, setUser }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    // ... (keep existing logout logic)
    setUser(null);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Submit Report', path: '/abuse-report-form' },
    { name: 'My Reports', path: '/my-reports' },
  ];

  return (
    <header className="bg-white shadow-md">
      <div className="container px-4 py-3 mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="flex items-center justify-center w-10 h-10 transition-all duration-300 bg-blue-600 rounded-full group-hover:scale-110 group-hover:shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-blue-600">Break the Silence</h1>
              <p className="text-xs text-blue-400">SECURE & ANONYMOUS</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden space-x-6 md:flex">
            {navItems.map((item) => (
              user?.isAuthority && item.name !== 'Home' ? null : (
                <Link
                  key={item.name}
                  to={item.path}
                  className="relative text-blue-600 transition-all duration-300 group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              )
            ))}
            {user?.isAuthority && (
              <Link
                to="/authority-all-reports"
                className="relative text-blue-600 transition-all duration-300 group"
              >
                All Reports
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )}
          </nav>

          {/* Auth Button */}
          <div>
            {!user ? (
              <Link to="/login">
                <button className="px-4 py-2 font-semibold text-white transition-all duration-300 transform bg-blue-600 rounded-full hover:bg-blue-700 hover:scale-105 hover:shadow-lg">
                  Login/Signup
                </button>
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="px-4 py-2 font-semibold text-white transition-all duration-300 transform bg-blue-600 rounded-full hover:bg-blue-700 hover:scale-105 hover:shadow-lg"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-blue-600 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="pb-4 mt-4 space-y-2 md:hidden">
            {navItems.map((item) => (
              user?.isAuthority && item.name !== 'Home' ? null : (
                <Link
                  key={item.name}
                  to={item.path}
                  className="block py-2 text-blue-600 transition-colors duration-300 hover:bg-blue-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            ))}
            {user?.isAuthority && (
              <Link
                to="/authority-all-reports"
                className="block py-2 text-blue-600 transition-colors duration-300 hover:bg-blue-100"
                onClick={() => setIsMenuOpen(false)}
              >
                All Reports
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;