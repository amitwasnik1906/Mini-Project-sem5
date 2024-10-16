import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function UpdatesAndCommits({ user }) {
  const [updatesAndCommits, setUpdatesAndCommits] = useState([])
  const { id } = useParams()

  const getData = async ()=>{
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${user?.refreshToken}`,
        },
      };

      const { data } = await axios.get(`http://localhost:4000/api/v1/user/get-updates-and-commits/${id}`, config);
      setUpdatesAndCommits(data.updatesAndCommites)
      console.log(data.updatesAndCommites);
      
    } catch (error) {
      console.log(error);
    }
  }

  const getDataByAuthority = async ()=>{
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${user?.refreshToken}`,
        },
      };

      const { data } = await axios.get(`http://localhost:4000/api/v1/authority/get-updates-and-commits/${id}`, config);
      setUpdatesAndCommits(data.updatesAndCommites)
      console.log(data.updatesAndCommites);
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user && id && user.isAuthority == false) {
      getData()
    }
    if (user && id && user.isAuthority == true) {
      getDataByAuthority()
    }
  }, [user, id]);

  return (
    <div className='max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 mb-6'>
      {
        updatesAndCommits?.map((unc)=> (
          <div key={unc._id} className='shadow-lg mb-4 p-3'>
            {unc.role === "user" ? 
              <span className=' font-medium'>You</span> :
              <span className=' font-medium'>Authority</span>
            }
            <p>
              {unc.msg}
            </p>
          </div>
        ))
      }
    </div>
  )
}

export default UpdatesAndCommits
