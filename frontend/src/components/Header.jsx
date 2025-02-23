import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src="/logo.png" alt="Zoho Projects Logo" className="h-8" />
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-gray-300">Sprints</a></li>
            <li><a href="#" className="hover:text-gray-300">BugTracker</a></li>
            <li><a href="#" className="hover:text-gray-300">CRM</a></li>
            <li><a href="#" className="hover:text-gray-300">Recruit</a></li>
            <li><a href="#" className="hover:text-gray-300">Tables</a></li>
            <li><a href="#" className="hover:text-gray-300">TeamInbox</a></li>
            <li><a href="#" className="hover:text-gray-300">All Products</a></li>
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          <select className="bg-gray-800 text-white border-none">
            <option>English</option>
          </select>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Sign In</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;