import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import Header from './components/Header';
import Signup from './components/Signup';
import Login from './components/Login';
import './App.css';
import CustomItemContext from './context/ItemContext';
import HomePage from './components/HomePage';
import OrderHistory from './components/OrderHistory';
import AdminPage from './components/AdminPage';
import AdminLogin from './components/AdminLogin';
import AdminOrder from './components/AdminOrder';
const App = () => {
    return (
        <Router>
            <CustomItemContext>
                <Routes>
                <Route path="/" element={<HomePage />} />
                    <Route path="/view" element={<ProductList />} />
                    <Route path="/orders" component={<OrderHistory/>} />
                    <Route path='/admin/page' element={<AdminPage/>}></Route>
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin/order" element={<AdminOrder />} />
                </Routes>
            </CustomItemContext>
        </Router>
    );
};

export default App;

