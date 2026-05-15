import React, { useState } from 'react';
import { Bell, MessageSquare, LogOut, ChevronDown } from 'lucide-react';
import streamingLogo from '../../assets/streaming.png';

const TopNav = ({ onLogout, activeTab = 'Market', onTabChange }) => {
  const [showNotification, setShowNotification] = useState(false);

  const tabs = [
    'Market', 'Portfolio', 'Quote', 'TFEX', 'Click', 'Bids Offers',
    'Ticker', 'Options Sum.', 'Technical'
  ];

  return (
    <div className="flex items-center justify-between border-b border-[#193254] bg-[#090e19] h-[52px] w-full px-4 select-none font-sans relative z-50">
      
      {/* Left section: Logo and Tabs */}
      <div className="flex items-center h-full">
        {/* Logo */}
        <div className="flex items-center justify-center mr-6">
          <img src={streamingLogo} alt="Streaming Logo" className="h-[28px] object-contain" />
        </div>

        {/* Text Tabs */}
        <div className="hidden md:flex flex-row items-center h-full">
          {tabs.map((tab) => (
            <button 
              key={tab} 
              onClick={() => onTabChange && onTabChange(tab)}
              className={`px-3 lg:px-[18px] h-full text-[13px] transition-colors border-r border-[#193254] ${
                activeTab === tab 
                  ? 'text-white font-medium bg-[#101c2c]' 
                  : 'text-[#757575] hover:text-[#ffffff] hover:bg-[#101c2c]'
              }`}
            >
              {tab}
            </button>
          ))}
          <button className="flex items-center gap-1 px-3 lg:px-[18px] h-full text-[13px] text-[#757575] hover:text-[#ffffff] hover:bg-[#101c2c] transition-colors border-r border-[#193254]">
            More <ChevronDown size={14} className="mt-[2px]" />
          </button>
        </div>
      </div>

      {/* Right section: Icons */}
      <div className="flex items-center h-full text-[#757575] gap-1 md:border-l border-[#193254] relative">
        <button 
          onClick={() => setShowNotification(!showNotification)}
          className="flex flex-col items-center justify-center hover:text-[#ffffff] hover:bg-[#101c2c] h-full transition-colors w-[60px] group relative"
        >
          <Bell size={16} className="mb-1" />
          <span className="text-[9px] font-medium hidden lg:block group-hover:text-white">Notification</span>
          <div className={`absolute top-2 right-4 w-2 h-2 bg-[#ff0000] rounded-full transition-opacity ${showNotification ? 'opacity-100' : 'opacity-0'}`}></div>
        </button>
        
        <button className="flex flex-col items-center justify-center hover:text-[#ffffff] hover:bg-[#101c2c] h-full transition-colors w-[60px] border-l border-[#193254] group">
          <MessageSquare size={16} className="mb-1" />
          <span className="text-[9px] font-medium hidden lg:block group-hover:text-white">Feedback</span>
        </button>
        
        <button 
          onClick={onLogout}
          className="flex flex-col items-center justify-center hover:text-[#ffffff] hover:bg-[#101c2c] h-full transition-colors w-[60px] border-l border-[#193254] group"
        >
          <LogOut size={16} className="mb-1" />
          <span className="text-[9px] font-medium hidden lg:block group-hover:text-white">Logout</span>
        </button>

        {/* Dropdown Placeholder for notifications */}
        {showNotification && (
          <div className="absolute top-[52px] right-0 w-64 bg-[#101c2c] border border-[#193254] rounded-b-[4px] shadow-lg p-4 z-50">
            <p className="text-[#ffffff] text-[12px] text-center">No new notifications</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default TopNav;
