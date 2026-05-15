import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Sidebar_Portfolio from '../components/layout/Sidebar_Portfolio';
import { LayoutDashboard } from 'lucide-react';

// Portfolio Features
import PortfolioForUser from '../features/streaming/PortfolioForUser';
import CreditBalanceSummary from '../features/streaming/CreditBalanceSummary';
import Positions_Portfolio from '../features/streaming/Positions_Portfolio';
import OutstandingOrder from '../features/streaming/OutstandingOrder';

const TradingPortfolioPage = ({ isDarkMode, setIsDarkMode, onLogout }) => {
  // สร้าง State สำหรับเก็บว่าตอนนี้อยู่ที่หน้าไหน
  const [activeMenu, setActiveMenu] = useState('Trading Portfolio');

  // --- Sub-Component: การแสดงผลเนื้อหาหลักตามเงื่อนไขเมนู ---
  const MainContent = () => {

    {/* Trading Portfolio Page */}
    if (activeMenu === 'Trading Portfolio') {
      return (
        <div className="w-full max-w-[1600px] mx-auto space-y-4 animate-in fade-in duration-500">
          {/* ส่วนข้อมูลผู้ใช้ */}
          <PortfolioForUser isDarkMode={isDarkMode} />
          <CreditBalanceSummary isDarkMode={isDarkMode} />
          <Positions_Portfolio isDarkMode={isDarkMode} />
          <OutstandingOrder isDarkMode={isDarkMode} />
        </div>
      );
    }

    // กรณีหน้าอื่นๆ ที่ไม่ใช่ Trading Portfolio ให้แสดง Coming Soon
    return (
      <div className="h-full flex items-center justify-center text-center p-4">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-gray-800 dark:text-white transition-all duration-300">
            {activeMenu}
          </h1>
          <div className="flex flex-col items-center">
            <span className="text-blue-500 font-mono text-xl animate-pulse font-bold tracking-widest uppercase">
              &gt; Coming Soon _
            </span>
            <p className="mt-3 text-sm max-w-xs text-gray-500 dark:text-gray-400">
              ฟีเจอร์นี้กำลังอยู่ระหว่างการพัฒนา กรุณากลับมาตรวจสอบอีกครั้งในภายหลัง
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#090e19] text-gray-900 dark:text-white transition-colors duration-300">
      
      {/* 1. Header หลักด้านบนสุด */}
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      
      <div className="flex flex-1 items-stretch overflow-hidden">
        
        {/* 2. SIDEBAR: จัดการการเปลี่ยนหน้า */}
        <Sidebar_Portfolio 
          activeMenu={activeMenu} 
          setActiveMenu={setActiveMenu} 
          isDarkMode={isDarkMode}
        />
        
        {/* 3. AREA ด้านขวา */}
        <main className="flex-1 flex flex-col overflow-hidden border-l border-gray-200 dark:border-gray-800">
          
          {/* แถบพาดหัว (เอาส่วน TopToolbar ออกแล้ว) */}
          <header className="h-[50px] shrink-0 flex items-center px-4 bg-white dark:bg-[#111827] border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-300">
            <div className="flex items-center text-sm font-bold uppercase tracking-tight">
               <LayoutDashboard size={18} className="text-blue-500 mr-2" />
               <span className="text-gray-800 dark:text-white">{activeMenu}</span>
            </div>
          </header>

          {/* ส่วนเนื้อหาหลัก (Body) */}
          <div className="flex-1 overflow-y-auto p-4 bg-slate-50 dark:bg-[#0a0f1d] transition-colors duration-300">
            <MainContent />
          </div>

        </main>
      </div>

      {/* 4. Footer */}
      <footer className="shrink-0 border-t border-gray-200 dark:border-[#1e3a8a] bg-white dark:bg-[#090e19] py-3 px-4 text-[10px] text-gray-500 flex flex-col md:flex-row justify-between items-center gap-2 transition-colors duration-300">
        <p>System response and all information may vary due to system performance, market conditions and other factors</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-blue-600 dark:hover:text-gray-300 underline font-bold tracking-tighter uppercase">Settrade.com</a>
          <a href="#" className="hover:text-blue-600 dark:hover:text-gray-300 underline">All rights reserved</a>
          <a href="#" className="hover:text-blue-600 dark:hover:text-gray-300 underline">Terms of Use</a>
        </div>
      </footer>
      
    </div>
  );
};

export default TradingPortfolioPage;