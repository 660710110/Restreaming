import React from 'react'; // นำ useState ออกเพราะเราจะรับค่าจาก Props แทน
import { 
  BarChart3, LayoutDashboard, FileText, Settings, Key, 
  HelpCircle, User, LogOut, Bell, PieChart, LineChart, 
  Newspaper, Calendar, Info, RefreshCcw, Lock
} from 'lucide-react';

// แก้ไข: รับ activeMenu และ setActiveMenu ผ่าน Props จากไฟล์พ่อ (TradingPortfolioPage)
const Sidebar_Portfolio = ({ activeMenu, setActiveMenu }) => {

  // ข้อมูลโครงสร้างเมนูเหมือนเดิมทุกประการ
  const menuGroups = [
    {
      group: null,
      items: [
        { name: 'TFEX', icon: <LineChart size={18} />, badge: 'New!' },
        { name: 'Online Trading', icon: <LayoutDashboard size={18} /> },
        { name: 'Streaming', icon: <BarChart3 size={18} />, type: 'button' },
        { name: 'TRINITY MEMBER', icon: <User size={18} />, type: 'button' },
      ]
    },
    {
      group: null,
      items: [
        { name: 'Place Order (Pop-up)', icon: <PieChart size={18} /> },
        { name: 'Order Status', icon: <FileText size={18} /> },
        { name: 'Trading Portfolio', icon: <LayoutDashboard size={18} /> },
        { name: 'Total Deal Summary', icon: <BarChart3 size={18} /> },
        { name: 'Conditional Order', icon: <Settings size={18} /> },
        { name: 'Conditional Order Status', icon: <FileText size={18} /> },
        { name: 'DCA', icon: <RefreshCcw size={18} /> },
        { name: 'DCA Order Status', icon: <FileText size={18} /> },
      ]
    },
    {
      group: null,
      items: [
        { name: 'Interactive Charts', icon: <BarChart3 size={18} /> },
        { name: 'Technical Chart', icon: <LineChart size={18} />, badge: 'New!' },
        { name: 'News Center', icon: <Newspaper size={18} /> },
        { name: 'SET News', icon: <Newspaper size={18} /> },
        { name: 'HOT News', icon: <Bell size={18} /> },
        { name: 'Historical News', icon: <Info size={18} /> },
        { name: 'Decision Support Info', icon: <PieChart size={18} /> },
        { name: 'X-Calendar', icon: <Calendar size={18} /> },
        { name: 'Broker Trading', icon: <User size={18} /> },
        { name: 'Customer Type', icon: <User size={18} /> },
      ]
    },
    {
      group: 'MY CORNER',
      items: [
        { name: 'Change Default Account', icon: <User size={18} /> },
        { name: 'Change Preference', icon: <Settings size={18} /> },
        { name: 'Change Password', icon: <Lock size={18} /> },
        { name: 'Change Question & Answer', icon: <HelpCircle size={18} /> },
        { name: 'Change EMail', icon: <Settings size={18} /> },
        { name: 'Change PIN', icon: <Key size={18} /> },
        { name: 'Reset PIN', icon: <RefreshCcw size={18} /> },
        { name: 'Forgot PIN', icon: <HelpCircle size={18} /> },
      ]
    },
    {
      group: 'OTHERS',
      items: [
        { name: 'TSD Investor Portal', icon: <FileText size={18} /> },
        { name: 'Back to SETTRADE Page', icon: <LogOut size={18} /> },
      ]
    }
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-600 dark:bg-[#0f172a] dark:text-[#94a3b8] transition-colors duration-300 overflow-hidden font-sans border-r border-slate-200 dark:border-gray-800">
      
      {/* SIDEBAR CONTAINER */}
      <div className="w-[280px] bg-white dark:bg-[#111827] flex flex-col flex-1 h-full overflow-y-auto scrollbar-hide transition-colors duration-300">
        
        {/* User Info Section */}
        <div className="p-4 border-b border-slate-200 dark:border-gray-800">
          <div className="flex items-center space-x-2 text-blue-600 dark:text-[#60a5fa] font-bold">
            <span className="bg-slate-100 dark:bg-[#1e293b] px-2 py-1 rounded">237280</span>
            <span className="text-xs">INTERNET</span>
          </div>
          <div className="text-[10px] mt-1 opacity-60 text-slate-500 dark:text-gray-400">
            Last Login: Mar 25, 2026 at 10:48:53
          </div>
          <button className="text-[10px] text-red-500 font-bold mt-1 hover:underline">
            SIGN OFF! <span className="text-slate-400 dark:text-gray-500 font-normal">Login Page</span>
          </button>
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
                // เช็คสถานะ Active จาก Props ที่ส่งมา
                const isActive = activeMenu === item.name;
                
                if (item.type === 'button') {
                  return (
                    <div key={item.name} className="px-3 py-1">
                      <button 
                        onClick={() => setActiveMenu(item.name)} // เมื่อคลิก จะไปสั่งเปลี่ยนหน้าในไฟล์ Page
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
                    onClick={() => setActiveMenu(item.name)} // เมื่อคลิก จะไปสั่งเปลี่ยนหน้าในไฟล์ Page
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