import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Sidebar_Portfolio from '../components/layout/Sidebar_Portfolio';
import { 
  BarChart3, LayoutDashboard, FileText, Settings, Key, 
  HelpCircle, User, LogOut, Bell, PieChart, LineChart, 
  Newspaper, Calendar, Info, RefreshCcw, Monitor, Activity, Laptop, Lock,
  Circle, Search, // 🆕 นำเข้าไอคอนเพิ่มเติมสำหรับกลุ่มหน้าเมนูรายงานใหม่
  PlusCircle, Edit, BarChart2, SquareCheckBigIcon, PenLine, Check, Repeat, List, LayoutIcon, File, MessageSquare, History, InfoIcon, Users, Square, SlidersHorizontal, Mail, Shield, RectangleHorizontal, KeyRoundIcon
} from 'lucide-react'; 

// Portfolio Features
import PortfolioForUser from '../features/streaming/PortfolioForUser';
import CreditBalanceSummary from '../features/streaming/CreditBalanceSummary';
import Positions_Portfolio from '../features/streaming/Positions_Portfolio';
import OutstandingOrder from '../features/streaming/OutstandingOrder';

// 🆕 แก้ไขปรับปรุงจุดนี้: เปลี่ยนจากการรับพารามิเตอร์แบบเดิม ให้เปิดรับ Props ชื่อ activeMenu และ setActiveMenu ที่ถูกส่งมาจาก App.jsx เพื่อแชร์สถานะการสลับหน้าร่วมกันทั้งแอปพลิเคชัน
const TradingPortfolioPage = ({ isDarkMode, setIsDarkMode, onLogout, activeMenu, setActiveMenu }) => {
  
  // 🆕 ปรับปรุงจุดนี้: ลบหรือคอมเมนต์ State ท้องถิ่นอันเดิมออกไป เพื่อสลับมาใช้ State 'activeMenu' และ 'setActiveMenu' ที่ส่งตรงมาจาก App.jsx (ไฟล์แม่) แทน ทำให้เวลากดปุ่ม Streaming แล้วสามารถสั่งเปลี่ยนหน้าจอใหญ่ภายนอกได้ทันที
  // const [activeMenu, setActiveMenu] = useState('Trading Portfolio');

  // 🆕 ฟังก์ชันจับคู่ไอคอนสำหรับเนื้อหาฝั่งขวา: เพิ่มเงื่อนไขเพื่อรองรับเมนูรายงานใหม่ทั้ง 7 หน้า
  // เพื่อให้ไอคอนตรงหัวข้อด้านบนฝั่งขวาเปลี่ยนรูปทรงตามหน้าเว็บบน Sidebar จริงทันที
  const getRightHeaderIcon = () => {
    if (!activeMenu) return <LayoutDashboard size={18} />;
    const normalizedKey = activeMenu.toString().toLowerCase().trim();

    // 🆕 ดักจับเงื่อนไขสำหรับชุดรายงานและบทวิเคราะห์ตัวใหม่ (เปรียบเทียบแบบ Exact Match เพื่อความแม่นยำ)
    if (normalizedKey === 'research') return <Search size={18} />;
    if (normalizedKey === 'other reports') return <Circle size={18} />;
    if (normalizedKey === 'order status') return <SquareCheckBigIcon size={18} />;
    if (normalizedKey === 'total deal summary') return <BarChart2 size={18} />;
    if (normalizedKey === 'conditional order status') return <Check size={18} />;
    if (normalizedKey === 'conditional order') return <PenLine size={18} />;
    if (normalizedKey === 'monthly stock mvmt') return <Activity size={18} />;
    if (normalizedKey === 'dca order status') return <List size={18} />;
    if (normalizedKey === 'dca') return <Repeat size={18} />;
    if (normalizedKey === 'interactive charts') return <LayoutIcon size={18} />;
    if (normalizedKey === 'technical chart') return <BarChart2 size={18} />;
    if (normalizedKey === 'news center') return <File size={18} />;
    if (normalizedKey === 'set news') return <Circle size={18} />;
    if (normalizedKey === 'hot news') return <MessageSquare size={18} />;
    if (normalizedKey === 'historical news') return <History size={18} />;
    if (normalizedKey === 'decision support info') return <InfoIcon size={18} />;
    if (normalizedKey === 'broker trading') return <Users size={18} />;
    if (normalizedKey === 'monthly stock stmt') return <Square size={18} />;
    if (normalizedKey === 'change preference') return <HelpCircle size={18} />;
    if (normalizedKey === 'change question & answer') return <SlidersHorizontal size={18} />;
    if (normalizedKey === 'change email') return <Mail size={18} />;
    if (normalizedKey === 'change pin') return <Shield size={18} />;
    if (normalizedKey === 'online trading') return <RectangleHorizontal size={18} />;
    if (normalizedKey === 'reset pin') return <KeyRoundIcon size={18} />;
    if (normalizedKey === 'forgot pin') return <Info size={18} />;
    if (normalizedKey === 'tsd investor portal') return <MessageSquare size={18} />;

    if (
      normalizedKey === 'electronic report' || 
      normalizedKey === 'confirmation report' ||  
      normalizedKey === 'research report'
    ) {
      return <File size={18} />;
    }

    // --- เงื่อนไขกลุ่มเมนูเดิมเดิมทั้งหมด (คงสภาพไว้ครบถ้วน ห้ามนำออก) ---
    if (normalizedKey.includes('tfex') || normalizedKey.includes('technical')) return <Activity size={18} />;
    if (normalizedKey.includes('online trading') || normalizedKey.includes('dashboard')) return <Laptop size={18} />;
    if (normalizedKey.includes('streaming') || normalizedKey.includes('summary') || normalizedKey.includes('chart')) return <Activity size={18} />;
    if (normalizedKey.includes('member') || normalizedKey.includes('user') || normalizedKey.includes('account') || normalizedKey.includes('broker') || normalizedKey.includes('customer')) return <User size={18} />;
    if (normalizedKey.includes('order')) return <PlusCircle size={18} />;
    if (normalizedKey.includes('portal')) return <FileText size={18} />;
    if (normalizedKey.includes('portfolio')) return <Monitor size={18} />;
    if (normalizedKey.includes('setting') || normalizedKey.includes('preference') || normalizedKey.includes('email')) return <Settings size={18} />;
    if (normalizedKey.includes('dca') || normalizedKey.includes('reset')) return <RefreshCcw size={18} />;
    if (normalizedKey.includes('news') || normalizedKey.includes('center')) return <Newspaper size={18} />;
    if (normalizedKey.includes('bell') || normalizedKey.includes('hot')) return <Bell size={18} />;
    if (normalizedKey.includes('info') || normalizedKey.includes('historical')) return <Info size={18} />;
    if (normalizedKey.includes('calendar') || normalizedKey.includes('x-')) return <Calendar size={18} />;
    if (normalizedKey.includes('password')) return <Lock size={18} />;
    if (normalizedKey.includes('pin') || normalizedKey.includes('key')) return <Key size={18} />;
    if (normalizedKey.includes('help') || normalizedKey.includes('question') || normalizedKey.includes('forgot')) return <HelpCircle size={18} />;
    if (normalizedKey.includes('place') || normalizedKey.includes('decision')) return <PieChart size={18} />;
    
    return <LayoutDashboard size={18} />;
  };

  // --- Sub-Component: การแสดงผลเนื้อหาหลักตามเงื่อนไขเมนู ---
  const MainContent = () => {
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

    // กรณีหน้าอื่นๆ รวมไปถึงกลุ่มเมนูรายงานที่เพิ่มเข้ามาใหม่ทั้งหมด ให้สืบทอดสไตล์กล่องข้อความ Coming Soon
    return (
      <div className="flex-1 min-h-[calc(100vh-114px)] w-full flex flex-col items-center justify-center text-center p-4 animate-in fade-in duration-500 select-none">
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
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} onLogout={onLogout} />
      
      <div className="flex flex-1 items-stretch overflow-hidden">
        
        {/* 2. SIDEBAR: จัดการการเปลี่ยนหน้า */}
        <Sidebar_Portfolio 
          activeMenu={activeMenu} 
          setActiveMenu={setActiveMenu} 
          isDarkMode={isDarkMode}
          onSignOff={onLogout} 
        />
        
        {/* 3. AREA ด้านขวา */}
        <main className="flex-1 flex flex-col overflow-hidden border-l border-gray-200 dark:border-gray-800">
          
          {/* แถบพาดหัวด้านบนฝั่งขวา */}
          <header className="h-[50px] shrink-0 flex items-center px-4 bg-white dark:bg-[#111827] border-b border-gray-200 dark:border-gray-800 shadow-sm transition-colors duration-300">
            <div className="flex items-center text-sm font-bold uppercase tracking-tight">
               {/* ส่วนหัวไอคอนแบบไดนามิกที่จะเปลี่ยนรูปร่างไปตามเมนูที่กดคลิกจริง */}
               <div className="text-blue-500 mr-2 flex items-center">
                 {getRightHeaderIcon()}
               </div>
               <span className="text-gray-800 dark:text-white">{activeMenu}</span>
            </div>
          </header>

          {/* ส่วนเนื้อหาหลัก (Body) */}
          <div className="flex-1 overflow-y-auto p-4 bg-slate-50 dark:bg-[#0a0f1d] transition-colors duration-300">
            <nav>
              <MainContent />
            </nav>
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