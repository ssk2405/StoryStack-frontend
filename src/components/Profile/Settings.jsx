import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loder from "../Loder/Loder"
const Settings = () => 
{
  const [Value, setValue] = useState({address:""})
  const [ProfileData, setProfileData] = useState();
 const headers={
  id: localStorage.getItem("id"),
  authorization: `Bearer ${localStorage.getItem("token")}`,
 }
 const change=(e)=>{
  const {name, value}=e.target;
  setValue({...Value,[name]:value})
 }
 useEffect(()=>{
  const fetch= async()=>{
    const res= await axios.get("http://localhost:3000/api/v1/get-user-data", {headers}
    );
    setProfileData(res.data);
    setValue({address: res.data.address})
  };
  fetch()
 },[])
 const submitAddress=async()=>{
  const res= await axios.put("http://localhost:3000/api/v1/update-address",
    Value,{headers}
  );
  alert(res.data.message);
 }
  return (
    <div>
      {!ProfileData && <Loder/>}{""}
      {ProfileData && (
        <div className='h-[100%] p-0 md:p-4 text-zinc-200'>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-200'>Settings</h1>
          <div className='flex gap-12'>
            <div className=''>
              <label htmlFor=''>Username</label>
              <p className='p-2 rounded bg-blue-900 mt-2 font-semibold'>{ProfileData.username}</p>
            </div>
            <div className=''>
            <label htmlFor=''>Email</label>
            <p className='p-2 rounded bg-blue-900 mt-2 font-semibold'>{ProfileData.email}</p>
            </div>
          </div>
          <div className='mt-4 flex flex-col'>
            <label htmlFor=''>Address</label>
            <textarea className='p-2 rounded bg-blue-900 mt-2 font-semibold' rows="5"
            placeholder='Address'
            name="address"
            value={Value.address}
            onChange={change}
            />
          </div>
          <div className='mt-4 flex justify-end'>
            <button className='bg-yellow-500 text-blue-800 font-semibold px-3 py-2 rounded hover:bg-yellow-400 transition-all duration-300'onClick={submitAddress}>Update</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Settings
