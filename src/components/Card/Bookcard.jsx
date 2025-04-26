import React from 'react'
import {Link} from "react-router-dom";
import axios from 'axios';

const Bookcard =({data, favourite})=> {
  const headers={
    id: localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };
  const removeBook = async () => {
    try {
      const response = await axios.put(
        "https://backend-j6ni.onrender.com/api/v1/remove-book-from-fav",
        {},
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert("Failed to remove book from favourites.");
    }
  };
  return (
    
    <div className='bg-blue-800 rounded p-4 flex-col'>
    <Link to={`/view-book-details/${data._id}`}>
    <div className=''>
        <div className='bg-blue-900 rounded flex items-center justify-center'>
          <img src={data.url} alt="/" className='h-[25vh]'/>
          </div>
        <h2 className='mt-4 text-xl  font-semibold'>{data.title}</h2>
        <p className='mt-2 text-zinc-300 font-semibold'>by{data.author}</p>
        <p className='mt-2 text-zinc-100 font-semibold'>${data.price}</p>
        </div>
        </Link>
      {favourite && (
        <button className='bg-yellow-100  px-4 py-2 rounded border-yellow-500 text-yellow-500' onClick={removeBook}>
          Remove from fav
        </button>
        )}
        </div>
  )
};

export default Bookcard
