import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { ContactButton } from '../components/ContactButton';
import { DiscoverMoreButton } from '../components/DiscoverMoreButton';


function Layout() {
  const location = useLocation();
  const isContactPage = location.pathname==='/contact';
  const isHomePage = location.pathname==='/';

  return (
    
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-customColor1 via-customColor2 to-customColor3 text-white">
      <Navigation />
      <main id="content" className="flex-grow">
       <div className="pl-16 pt-5 pb-5 pr-16">
         <Outlet />
       </div>
       {!isContactPage && (
          <div className="flex justify-center my-4">
            {isHomePage ? (<DiscoverMoreButton />) 
            : (<ContactButton />)}
          </div>
       )}
          
      </main>
      <Footer />
    </div>
   
  );
}

export default Layout;