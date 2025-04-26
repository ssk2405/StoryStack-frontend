import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaLinesLeaning } from "react-icons/fa6";
import { useSelector } from 'react-redux';

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); 
  const role = useSelector((state) => state.auth.role);
  

  // Dynamically build links
  const links = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/all-books" },
    ...(isLoggedIn ? [{ title: "Cart", link: "/cart" }] : []),
    ...(isLoggedIn && role === "user" ? [{ title: "Profile", link: "/profile" }] : []),
    ...(isLoggedIn && role === "admin" ? [{ title: "Admin Profile", link: "/profile" }] : [])
  ];
  const [MobileNav, setMobileNav] = useState("hidden");

  return (
    <>
      <nav className="relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
        <Link to='/' className='flex items-center'>
          <img className='h-10 me-4' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3fwAq89Tx6CaUqBtH271jR0m486IzWuhqOBRDOAgBiGN8jbQcWL1ta4xMuP3jihCj6bk&usqp=CAU' alt="Logo"/>
          <h1 className='text-2xl font-semibold'>StoryStack</h1>
        </Link>
        <div className='nav-links-storystack block md:flex items-center gap-4'>
          <div className='hidden md:flex gap-4'>
            {links.map((items, i) => (
              <Link to={items.link} className='hover:text-red-600 transition-all duration-300' key={i}>
                {items.title}
              </Link>
            ))}
          </div>
          {!isLoggedIn && (
            <div className='hidden md:flex gap-4'>
              <Link to='/Login' className='px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition duration-300'>
                LogIn
              </Link>
              <Link to='/Signup' className='px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition duration-300'>
                SignUp
              </Link>
            </div>
          )}
          <button className='block md:hidden text-white text-2xl hover:text-zinc-400' onClick={() => setMobileNav(MobileNav === "hidden" ? "block" : "hidden")}>
            <FaLinesLeaning />
          </button>
        </div>
      </nav>
      <div className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
        {links.map((items, i) => (
          <Link
            to={items.link}
            className="text-white text-4xl mb-8 font-semibold hover:text-red-600 transition-all duration-300"
            key={i}
            onClick={() => setMobileNav("hidden")}
          >
            {items.title}
          </Link>
        ))}
        {!isLoggedIn && (
          <>
            <Link
  to='/Login'
  className="mb-8 text-3xl font-semibold px-8 py-2 border border-blue-500 rounded text-white hover:text-zinc-800 transition duration-300"
  onClick={() => setMobileNav("hidden")}
>
  LogIn
</Link>
<Link
  to='/Signup'
  className="mb-8 text-3xl font-semibold px-8 py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition duration-300"
  onClick={() => setMobileNav("hidden")}
>
  SignUp
</Link>
          </>
        )}
      </div>
    </>
  );
}

export default Navbar;
