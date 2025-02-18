import React, { useState } from 'react';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className='bg-slate-400 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>

        {/* Logo */}
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-900'>Real</span>
            <span className='text-slate-600'>Estate</span>
          </h1>
        </Link>

        {/* Search Bar (Hidden on Mobile) */}
        <form className='hidden sm:flex bg-slate-100 p-2 rounded-lg items-center'>
          <input 
            type="text" 
            placeholder='Search...' 
            className='bg-transparent focus:outline-none w-24 sm:w-64' 
          />
          <FaSearch className="text-slate-700 ml-2" />
        </form>

        {/* Hamburger Menu Button (Visible on Mobile) */}
        <button 
          className='sm:hidden text-slate-900 text-2xl' 
          onClick={() => setMenuOpen(true)}
        >
          <FaBars />
        </button>

        {/* Fullscreen Menu Overlay */}
        {menuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-md flex items-center justify-center transition-opacity duration-300">
            {/* White Menu Container */}
            <div className="bg-white w-full h-full flex flex-col items-center justify-center relative">
              
              {/* Close Button */}
              <button 
                className="absolute top-6 right-6 text-gray-700 text-3xl hover:text-red-500 transition-colors duration-300"
                onClick={() => setMenuOpen(false)}
              >
                <FaTimes />
              </button>

              {/* Navigation Links */}
              <nav className="text-center space-y-6 text-lg">
                <Link to='/' onClick={() => setMenuOpen(false)}>
                  <li className='text-gray-700 hover:text-blue-600 transition-colors duration-300'>Home</li>
                </Link>
                <Link to="/about" onClick={() => setMenuOpen(false)}>
                  <li className='text-gray-700 hover:text-blue-600 transition-colors duration-300'>About</li>
                </Link>
                <Link to="/signin" onClick={() => setMenuOpen(false)}>
                  <li className='text-gray-700 hover:text-blue-600 transition-colors duration-300'>Sign In</li>
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
