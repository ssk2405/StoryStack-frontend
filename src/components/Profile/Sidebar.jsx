import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/authSlice';


const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
const role=useSelector((state)=>state.auth.role)
  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove token from storage
    localStorage.removeItem('id');     // Remove user ID from storage
    dispatch(authActions.logout());     // Update Redux state
    navigate('/login');                 // Redirect to login page
  };

  return (
    <div className="bg-blue-900 p-3 rounded flex flex-col items-center justify-between h-full">
      <div className="flex items-center flex-col justify-center">
        <img 
          src={data?.avatar || 'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI='} 
          alt="User Avatar" 
          className="w-24 h-24 rounded-full"
        />
        <p className="mt-3 text-xl text-zinc-100 font-semibold">
          {data?.username || "Guest"}
        </p>
        <p className="mt-1 text-normal text-zinc-300">
          {data?.email || "No email provided"}
        </p>
        <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"></div>
      </div>

      {role==="user" && 
      <div className="w-full flex-col items-center justify-center hidden lg:flex">
        <Link
          to="/profile"
          className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-blue-500 rounded transition-all duration-300"
        >
          Favourites
        </Link>
        <Link
          to="/profile/orderHistory"
          className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-blue-500 rounded transition-all duration-300"
        >
          Order History
        </Link>
        <Link
          to="/profile/settings"
          className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-blue-500 rounded transition-all duration-300"
        >
          Settings
        </Link>
      </div>}
        {role==="admin" && <div className="w-full flex-col items-center justify-center hidden lg:flex">
        <Link
          to="/profile"
          className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-blue-500 rounded transition-all duration-300"
        >
        All  Order 
        </Link>
        <Link
          to="/profile/add-book"
          className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-blue-500 rounded transition-all duration-300"
        >
          Add Book
        </Link>
      </div> }
      {/* Logout Button */}
      <button 
        
        className="mt-6 text-red-500 font-semibold w-full py-2 text-center hover:bg-red-600 hover:text-white rounded transition-all duration-300"
        onClick={()=>{
          dispatch(authActions.logout())
          dispatch(authActions.changeRole("user"));
          localStorage.clear("id");
          localStorage.clear("token");
          localStorage.clear("role");
          history("/");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
