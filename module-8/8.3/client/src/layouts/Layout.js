// Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

function Layout() {
  return (
    <>
      <Navigation />
      <main id="content" class="min-h-screen flex flex-col bg-gradient-to-r from-customColor1 via-customColor2 to-customColor3 text-white">
       <div className="pl-16 pt-5 pb-5">
         <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Layout;