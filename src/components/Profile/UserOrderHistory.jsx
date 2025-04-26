import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loder from '../Loder/Loder';

const UserOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get("https://backend-j6ni.onrender.com/api/v1/get-order-history", { headers });
        console.log(res.data.data);
        setOrderHistory(res.data.data);
      } catch (err) {
        console.error("Error fetching order history:", err);
        setOrderHistory([]);
      }
    };
    fetchOrder();
  }, []);

  return (
    <div>
      {!orderHistory && (
        <div className='flex items-center justify-center h-[100%]'>
          <Loder />
        </div>
      )}
      {orderHistory && orderHistory.length === 0 && (
        <div className='h-[88vh] p-4 text-zinc-100'>
          <div className='h-[100%] flex flex-col items-center justify-center'>
            <h1 className='text-5xl font-semibold text-zinc-100 mb-8'>No Order History</h1>
          </div>
        </div>
      )}
      {orderHistory && orderHistory.length > 0 && (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
          <h1 className='text-3xl font-semibold text-zinc-100 mb-8'>Your Order History</h1>

          {orderHistory.map((order, i) => (
            <div key={order._id || i} className='mb-6 border border-blue-800 rounded-lg p-4 bg-blue-900'>
              <div className='flex justify-between items-center mb-3'>
                <div className='text-xl font-semibold'>Order #{i + 1}</div>
                <div className='text-sm text-zinc-400'>
                  {new Date(order.createdAt).toLocaleString()}
                </div>
              </div>

              <div className='mb-2 font-semibold'>
                Status:{" "}
                {order.status === "Order Placed" ? (
                  <span className='text-yellow-400'>{order.status}</span>
                ) : order.status === "Cancled" ? (
                  <span className='text-red-500'>{order.status}</span>
                ) : (
                  <span className='text-green-400'>{order.status}</span>
                )}
              </div>

              <div className='mt-4 bg-blue-800 w-full rounded py-2 px-4 flex gap-2 font-semibold'>
                <div className='w-[25%] text-center'>Book</div>
                <div className='w-[40%] text-center'>Description</div>
                <div className='w-[15%] text-center'>Price</div>
                <div className='w-[10%] text-center'>Mode</div>
              </div>

              {order.book?.map((book, index) => (
                <div key={book._id || index} className='bg-blue-900 w-full rounded py-2 px-4 flex gap-2 hover:bg-blue-950'>
                  
                  <div className='w-[25%] text-center'>
                    <Link to={`/view-book-details/${book._id}`} className="hover:text-blue-100">
                      {book.title}
                    </Link>
                  </div>
                  <div className='w-[40%]'>{book.desc?.slice(0, 50)}...</div>
                  <div className='w-[15%] text-center'>₹ {book.price}</div>
                  <div className='w-[10%] text-center text-zinc-300'>COD</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrderHistory;
