import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Signup() {
  const [Value, setValue] = useState({
    username: "",
    email: "",
    password: "",
    address: ""
  });
  const navigate=useNavigate();
  const change = (e) => {
    const { name, value } = e.target;
    setValue({ ...Value, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault(); // Prevent page refresh
  
    if (!Value.username || !Value.email || !Value.password || !Value.address) {
      alert("All fields are required");
      return;
    }
  
    try {
      const response = await axios.post('https://backend-j6ni.onrender.com/api/v1/sign-up', Value);
      alert("Signup successful:", response.data);
  
      navigate("/login"); // Redirect after successful signup
    } catch (error) {
      console.log("Full error:", error);
      alert("Signup error: " + (error.response?.data?.message || error.message));
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 px-4">
      <div className="bg-zinc-800 rounded-lg px-8 py-8 w-full max-w-md">
        <p className="text-zinc-200 text-2xl text-center font-semibold">Sign Up</p>

        <form className="mt-6" onSubmit={submit}>
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
            <label htmlFor="email" className="text-zinc-400 block">Email</label>
            <input
              type="email"
              id="email"
              className="w-full mt-2 bg-blue-950 text-zinc-100 p-3 rounded outline-none"
              placeholder="xyz@gmail.com"
              name="email"
              required
              value={Value.email}
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

          <div className="mt-4">
            <label htmlFor="address" className="text-zinc-400 block">Address</label>
            <input
              type="text"
              id="address"
              className="w-full mt-2 bg-blue-950 text-zinc-100 p-3 rounded outline-none"
              placeholder="Enter your address"
              name="address"
              required
              value={Value.address}
              onChange={change}
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-400 transition duration-200"
            >
              Signup
            </button>
          </div>
        </form>

        <p className="text-center mt-6 text-zinc-100 font-semibold">Or</p>

        <p className="text-center mt-4 text-zinc-500">
          Already have an account?&nbsp;
          <Link to="/login" className="hover:text-blue-500">
            <u>Log In</u>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
