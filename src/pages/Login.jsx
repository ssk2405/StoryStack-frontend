import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { authActions } from '../store/authSlice';
import axios from 'axios';
import { useDispatch } from 'react-redux';

function Login() {
  const [Value, setValue] = useState({
      username: "",
      password: "",
    });
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const change = (e) => {
      const { name, value } = e.target;
      setValue({ ...Value, [name]: value });
    };
  
    const submit = async (e) => {
      e.preventDefault(); // Prevent page refresh
    
      if (!Value.username ||  !Value.password) {
        alert("All fields are required");
        return;
      }
    
      try {
        const response = await axios.post('http://localhost:3000/api/v1/sign-in ', Value);

        dispatch(authActions.login())
        dispatch(authActions.changeRole(response.data.role))
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        navigate("/");
       // navigate("/login"); // Redirect after successful signup
      } catch (error) {
        alert("Signup error:", error.response?.data || error.message);
      }
    };
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 px-4">
      <div className="bg-zinc-800 rounded-lg px-8 py-8 w-full max-w-md">
        <p className="text-zinc-200 text-2xl text-center font-semibold">Log In</p>

        <form className="mt-6">
          <div>
            <label htmlFor="username" className="text-zinc-400 block">Username</label>
            <input
              type="text"
              id="username"
              className="w-full mt-2 bg-blue-950 text-zinc-100 p-3 rounded outline-none"
              placeholder="Enter your username"
              name="username"
              required
              value={Value.username}
              onChange={change}
            />
          </div>

          <div className="mt-4">
            <label htmlFor="password" className="text-zinc-400 block">Password</label>
            <input
              type="password"
              id="password"
              className="w-full mt-2 bg-blue-950 text-zinc-100 p-3 rounded outline-none"
              placeholder="Enter your password"
              name="password"
              required
              value={Value.password}
              onChange={change}
            />
          </div>

          <div className="mt-6">
            <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-400 transition duration-200" onClick={submit} >
              Login
            </button>
          </div>
        </form>

        <p className="text-center mt-6 text-zinc-100 font-semibold">Or</p>

        <p className="text-center mt-4 text-zinc-500">
          Don't have an account?&nbsp;
          <Link to="/signup" className="hover:text-blue-500">
            <u>Sign Up</u>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
