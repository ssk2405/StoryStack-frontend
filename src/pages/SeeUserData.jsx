import React from 'react';
import { RxCross1 } from "react-icons/rx";

const SeeUserData = ({ userDivData, userDiv, setuserDiv }) => {
  if (!userDivData) return null; // Don't render if data isn't available

  return (
    <div>
      {/* Background overlay */}
      <div className={`${userDiv} fixed top-0 left-0 h-screen w-full bg-blue-900 opacity-80 z-10`}></div>

      {/* User data popup */}
      <div className={`${userDiv} fixed top-0 left-0 h-screen w-full flex items-center justify-center z-20`}>
        <div className='bg-pink-300 rounded p-4 w-[80%] md:w-[50%] lg:w-[40%] shadow-lg'>
          <div className='flex items-center justify-between'>
            <h1 className='text-2xl text-blue-800 font-semibold'>User Information</h1>
            <button onClick={() => setuserDiv("hidden")} className="text-red-500 hover:scale-110 transition-all">
              <RxCross1 />
            </button>
          </div>
          <div className='mt-4 space-y-3'>
            <div>
              <label className='block text-sm text-zinc-900'>
                Username: <span className='font-semibold text-black'>{userDivData.username}</span>
              </label>
            </div>
            <div>
              <label className='block text-sm text-zinc-900'>
                Email: <span className='font-semibold text-black'>{userDivData.email}</span>
              </label>
            </div>
            <div>
              <label className='block text-sm text-zinc-900'>
                Address: <span className='font-semibold text-black'>{userDivData.address}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeeUserData;
