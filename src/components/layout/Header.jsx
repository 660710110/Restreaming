import React, { useState, useEffect } from 'react';
import { Monitor, Clock, Moon, Sun } from 'lucide-react';
import MyLogo from '../../assets/TNITY.png';

const Header = ({ isDarkMode, setIsDarkMode }) => {

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formattedDate = currentTime.toDateString();
    const formattedTime = currentTime.toLocaleTimeString('en-US', { hour12: false });

    // 📍 ฟังก์ชันเช็คสถานะตลาดหุ้นไทย (SET)
    const checkMarketStatus = () => {
        const day = currentTime.getDay(); // 0 = Sunday, 1-5 = Mon-Fri, 6 = Saturday
        if (day === 0 || day === 6) return false; // ปิดวันเสาร์-อาทิตย์

        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const timeInMinutes = hours * 60 + minutes;

        // ตลาดเช้า: 10:00 (600 นาที) ถึง 12:30 (750 นาที)
        const isMorningSession = timeInMinutes >= 600 && timeInMinutes <= 750;
        // ตลาดบ่าย: 14:30 (870 นาที) ถึง 16:30 (990 นาที)
        const isAfternoonSession = timeInMinutes >= 870 && timeInMinutes <= 990;

        return isMorningSession || isAfternoonSession;
    };

    const isMarketOpen = checkMarketStatus();

  return (
    <header className="flex items-center justify-between pl-8 pr-8 py-3 bg-white dark:bg-[#090e19] border-b border-gray-300 dark:border-[#1e3a8a] sticky top-0 z-50 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 flex items-center justify-center p-1 rounded-md bg-gray-100 dark:bg-gray-800 transition">
          <img 
            src={MyLogo}       
            alt="Trinity Logo"  
            className="w-full h-full object-contain"
          />
        </div>
        <div>
            <h1 className="text-gray-900 dark:text-white font-medium text-sm">บริษัทหลักทรัพย์ ทรีนีตี้ จำกัด</h1>
            <p className="text-gray-500 dark:text-gray-400 text-xs">Trinity Securities Co.,Ltd</p>
        </div>
        <button className="hidden md:flex items-center gap-2 text-xs px-3 py-1.5 rounded transition ml-2 bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-[#1e293b] dark:text-white dark:hover:bg-[#334155]">
          <Monitor size={14} /> E - Trade
        </button>
      </div>

      <div className="hidden lg:flex items-center gap-6 text-xs">
        
        {/* 📍 ปรับให้แสดงสถานะตามจริง (เขียว = เปิด, แดง = ปิด) */}
        <div className={`flex items-center gap-2 font-medium ${isMarketOpen ? 'text-green-500' : 'text-red-500'}`}>
          <span className={`w-2 h-2 rounded-full ${isMarketOpen ? 'bg-green-500' : 'bg-red-500'}`}></span> 
          {isMarketOpen ? 'Market Open' : 'Market Closed'}
        </div>

        <span className="text-gray-500 dark:text-gray-400">Last Updated: {formattedDate}</span>
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-[#111827] border border-gray-300 dark:border-[#1f2937] px-3 py-1.5 rounded text-gray-800 dark:text-gray-200">
          <Clock size={14} /> {formattedTime}
        </div>
        
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300
            bg-blue-400 hover:bg-blue-500 text-white border-blue-500 hover:border-blue-600
            dark:bg-[#1e3a8a] dark:hover:bg-[#172554] dark:text-blue-200 dark:border-blue-600 font-bold uppercase text-[10px]"
        >
          {isDarkMode ? (
            <><Sun size={14} /> Light Mode</>
          ) : (
            <><Moon size={14} /> Dark Mode</>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;