import React, { useEffect } from 'react';
import Home from './pages/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/cart'; 
import Profile from './pages/Profile';
import AllBooks from './pages/AllBooks';
import ViewBook from './components/ViewBook/ViewBook';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/authSlice';
import Favourites from './components/Profile/Favourites';
import UserOrderHistory from './components/Profile/UserOrderHistory';
import Settings from './components/Profile/Settings';
import AllOrders from './pages/AllOrders';
import AddBook from './pages/AddBook';
import UpdateBook from './pages/UpdateBook';

function App() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, [dispatch]); // Added dependency

  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/all-books' element={<AllBooks />} />
        <Route exact path='/cart' element={<Cart />} /> {/* Fixed component name */}
        <Route exact path='/profile' element={<Profile />}>
        {role ==="user" ?(<Route index element={<Favourites/>}/>): (<Route index element={<AllOrders/>}/>)}

        {role ==="admin" && <Route path='/profile/add-book' index element={<AddBook/>}/>}
        <Route path='/profile/orderHistory' element={<UserOrderHistory/>}/>
        <Route path='/profile/settings' element={<Settings/>}/>
        </Route>
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/updateBook/:id' element={<UpdateBook/>} />
        <Route path='/view-book-details/:id' element={<ViewBook />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

