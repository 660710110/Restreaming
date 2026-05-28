import React, { useState } from 'react'; // 🟢 นำเข้า useState สำหรับเก็บสถานะ เปิด/ปิด Sidebar
import { 
  BarChart3, LayoutDashboard, FileText, Settings, Key, 
  HelpCircle, User, LogOut, Bell, PieChart, LineChart, 
  Newspaper, Calendar, Info, RefreshCcw, Monitor, Activity, Laptop, Plus, Edit, Lock,
  Circle, Search, BarChart2, PlusCircle, SquareCheckBigIcon, PenLine, Check, Repeat, List, LayoutIcon, File, MessageSquare, History, InfoIcon, Users, Square, SlidersHorizontal, Mail, Shield, RectangleHorizontal, KeyRoundIcon,
  ChevronLeft, ChevronRight // 🟢 นำเข้าไอคอนลูกศร ซ้าย-ขวา สำหรับใช้ทำปุ่มเปิด-ปิด
} from 'lucide-react';

// แกัไขตรงนี้: รับ Property ชื่อ onSignOff เข้ามาใช้งานตามเดิมเพื่อทำหน้าที่ดีดกลับหน้าแรก
// 🆕 เพิ่มเติมพร็อพ: รับ Property ชื่อ isDarkMode เข้ามาเพื่อใช้ตรวจสอบโหมดสีปัจจุบัน (Light / Dark)
const Sidebar_Portfolio = ({ activeMenu, setActiveMenu, onSignOff, isDarkMode }) => {
  
  // 🟢 State สำหรับควบคุมการเปิด-ปิด Sidebar (true = เปิด, false = ปิด/ซ่อน)
  const [isOpen, setIsOpen] = useState(true);

  // ข้อมูลโครงสร้างเมนูทำการแบ่ง Zone กลุ่มข้อมูลชุดที่ 3 ออกเป็นหมวดหมู่ย่อยตามรูปภาพตัวอย่าง
  const menuGroups = [
    {
      group: null,
      items: [
        { name: 'TFEX', icon: <Activity size={18} />, badge: 'New!' },
        { name: 'Online Trading', icon: <RectangleHorizontal size={18} /> },
        { name: 'Streaming', icon: <Activity size={18} />, type: 'button' },
        { name: 'TRINITY MEMBER', icon: <User size={18} />, type: 'button' },
      ]
    },
    {
      group: null,
      items: [
        { name: 'Place Order (Pop-up)', icon: <PlusCircle size={18} /> },
        { name: 'Order Status', icon: <SquareCheckBigIcon size={18} /> },
        { name: 'Trading Portfolio', icon: <Monitor size={18} /> },
        { name: 'Total Deal Summary', icon: <BarChart2 size={18} /> },
        { name: 'Conditional Order', icon: <PenLine size={18} /> },
        { name: 'Conditional Order Status', icon: <Check size={18} /> },
        { name: 'DCA', icon: <Repeat size={18} /> },
        { name: 'DCA Order Status', icon: <List size={18} /> },
      ]
    },
    {
      group: null,
      items: [
        { name: 'Interactive Charts', icon: <LayoutIcon size={18} /> },
        { name: 'Technical Chart', icon: <BarChart2 size={18} />, badge: 'New!' },
        { name: 'News Center', icon: <File size={18} /> },
        { name: 'SET News', icon: <Circle size={18} /> },
        { name: 'HOT News', icon: <MessageSquare size={18} /> },
        { name: 'Historical News', icon: <History size={18} /> },
        { name: 'Decision Support Info', icon: <InfoIcon size={18} /> },
        { name: 'X-Calendar', icon: <Calendar size={18} /> },
        { name: 'Broker Trading', icon: <Users size={18} /> },
        { name: 'Customer Type', icon: <User size={18} /> },
      ]
    },
    // 🆕 แยกโซนเมนูชุดรายงานออกมาอีกหนึ่งกรุ๊ป พร้อมมีเส้นคั่นแยกโซนชัดเจนตามที่ปรากฏในภาพตัวอย่าง
    {
      group: null,
      items: [
        { name: 'Electronic Report', icon: <File size={18} /> },
        { name: 'Confirmation Report', icon: <File size={18} /> },
        { name: 'Monthly Stock Stmt', icon: <Square size={18} /> },
        { name: 'Monthly Stock Mvmt', icon: <Activity size={18} /> },
        { name: 'Other Reports', icon: <Circle size={18} /> },
        { name: 'Research', icon: <Search size={18} /> },
        { name: 'Research Report', icon: <File size={18} /> },
      ]
    },
    {
      group: 'MY CORNER',
      items: [
        { name: 'Change Default Account', icon: <User size={18} /> },
        { name: 'Change Preference', icon: <HelpCircle size={18} /> },
        { name: 'Change Password', icon: <Lock size={18} /> },
        { name: 'Change Question & Answer', icon: <SlidersHorizontal size={18} /> },
        { name: 'Change EMail', icon: <Mail size={18} /> },
        { name: 'Change PIN', icon: <Shield size={18} /> },
        { name: 'Reset PIN', icon: <KeyRoundIcon size={18} /> },
        { name: 'Forgot PIN', icon: <Info size={18} /> },
      ]
    },
    {
      group: 'OTHERS',
      items: [
        { name: 'TSD Investor Portal', icon: <MessageSquare size={18} /> },
        { name: 'Back to SETTRADE Page', icon: <LogOut size={18} /> },
      ]
    }
  ];

  return (
    // 🟢 ตัวนอกสุดคงความกว้างแบบ Dynamic เพื่อดันเนื้อหาฝั่งขวา (เช่น ตารางหุ้น) หลบไปได้อย่างถูกต้อง
    <div 
      style={{ width: isOpen ? '280px' : '0px' }} 
      className="relative flex flex-col h-full bg-slate-50 text-slate-600 dark:bg-[#0f172a] dark:text-[#94a3b8] transition-all duration-300 ease-in-out font-sans border-r border-slate-200 dark:border-gray-800"
    >
      
      {/* 🟢 [ปรับปรุงจุดนี้] ใช้ style inline ร่วมกับคลาส `fixed` และคำนวณระยะพิกเซลด้านซ้ายแบบแปรผันตามสถานะเปิด/ปิด เพื่อให้ปุ่มลอยค้างตรงกลางหน้าจอคอมพิวเตอร์อย่างถาวร ไม่ว่าจะเลื่อนเมนูขึ้นหรือลง */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{ left: isOpen ? '279px' : '0px' }}
        className={`fixed top-1/2 -translate-y-1/2 z-[9999] flex items-center justify-center w-7 h-16 rounded-r-xl shadow-2xl transition-all duration-300 ease-in-out cursor-pointer border border-l-0
          ${isOpen 
            ? 'bg-white dark:bg-[#1e293b] border-slate-200 dark:border-gray-700 text-slate-500 hover:text-blue-600 hover:w-8' 
            : 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 w-8'
          }`}
        title={isOpen ? "ซ่อนเมนู" : "แสดงเมนู"}
      >
        {isOpen ? (
          <ChevronLeft size={18} />
        ) : (
          <ChevronRight size={18} />
        )}
      </button>

      {/* SIDEBAR CONTAINER */}
      {/* 🟢 ส่วนแสดงเนื้อหาเมนูข้างใน ปล่อยให้เลื่อน Scroll ได้อิสระตามเดิม โดยไม่ส่งผลกระทบต่อตำแหน่งของปุ่มเปิด-ปิดแล้ว */}
      <div className={`${isOpen ? 'w-[280px]' : 'w-0 opacity-0 pointer-events-none'} bg-white dark:bg-[#111827] flex flex-col flex-1 h-full overflow-y-auto scrollbar-hide transition-all duration-300`}>
        
        {/* User Info Section */}
        <div className="p-4 border-b border-slate-200 dark:border-gray-800">
          
          {/* 🆕 แก้ไขจุดตกแต่งกล่องข้อมูลผู้ใช้: ใช้ค่า `isDarkMode` เข้ามาช่วยสลับสีพื้นหลังของกล่องรหัสและคำว่า INTERNET ให้สลับระหว่าง Light Mode (สีเทาอ่อน/ขอบสว่าง) และ Dark Mode (สีกรมเข้มตามรูปภาพตัวอย่าง) ได้โดยตรง */}
          <div className={`inline-flex items-center space-x-3 px-4 py-1 rounded-full font-bold tracking-wide border-2 transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-[#112240] border-[#1d3557]' 
              : 'bg-slate-100 border-slate-200'
          }`}>
            {/* รหัสตัวเลข: ปรับฟอนต์ให้เด่นชัด และใช้สีฟ้าสว่าง (#64b5f6) ในโหมดมืด หรือสีน้ำเงินเข้มในโหมดสว่าง */}
            <span className={`text-[15px] tracking-wider transition-colors duration-300 ${isDarkMode ? 'text-[#64b5f6]' : 'text-blue-600'}`}>23720</span>
            {/* คำว่า INTERNET: ใช้สีฟ้าอมเทาอ่อน (#90caf9) ในโหมดมืด หรือสีน้ำเงินเทาในโหมดสว่าง */}
            <span className={`text-[15px] font-semibold transition-colors duration-300 ${isDarkMode ? 'text-[#90caf9]' : 'text-slate-700'}`}>INTERNET</span>
          </div>
          
          {/* ข้อความ Last Login: ปรับขนาดตัวอักษรเป็น text-[12px] ใช้สีเทาอ่อนอมฟ้า เพื่อให้กลืนกับพื้นหลังเข้มแบบในรูป */}
          <div className="text-[12px] mt-2 text-[#94a3b8]/80 font-normal">
            Last Login: {localStorage.getItem('lastLoginTime') || 'Mar 25, 2026 at 10:48:53'}
          </div>
          
          {/* โซนปุ่มกดเซ็นต์เอาต์: ปรับขนาดและระยะห่าง (gap) ให้ตรงตามสัดส่วนในรูป */}
          <div className="flex items-center gap-1.5 text-[12px] mt-1.5 select-none">
            {/* ปุ่ม SIGN OFF!: ใช้สีแดงส้มสว่าง (#ff5252) และทำตัวหนา (font-bold) */}
            <button 
              onClick={onSignOff}
              className="text-[#ff5252] font-bold hover:underline transition-all bg-transparent border-none p-0 cursor-pointer tracking-wide"
            >
              SIGN OFF!
            </button>
            {/* ตัวคั่นสัญลักษณ์ช่องว่างระหวา่งสองปุ่ม */}
            <span className="text-transparent w-1"></span> 
            {/* ปุ่ม Login Page: ใช้สีฟ้าสว่างโทนสบายตา (#42a5f5) ตามหน้าเว็บเทรดหุ้น */}
            <button 
              onClick={onSignOff}
              className="text-[#42a5f5] font-normal hover:underline transition-all bg-transparent border-none p-0 cursor-pointer"
            >
              Login Page
            </button>
          </div>

        </div>

        {/* Navigation Menus */}
        <nav className="flex-1 py-4 text-[13px]">
          {menuGroups.map((group, gIdx) => (
            <div key={gIdx} className="mb-6">
              {group.group && (
                <h3 className="px-4 mb-2 text-[11px] font-bold text-slate-400 dark:text-gray-500 tracking-wider uppercase">
                  {group.group}
                </h3>
              )}
              {group.items.map((item) => {
                const isActive = activeMenu === item.name;
                
                if (item.type === 'button') {
                  return (
                    <div key={item.name} className="px-3 py-1">
                      {/* // 🆕 เพิ่มเติมเงื่อนไขใน onClick: ดักจับว่าหากปุ่มที่กดมีชื่อว่า 'Streaming' ให้สั่งงานเซตสถานะเมนูหลักเป็น 'Streaming' เพื่อบังคับเปลี่ยนหน้าจอฝั่งขวาเป็นหน้า Market ของ StreamingPage ทันที */}
                      <button 
                        onClick={() => {
                          if (item.name === 'Streaming') {
                            setActiveMenu('Streaming');
                          } else {
                            setActiveMenu(item.name);
                          }
                        }}
                        className={`w-full flex items-center px-3 py-1.5 rounded border transition-all 
                          ${isActive 
                            ? 'bg-blue-600 dark:bg-[#1e3a8a] text-white border-blue-600 dark:border-blue-500 shadow-md' 
                            : 'bg-slate-50 dark:bg-[#1e293b]/50 text-slate-600 dark:text-gray-300 border-slate-200 dark:border-blue-900/50 hover:bg-slate-100 dark:hover:bg-blue-900/20'
                          }`}
                      >
                        <span className={`mr-3 ${isActive ? 'text-white' : 'text-blue-500 dark:text-blue-400'}`}>
                          {item.icon}
                        </span>
                        <span className="font-medium">{item.name}</span>
                      </button>
                    </div>
                  );
                }

                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      if (item.name === 'Back to SETTRADE Page') {
                        if (onSignOff) onSignOff();
                      } else {
                        setActiveMenu(item.name);
                      }
                    }}
                    className={`w-full flex items-center px-4 py-2 transition-colors relative group
                      ${isActive 
                        ? 'bg-blue-600 dark:bg-[#2563eb] text-white' 
                        : 'text-slate-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-gray-800/50 hover:text-blue-600 dark:hover:text-white'
                      }
                    `}
                  >
                    <span className={`mr-3 transition-colors ${
                      isActive 
                        ? 'text-white' 
                        : 'text-slate-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-gray-300'
                    }`}>
                      {item.icon}
                    </span>
                    <span className="flex-1 text-left font-medium">{item.name}</span>
                    {item.badge && (
                      <span className="bg-red-600 text-[10px] text-white px-1.5 py-0.5 rounded italic font-bold">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
              {gIdx < menuGroups.length - 1 && (
                <hr className="mx-4 my-4 border-slate-200 dark:border-gray-800" />
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar_Portfolio;