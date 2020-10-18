import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import { useSelector } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';


function App() {
  const userSignin = useSelector(state=>state.userSignin);
  const {userInfo} = userSignin;
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  }

  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  }

  return (
    <BrowserRouter>
    <div className="grid-container">
      <header className="header">
        <div className="brand">
          <button onClick={openMenu}>
            &#9776;
                </button>
          <Link to="/" >360 D Restaurant Menu</Link>
          
        </div>
        <div className="header-links">
            <Link to="/cart">Cart </Link>
          {
            userInfo ? <Link to="/profile">{userInfo.name}</Link>:
            <Link to="/signin">Signin</Link>
          }
        </div>
      </header>
      <aside className="sidebar">
        <h3>Categories</h3>
        <button className="sidebar-close-button" onClick={closeMenu} >X</button>
        <ul>
          <li>
            <a href="index.html">Appetizers</a>
          </li>
          <li>
            <a href="index.html">Main Courses</a>
          </li>
        </ul>
      </aside>
      <main className="main">
        <div className="content">
          <Route path="/products" component={ProductsScreen} />
          <Route path="/payment" component={PaymentScreen} />
            <Route path="/order/:id" component={OrderScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/signin" component={SigninScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/" exact={true} component={HomeScreen} />
          
          
            </div>

        </main>
        <footer className="footer">
          All rights Reserved.
        </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
