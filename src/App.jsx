// src/App.jsx
import React, { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import TradingPortfolioPage from './pages/TradingPortfolioPage';
import StreamingPage from './pages/StreamingPage'; // เก็บไว้ครบถ้วน ห้ามเอาออกตามต้องการ

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // ดักเช็คค่าใน localStorage ตอนเปิดเว็บครั้งแรก เพื่อป้องกันการหลุดล็อกอินตอนกด Refresh (F5)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  // 🆕 เพิ่มเติม State สำหรับควบคุมเมนูหน้าจอหลัก: ใช้จัดการและสลับการแสดงผลหน้าจอปัจจุบันที่ผู้ใช้เลือก (Default เป็น 'Trading Portfolio')
  const [activeMenu, setActiveMenu] = useState('Trading Portfolio');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // ฟังก์ชันสำหรับรองรับการล็อกอินสำเร็จ
  const handleLoginSuccess = () => {
    localStorage.setItem('isAuthenticated', 'true'); // สั่งบันทึกสถานะล็อกอินลงเครื่อง
    
    const now = new Date();
    
    // 🆕 แก้ไขปรับปรุงจุดนี้: ดึงค่าวันเวลาของประเทศไทยแยกชิ้นส่วน เพื่อนำมาเรียงลำดับตามที่กำหนดพอดิบพอดี
    
    // 1. ดึงชื่อเดือนแบบตัวย่อภาษาอังกฤษ (เช่น "May", "Mar")
    const monthStr = now.toLocaleString('en-US', { timeZone: 'Asia/Bangkok', month: 'short' });
    
    // 2. ดึงวันที่เป็นตัวเลข (เช่น "20", "25")
    const dayStr = now.toLocaleString('en-US', { timeZone: 'Asia/Bangkok', day: 'numeric' });
    
    // 3. ดึงปี ค.ศ. เป็นตัวเลข (เช่น "2026")
    const yearStr = now.toLocaleString('en-US', { timeZone: 'Asia/Bangkok', year: 'numeric' });
    
    // 4. ดึงเวลาแบบ 24 ชั่วโมง ดึงวินาทีแบบละเอียด (เช่น "23:15:30")
    const timeStr = now.toLocaleString('en-US', {
      timeZone: 'Asia/Bangkok',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });

    // 🆕 5. นำส่วนประกอบมามัดรวมกันตามโครงสร้าง: ตัวย่อเดือน วันที่, ปี at เวลา
    const formattedDate = `${monthStr} ${dayStr}, ${yearStr} at ${timeStr}`;
    
    // บันทึกเวลาที่เรียงสมบูรณ์แล้วลงเครื่องคอมพิวเตอร์ในชื่อ 'lastLoginTime'
    localStorage.setItem('lastLoginTime', formattedDate); 
    
    setIsAuthenticated(true); // ปรับ State เป็น true เพื่อสั่งเปลี่ยนหน้า
  };

  // ฟังก์ชันสำหรับเคลียร์ค่าตอนกด Sign Off / Logout
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated'); // ลบสถานะล็อกอินออกจากความจำเครื่อง
    localStorage.removeItem('lastLoginTime');   // ลบข้อมูลเวลา Last Login ทิ้งไปเมื่อผู้ใช้กด Sign Off
    setIsAuthenticated(false); // ปรับ State เป็น false เพื่อดีดผู้ใช้กลับไปหน้าล็อกอินเริ่มต้น
    
    // 🆕 เพิ่มเติมโค้ด: รีเซ็ตค่าเมนูกลับมาที่หน้า Portfolio เริ่มต้นทุกครั้งหลังจาก Sign Off
    setActiveMenu('Trading Portfolio');
  };

  {/* edit page here */}
  if (isAuthenticated) {
    // 🆕 เพิ่มเติมเงื่อนไข: ตรวจเช็คว่าหาก State ของ activeMenu ถูกเปลี่ยนเป็น 'Streaming' (จากการกดปุ่มใน Sidebar) 
    // จะทำการสลับไป Render หน้า <StreamingPage /> ให้ทันที พร้อมส่ง Props ชุดเดิมไปควบคุมให้แอปพลิเคชันทำงานได้ต่อเนื่อง
    if (activeMenu === 'Streaming') {
      return (
        <StreamingPage
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          onLogout={handleLogout}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />
      );
    }

    // หากไม่ใช่หน้า Streaming ก็จะแสดงผลหน้า TradingPortfolioPage ตามโค้ดเดิมอย่างปลอดภัย
    return (
      <TradingPortfolioPage
        isDarkMode={isDarkMode} 
        setIsDarkMode={setIsDarkMode} 
        onLogout={handleLogout} // ส่งฟังก์ชัน handleLogout ที่ล้างทั้งสถานะและเวลาล็อกอินลงไปใช้งาน
        activeMenu={activeMenu}         // 🆕 เพิ่มเติม Props: ส่ง State เมนูปัจจุบันลงไปใช้งานร่วมกับ Sidebar ด้านใน
        setActiveMenu={setActiveMenu}   // 🆕 เพิ่มเติม Props: ส่งฟังก์ชันเปลี่ยนค่าเมนูลงไปให้ Sidebar เรียกสั่งงาน
      />
    );
  }

  return (
    <LoginPage
      isDarkMode={isDarkMode}
      setIsDarkMode={setIsDarkMode}
      onAuthSuccess={handleLoginSuccess} // ส่งฟังก์ชัน handleLoginSuccess ที่สแตมป์เวลาตามลำดับที่ต้องการลงไปใช้งาน
    />
  );
}

export default App;