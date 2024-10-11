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
import AuthorityLogin from './pages/AuthorityLogin';
import AuthoritySignup from './pages/AuthoritySignup';
import NotFound from './pages/NotFound';

const Layout = ({ children, user, setUser }) => {
  return (
    <>
      <Header user={user} setUser={setUser} />
      <div className='app__main'>
        {children}
      </div>
    </>
  );
};

function App() {
  const [user, setUser] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [isAuthority, setIsAuthority] = useState(null)
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

      setUser({ _id: data.user._id, name: data.user.name, refreshToken: data.user.refreshToken, isAuthority })
    } catch (error) {
      console.error("Error fetching user details:", error.response ? error.response.data : error.message);
    }
  };

  const getAuthorityDetails = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${refreshToken}`,
        },
      };

      const { data } = await axios.get(`http://localhost:4000/api/v1/authority/get-authority-details`, config);

      setUser({ _id: data.authority._id, name: data.authority.name, refreshToken: data.authority.refreshToken, isAuthority })
    } catch (error) {
      console.error("Error fetching user details:", error.response ? error.response.data : error.message);
    }
  };

  const checkIsAuthority = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${refreshToken}`,
        },
      };

      const { data } = await axios.get("http://localhost:4000/api/v1/authority/check", config)
      setIsAuthority(data.isAuhority)

    } catch (error) {
      console.log(error);
    }
  }

  const setToken = () => {
    setRefreshToken(token)
  }

  useEffect(() => {
    setToken();
  }, [token]);

  useEffect(() => {
    if (refreshToken && isAuthority == false) {
      getUserDetails();
    }
    if (refreshToken && isAuthority == true) {
      getAuthorityDetails();
    }
  }, [refreshToken, isAuthority]);

  useEffect(() => {
    if (refreshToken) {
      checkIsAuthority()
    }
  }, [refreshToken]);

  return (
    <Routes>
      <Route exact path="/" element={<Layout user={user} setUser={setUser}> <Home /> </Layout>} />

      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<Signup />} />

      <Route exact path="/authority/login" element={<AuthorityLogin />} />
      <Route exact path="/authority/signup" element={<AuthoritySignup />} />

      {
        isAuthority !== true &&
        <Route exact path="/abuse-report-form" element={<Layout user={user} setUser={setUser} > <AbuseReportForm user={user} /> </Layout>} />
      }
      {
        isAuthority != true &&
        <Route exact path="/my-reports" element={<Layout user={user} setUser={setUser} > <MyReports user={user} /> </Layout>} />
      }
      {
        isAuthority != true &&
        <Route exact path="/report/:id" element={<Layout user={user} setUser={setUser} > <Report user={user} /> </Layout>} />
      }


      <Route exact path='/authority-all-reports' element={<Layout user={user} setUser={setUser} > <AuthorityAllReports user={user} /> </Layout>} />
      <Route exact path='/authority/report/:id' element={<Layout user={user} setUser={setUser} > <AuthorityViewReport user={user} /> </Layout>} />

      <Route path="*" element={<Layout user={user} setUser={setUser} > <NotFound /></Layout>}/>

    </Routes>
  );
}

export default App;