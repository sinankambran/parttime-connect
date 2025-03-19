import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Chatbot from "./chatbot"
const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Chatbot />
    </div>
  );
};

export default Layout;