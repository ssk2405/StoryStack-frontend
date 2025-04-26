import React, { useEffect, useState } from 'react';
import Loder from '../components/Loder/Loder';
import axios from 'axios';
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState(0);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/get-user-cart", { headers });
        setCart(res.data.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchCart();
  }, []);

  const deleteItem = async (bookId) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/remove-book-from-cart/${bookId}`,
        {},
        { headers }
      );
      alert(response.data.message);
      setCart(prevCart => prevCart.filter(item => item._id !== bookId));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  useEffect(() => {
    if (cart && cart.length > 0) {
      const totalAmount = cart.reduce((acc, item) => acc + item.price, 0);
      setTotal(totalAmount);
    }
  }, [cart]);

  const placeOrder = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/place-order`,
        { order: cart },
        { headers }
      );
      alert(response.data.message);
      navigate("/profile/orderHistory", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='bg-blue-900 px-12 h-screen py-8'>
      {!cart && (
        <div className='w-full h-full flex items-center justify-center'>
          <Loder />
        </div>
      )}

      {cart && cart.length === 0 && (
        <div className='h-full flex items-center justify-center flex-col'>
          <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-200'>Empty Cart</h1>
        </div>
      )}

      {cart && cart.length > 0 && (
        <>
          <h1 className='text-5xl font-semibold text-white mb-8'>Your cart</h1>
          {cart.map((item, i) => (
            <div
              className='w-full my-4 rounded flex flex-col md:flex-row p-4 bg-blue-950 justify-between items-center'
              key={i}
            >
              <img
                src={item.url}
                alt='Book'
                className='h-[20vh] md:h-[10vh] object-cover'
              />
              <div className='w-full md:w-auto'>
                <h1 className='text-2xl text-zinc-200 font-semibold text-start mt-2 md:mt-0'>{item.title}</h1>
                <p className='text-normal text-zinc-300 mt-2 hidden lg:block'>{item.desc.slice(0, 100)}...</p>
                <p className='text-normal text-zinc-300 mt-2 hidden md:block lg:hidden'>{item.desc.slice(0, 65)}...</p>
                <p className='text-normal text-zinc-300 mt-2 block md:hidden'>{item.desc.slice(0, 100)}...</p>
              </div>
              <div className='flex mt-4 w-full md:w-auto items-center justify-between'>
                <h2 className='text-zinc-100 text-3xl font-semibold'>${item.price}</h2>
                <button
                  className='bg-red-100 text-red-600 border-red-700 rounded p-2 ms-12'
                  onClick={() => deleteItem(item._id)}
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {cart && cart.length > 0 && (
        <div className='mt-4 w-full flex items-center justify-end'>
          <div className='p-4 bg-blue-950 rounded'>
            <h1 className='text-3xl text-zinc-100 font-semibold'>Total Amount</h1>
            <div className='mt-3 flex items-center justify-between gap-4 text-xl text-zinc-100'>
              <h2>{cart.length} books</h2>
              <h2>${total.toFixed(2)}</h2>
            </div>
            <div className='w-full mt-3'>
              <button
                className='bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-blue-600 hover:text-white transition'
                onClick={placeOrder}
              >
                Place Your Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
