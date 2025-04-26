import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loder from '../components/Loder/Loder';
import { FaUserLarge } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { FaCheck } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import SeeUserData from './SeeUserData';

const AllOrders = () => {
    const [AllOrders, setAllOeders] = useState([]);
    const [Options, setOptions] = useState(-1);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [userDiv, setuserDiv] = useState("hidden");
    const [userDivData, setuserDivData] = useState(null);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
    };

    useEffect(() => {
        const fetch = async () => {
            const res = await axios.get("http://localhost:3000/api/v1/get-all-order", { headers });
            setAllOeders(res.data.data);
        };
        fetch();
    }, []);

    const submitChanges = async (i) => {
        const id = AllOrders[i]._id;  
        try {
            const res = await axios.put(
                `http://localhost:3000/api/v1/upadte-data/${id}`, 
                { status: selectedStatus },
                { headers }
            );
            alert(res.data.message);  
            setOptions(-1); 
            const updatedOrders = [...AllOrders];
            updatedOrders[i].status = selectedStatus;  
            setAllOeders(updatedOrders);  
    
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update order status.");
        }
    };

    return (
        <>
            {!AllOrders && (
                <div className='h-[100%] flex items-center justify-center'>
                    <Loder />
                </div>
            )}

            {AllOrders && AllOrders.length > 0 && (
                <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
                    <h1 className='text-3xl md:text-5xl font-semibold text-zinc-400 mb-8'>All Orders</h1>
                    <div className='mt-4 bg-blue-800 w-full rounded py-2 px-4 flex gap-2 font-semibold'>
                        <div className='w-[25%] text-center'>Books</div>
                        <div className='w-[40%] text-center'>Description</div>
                        <div className='w-[15%] text-center'>Price</div>
                        <div className='w-[10%] text-center'>Status</div>
                        <div className='w-[10%] md:w-[5%]'>
                            <FaUserLarge />
                        </div>
                    </div>

                    {AllOrders.map((items, i) => (
                        <div key={i} className='bg-blue-900 w-full rounded py-2 px-4 flex gap-2 hover:bg-blue-950 hover:cursor-pointer transition-all duration-300'>
                            <div className='w-[3%]'>
                                <h1 className='text-center'>{i + 1}</h1>
                            </div>
                            <div className='w-[40%] md:w-[22%]'>
                                <Link to={`/view-book-details/${items.book[0]?._id}`} className='hover:text-blue-200'>
                                    {items.book[0]?.title || "No Title"}
                                </Link>
                            </div>
                            <div className='w-0 md:w-[45%] hidden md:block'>
                                <h1>{items.book[0]?.desc?.slice(0, 50) || "No description"}...</h1>
                            </div>
                            <div className='w-[17%] md:w-[9%]'>
                                <h1>$ {items.book[0]?.price || "N/A"}</h1>
                            </div>
                            <div className='w-[30%] md:w-[16%]'>
                                <h1 className='font-semibold'>
                                    <button
                                        className='hover:scale-105 transition-all duration-300'
                                        onClick={() => {
                                            setOptions(i);
                                            setSelectedStatus(items.status);
                                        }}
                                    >
                                        {items.status === "Order Placed" ? (
                                            <div className='text-yellow-500'>{items.status}</div>
                                        ) : items.status === "Canceled" ? (
                                            <div className='text-red-500'>{items.status}</div>
                                        ) : (
                                            <div className='text-green-500'>{items.status}</div>
                                        )}
                                    </button>

                                    <div className={`${Options === i ? "flex" : "hidden"} mt-1 gap-2`}>
                                        <select
                                            name='status'
                                            className='bg-blue-900'
                                            value={selectedStatus}
                                            onChange={(e) => setSelectedStatus(e.target.value)}
                                        >
                                            {[
                                                "Order Placed",
                                                "Out for Delivery",
                                                "Delivered",
                                                "Canceled",
                                            ].map((statusOption, idx) => (
                                                <option value={statusOption} key={idx}>
                                                    {statusOption}
                                                </option>
                                            ))}
                                        </select>
                                        <button
                                            className='text-green-500 hover:text-pink-600 mx-2'
                                            onClick={() => submitChanges(i)}
                                        >
                                            <FaCheck />
                                        </button>
                                    </div>
                                </h1>
                            </div>
                            <div className='w-[10%] md:w-[5%]'>
                                <button
                                    className='text-xl hover:text-orange-500'
                                    onClick={() => {
                                        setuserDiv("fixed");
                                        setuserDivData(items.user);
                                    }}
                                >
                                    <IoOpenOutline />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {userDivData && (
                <SeeUserData
                userDivData={userDivData}
                userDiv={userDiv}
                setuserDiv={setuserDiv}
                />
            )}
        </>
    );
};

export default AllOrders;
