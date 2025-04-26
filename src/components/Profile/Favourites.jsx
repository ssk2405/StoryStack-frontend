import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Bookcard from "../Card/Bookcard";

const Favourites = () => {
  const [FavouriteBooks, setFavouriteBooks] = useState(null); 
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/get-fav-book", { headers });
        setFavouriteBooks(response.data.data || []);
      } catch (error) {
        console.error("Error fetching favourite books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, []); // ✅ fixed infinite loop

  if (loading) {
    return <div className="text-center text-white">Loading favourites...</div>;
  }

  return (
    <>
      {FavouriteBooks?.length === 0 ? (
        <div className='text-4xl font-semibold text-zinc-200 h-[100%] flex items-center justify-center w-full'>
          No fav book
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {FavouriteBooks.map((item, i) => (
            <div key={i}>
              <Bookcard data={item} favourite={true} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Favourites;
