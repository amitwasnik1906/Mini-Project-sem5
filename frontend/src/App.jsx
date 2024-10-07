import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Header from "./components/Header"
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AbuseReportForm from './pages/AbuseReportForm';
import MyReports from './pages/MyReports';
import Report from './pages/Report';
import AuthorityAllReports from './pages/AuthorityAllReports';
import AuthorityViewReport from './pages/AuthorityViewReport';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const Layout = ({ children, user, setUser, refreshToken, setRefreshToken }) => {
  return (
    <>
      <Header user={user} setUser={setUser} refreshToken={refreshToken} setRefreshToken={setRefreshToken} />
      <div className='app__main'>
        {children}
      </div>
    </>
  );
};

function App() {
  const [user, setUser] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const navigate = useNavigate();

  const token = Cookies.get('refreshToken');

  const getUserDetails = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${refreshToken}`,
        },
      };

      const { data } = await axios.get(`http://localhost:4000/api/v1/user/get-user-details`, config);

      setUser(data.user)
    } catch (error) {
      console.error("Error fetching user details:", error.response ? error.response.data : error.message);
    }
  };

  const setToken = () => {
    setRefreshToken(token)
    console.log(refreshToken);
  }

  useEffect(() => {
    setToken(); 
  }, [token]);

  useEffect(() => {
    if (refreshToken) {
      getUserDetails(); 
    }
  }, [refreshToken]); 

  return (
    <Routes>
      <Route exact path="/" element={<Layout> <Home /> </Layout>} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<Signup />} />

      <Route exact path="/abuse-report-form" element={<Layout><AbuseReportForm /></Layout>} />
      <Route exact path="/my-reports" element={<Layout><MyReports /></Layout>} />
      <Route exact path="/report/:id" element={<Layout><Report /></Layout>} />

      <Route exact path='/authority-all-reports' element={<Layout><AuthorityAllReports /></Layout>} />
      <Route exact path='/authority-view-report/:id' element={<Layout><AuthorityViewReport /></Layout>} />

    </Routes>
  );
}

export default App;