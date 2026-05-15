import React, { useState } from 'react'; // 📍 1. เพิ่ม useState
import { LogIn, TrendingUp, LineChart, Eye, BarChart2, FileText, Info, Bell, User } from 'lucide-react';

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('mostActive');

  return (
    <aside className="w-full lg:w-[360px] flex-shrink-0 h-full overflow-y-auto pt-10 pt-4 pb-4 pr-4 pl-8 flex flex-col gap-6 transition-colors duration-300">
      
      {/* Menus */}
      <div className="space-y-6">
        <div>
          <h3 className="text-xs font-bold text-gray-500 dark:text-white mb-2 px-3">Main Menu</h3>
          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2 bg-blue-400 hover:bg-blue-500 dark:bg-[#2563eb] dark:hover:bg-blue-700 text-white rounded-md text-sm transition-colors">
              <LogIn size={18} /> Login
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white hover:bg-blue-50 dark:hover:bg-[#111827] rounded-md text-sm transition">
              <TrendingUp size={18} /> Online Trading
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white hover:bg-blue-50 dark:hover:bg-[#111827] rounded-md text-sm transition">
              <LineChart size={18} /> Stock Quotes
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white hover:bg-blue-50 dark:hover:bg-[#111827] rounded-md text-sm transition">
              <Eye size={18} /> Market View
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white hover:bg-blue-50 dark:hover:bg-[#111827] rounded-md text-sm transition">
              <BarChart2 size={18} /> Interactive Charts
            </a>
          </nav>
        </div>

        <div>
          <h3 className="text-xs font-bold text-gray-500 dark:text-white mb-2 px-3">Insights & Info</h3>
          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white hover:bg-blue-50 dark:hover:bg-[#111827] rounded-md text-sm transition">
              <FileText size={18} /> News Center
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white hover:bg-blue-50 dark:hover:bg-[#111827] rounded-md text-sm transition">
              <Info size={18} /> Decision Support Info
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white hover:bg-blue-50 dark:hover:bg-[#111827] rounded-md text-sm transition">
              <Bell size={18} /> Alert
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white hover:bg-blue-50 dark:hover:bg-[#111827] rounded-md text-sm transition">
              <User size={18} /> My Corner
            </a>
            {/* เมนู Deposit (ฝากเงิน) */}
            <a 
              href="#" 
              className="flex items-center gap-3 px-3 py-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-[#111827] hover:text-blue-600 dark:hover:text-white rounded-md transition"
            >
              {/* ปรับ w-4.5 h-4.5 เพื่อให้ใกล้เคียงกับ size 18 ของ Lucide */}
              <svg className="w-[18px] h-[18px] text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Deposit
            </a>

            {/* เมนู Withdraw (ถอนเงิน) */}
            <a 
              href="#" 
              className="flex items-center gap-3 px-3 py-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-[#111827] hover:text-blue-600 dark:hover:text-white rounded-md transition"
            >
              <svg className="w-[18px] h-[18px] text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              Withdraw
            </a>
          </nav>
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;