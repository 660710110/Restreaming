import React, { useState } from 'react'; // 📍 1. เพิ่ม useState
import { 
  LogIn, TrendingUp, LineChart, Eye, BarChart2, FileText, Info, Bell, User,
  ChevronLeft, ChevronRight // 🟢 [เพิ่ม] นำเข้าไอคอนลูกศร ซ้าย-ขวา สำหรับใช้ทำปุ่มเปิด-ปิด Sidebar
} from 'lucide-react';

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('mostActive');
  
  // 🟢 [เพิ่ม] State สำหรับควบคุมการเปิด-ปิด Sidebar (true = เปิดกว้างปกติ, false = ปิด/ซ่อนแถบ)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    // 🟢 [เพิ่มความสามารถใน 태็กนอกสุด] 
    // 1. ใส่ inline style ควบคุม width (360px หรือ 0px) และเปลี่ยนเป็นประเภทคอมพิวเตอร์จอใหญ่ผ่าน lg:style เพื่อให้หดเนียนๆ 
    // 2. เติมคลาส `relative ease-in-out` เพื่อรองรับอนิเมชันตอนพับเก็บ และใส่ border-r ให้เห็นขอบเขตชัดเจน
    <aside 
      style={{ width: isSidebarOpen ? '' : '0px' }}
      className={`${isSidebarOpen ? 'w-full lg:w-[360px] pr-4 pl-8' : 'w-0 p-0 overflow-hidden'} flex-shrink-0 h-full overflow-y-auto pt-10 pt-4 pb-4 flex flex-col gap-6 transition-all duration-300 ease-in-out border-r border-slate-200 dark:border-gray-800 relative`}
    >
      
      {/* 🟢 [เพิ่ม] ปุ่มเปิด-ปิด Sidebar ดีไซน์สไตล์พรีเมียม ลอยค้างกลางหน้าจอ (Fixed) ตลอดเวลา เลื่อนเมาส์ขึ้นลงก็ไม่หาย */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        style={{ left: isSidebarOpen ? '359px' : '0px' }} // คำนวณระยะพิกเซลดันปุ่มไปอยู่ขอบ Sidebar ตลอดเวลา
        className={`fixed top-1/2 -translate-y-1/2 z-[9999] flex items-center justify-center w-7 h-16 rounded-r-xl shadow-2xl transition-all duration-300 ease-in-out cursor-pointer border border-l-0
          ${isSidebarOpen 
            ? 'bg-white dark:bg-[#1e293b] border-slate-200 dark:border-gray-700 text-slate-500 hover:text-blue-600 hover:w-8' 
            : 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 w-8'
          }`}
        title={isSidebarOpen ? "ซ่อนเมนู" : "แสดงเมนู"}
      >
        {isSidebarOpen ? (
          <ChevronLeft size={18} />
        ) : (
          <ChevronRight size={18} />
        )}
      </button>

      {/* Menus */}
      {/* 🟢 [เพิ่มความสามารถในคลาสบรรทัดนี้] ควบคุมการซ่อนเนื้อหาภายในทั้งหมดทันทีเมื่อผู้ใช้กดปิด Sidebar */}
      <div className={`space-y-6 transition-all duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
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