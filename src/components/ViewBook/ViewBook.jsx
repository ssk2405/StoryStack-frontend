import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loder from '../Loder/Loder';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GrLanguage } from "react-icons/gr";
import { FaHeart, FaShoppingCart, FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useSelector } from 'react-redux';

const ViewBook = () => {
    const { id } = useParams();
    const navigate=useNavigate()
    const [Data, setData] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`https://backend-j6ni.onrender.com/api/v1/get-book-by-id/${id}`);
                setData(response.data?.data || null);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBook();
    }, [id]); 

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
    };

    const setfav = async () => {
        try {
            const response = await axios.put("https://backend-j6ni.onrender.com/api/v1/add-book-to-fav", {}, { headers });
            alert( response.data.message);
        } catch (error) {
            console.error("Error adding to favourites:", error);
        }
    };
 const setCart= async() =>{
    try {
        const response = await axios.put("https://backend-j6ni.onrender.com/api/v1/add-to-cart", {}, { headers });
        alert( response.data.message);
    } catch (error) {
        console.error("Error adding to cart:", error);
    }
 }
 const deleteBook=async()=>{
    try
        {
            const res=await axios.delete("https://backend-j6ni.onrender.com/api/v1/delete-book", {headers}

            )
       alert(res.data.message);
       navigate("/all-books")
    }
    catch (error) {
        console.error("Error deteling of book:", error);
    }
 }
    if (loading) {
        return (
            <div className="h-screen bg-blue-950 flex items-center justify-center">
                <Loder />
            </div>
        );
    }

    if (!Data) {
        return (
            <div className="h-screen bg-blue-950 flex items-center justify-center text-white text-2xl">
                Book not found.
            </div>
        );
    }

    return (
        <div className="px-4 md:px-12 py-8 bg-blue-950 flex flex-col md:flex-row gap-8">
            <div className="w-full lg:w-3/6">
                <div className="flex flex-col lg:flex-row justify-around bg-blue-800 p-12 rounded">
                    <img src={Data?.url} alt="Book Cover" className="h-[50vh] md:h-[60vh] lg:h-[70vh] rounded" />
                    
                    {/* User Buttons */}
                    {isLoggedIn && role === "user" && (
                        <div className="flex flex-col md:flex-row lg:flex-col p-3 mt-8 lg:mt-0 items-center justify-between lg:justify-start gap-4">
                            <button 
                                className="bg-white text-red-600 rounded lg:rounded-full text-2xl p-2 flex items-center justify-center lg:p-3"
                                onClick={setfav}
                            >
                                <FaHeart />
                                <span className="ml-2 lg:hidden">Favourites</span>
                            </button>

                            <button className="text-white rounded lg:rounded-full text-3xl p-2 bg-blue-600 flex items-center justify-center" onClick={setCart}>
                                <FaShoppingCart />
                                <span className="ml-2 lg:hidden">Add to cart</span>
                            </button>
                        </div>
                    )}

                    {/* Admin Buttons */}
                    {isLoggedIn && role === "admin" && (
                        <div className="flex flex-col md:flex-row lg:flex-col p-3 mt-8 lg:mt-0 items-center justify-between lg:justify-start gap-4">
                            <Link to={`/updateBook/${id}`} className="bg-white rounded lg:rounded-full text-2xl p-2 flex items-center justify-center lg:p-3">
                                <FaEdit />
                                <span className="ml-2 lg:hidden">Edit</span>
                            </Link>

                            <button className="text-red-600 rounded lg:rounded-full text-3xl p-2 bg-white flex items-center justify-center" onClick={deleteBook}>
                                <MdDeleteOutline />
                                <span className="ml-2 lg:hidden">Delete Book</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Book Details */}
            <div className="p-4 w-full lg:w-3/6">
                <h1 className="text-4xl text-zinc-200 font-semibold">{Data?.title}</h1>
                <p className="text-zinc-400 mt-1">by {Data?.author}</p>
                <p className="text-zinc-500 mt-4 text-xl">{Data?.desc}</p>
                <p className="text-zinc-400 mt-4 flex items-center">
                    <GrLanguage className="me-3" />
                    {Data?.language}
                </p>
                <p className="mt-4 text-zinc-100 text-3xl font-semibold">Price: ${Data?.price}</p>
            </div>
        </div>
    );
};

export default ViewBook;
