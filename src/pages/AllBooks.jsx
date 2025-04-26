import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loder from '../components/Loder/Loder';
import Bookcard from '../components/Card/Bookcard';

function AllBooks() {
    const [Data, setData] = useState([]); // Initialize as empty array

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/get-all-books");
                setData(response.data?.data || []); // Handle undefined response
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetch();
    }, []);

    return (
        <div className='bg-blue-950 h-auto  px-12 py-8'>
            {" "}
            <h4 className='text-3xl text-yellow-200'>All books</h4>

            {!Data.length && (
                <div className='w-full h-screen flex items-center justify-center'><Loder/>
      </div>
            )}

            <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8'>
                {Data.map((items, i) => (
                    <div key={i}>
                        <Bookcard data={items} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AllBooks;
