import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Profile/Sidebar';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loder/Loder';
import MobileNav from '../components/Profile/MobileNav';

function Profile() {
  const [profile, setProfile] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("https://backend-j6ni.onrender.com/api/v1/get-user-data", { headers });
        setProfile(response.data || null);  // safe fallback
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="bg-blue-950 min-h-screen px-2 md:px-12 flex flex-col md:flex-row py-8 gap-4 text-white">
      {!profile ? (
        <div className="w-full flex justify-center items-center min-h-[50vh]">
          <Loader />
        </div>
      ) : (
        <>
          <div className="w-full md:w-1/4 lg:w-1/5">
            <Sidebar data={profile} />
            <MobileNav/>
          </div>
          <div className="w-full md:w-3/4 lg:w-4/5">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
