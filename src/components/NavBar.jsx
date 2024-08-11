import React from 'react';
import { Link } from 'react-router-dom';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const NavBar = ({ toggleTheme, darkMode }) => {
  return (
    <nav className="w-screen p-4 bg-gray-200 dark:bg-gray-800 text-black dark:text-white flex justify-around space-between items-center">
      <div className="flex space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        {/* <Link to="/about" className="hover:underline">About</Link>
        <Link to="/contact" className="hover:underline">Contact</Link> */}
        <Link to="/events" className="hover:underline">Events</Link>
      </div>
      <button
        onClick={toggleTheme}
        className="px-4 py-2 bg-blue-500 text-white rounded dark:bg-yellow-500 flex items-center"
      >
        {darkMode ? (
          <SunIcon className="h-5 w-5 text-white" />
        ) : (
          <MoonIcon className="h-5 w-5 text-white" />
        )}
      </button>
    </nav>
  );
};

export default NavBar;
