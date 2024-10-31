import React from 'react';

export const ContactButton = () => {
  return (
    <a 
      href="/contact"
      className="bg-green-500 text-white rounded-full px-4 py-2 hover:bg-green-700 transition duration-300 text-lg"
    >
      Contact Me
    </a>
  );
};