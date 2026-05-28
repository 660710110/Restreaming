import React, { useState } from 'react';

// 1. ส่วนประกอบหลัก (Component Definition) & การรับ Props
// รับค่า 'isDarkMode' (true/false) มาจาก Component หลัก เพื่อเปลี่ยนธีมสีของตารางอัตโนมัติ
const Positions_Portfolio = ({ isDarkMode }) => {
  
  // 2. ส่วนข้อมูลเริ่มต้น (Mock Data State)
  // เก็บข้อมูลหุ้นเป็น Array object ตัวเลขบางส่วนใส่เครื่องหมายคอมมา (,) และเครื่องหมายบวก/ลบไว้ล่วงหน้า
  const initialData = [
    { symbol: 'AOT', start: '1,000', avail: '1,000', actual: '1,000', avg: 48.50, market: 51.00, amount: 48500, mktVal: 51000, plAmt: '+2,500', plVal: '+51,000', percent: '+5.15%', realized: 'N/A' },
    { symbol: 'PTT', start: '2,000', avail: '2,000', actual: '2,000', avg: 35.20, market: 34.00, amount: 70400, mktVal: 68000, plAmt: '-2,400', plVal: '-68,000', percent: '-3.41%', realized: 'N/A' },
    { symbol: 'SCB', start: '500', avail: '500', actual: '500', avg: 115.00, market: 118.50, amount: 57500, mktVal: 59250, plAmt: '+1,750', plVal: '+59,250', percent: '+3.04%', realized: 'N/A' },
  ];

  // ประกาศ State สำหรับจัดการข้อมูลในตาราง, รูปแบบการเรียงลำดับ, และเอฟเฟกต์ปุ่ม OK
  const [data, setData] = useState(initialData);
  const [sortOrder, setSortOrder] = useState('ascend'); // 'ascend' = ก-ฮ/A-Z, 'descend' = ฮ-ก/Z-A
  const [isHovered, setIsHovered] = useState(false);     // ใช้ดักจับตอนเมาส์ชี้ปุ่ม OK เพื่อทำ Effect ไฮไลต์

  // 3. ฟังก์ชันจัดเรียงข้อมูล (Sorting Function)
  // ทำงานเมื่อกดปุ่ม OK โดยจะเรียงลำดับตามชื่อหุ้น (symbol) จากกติกาวิทยุตัวเลือกที่ติ๊กไว้
  const handleSort = () => {
    const sortedData = [...data].sort((a, b) => {
      if (sortOrder === 'ascend') {
        return a.symbol.localeCompare(b.symbol); // เรียงจาก A ไป Z
      } else {
        return b.symbol.localeCompare(a.symbol); // เรียงจาก Z ไป A
      }
    });
    setData(sortedData); // อัปเดตข้อมูลที่เรียงแล้วลงตาราง
  };

  // 4. ส่วนกำหนดสีสไตล์ลิ่ง (Streaming Color Constants)
  const streamingGreen = '#3db24b'; // สีเขียวสำหรับหุ้นที่เป็นบวก/กำไร
  const streamingRed = '#d9383a';   // สีแดงสำหรับหุ้นที่เป็นลบ/ขาดทุน
  
  // 5. สไตล์หัวตาราง (Table Header Styles Object)
  // ใช้เงื่อนไข Ternary Operator (isDarkMode ? 'สีดาร์ก' : 'สีสว่าง') เพื่อเปลี่ยนสีกรอบและพื้นหลัง
  const headerStyle = { 
    backgroundColor: isDarkMode ? '#181e2a' : '#f8f9fa', 
    color: isDarkMode ? '#7f8c9d' : '#495057', 
    fontSize: '11px', 
    padding: '6px 4px', 
    border: isDarkMode ? '1px solid #232b3b' : '1px solid #e2e8f0', 
    textAlign: 'center',       // หัวตารางทุกอันจัดกึ่งกลาง
    verticalAlign: 'middle', 
    whiteSpace: 'nowrap',      // ห้ามข้อความตัดขึ้นบรรทัดใหม่มั่วซั่ว
    fontWeight: 'bold'
  };

  // 6. สไตล์ช่องข้อมูลทั่วไป (Base Table Data Cell Styles)
  // กำหนดให้ 'textAlign: 'right'' (ชิดขวา) เป็นค่าตั้งต้นสำหรับตัวเลขทางการเงินส่วนใหญ่
  const cellStyle = { 
    padding: '5px 8px', 
    border: isDarkMode ? '1px solid #1f2735' : '1px solid #edf2f7', 
    fontSize: '11.5px', 
    whiteSpace: 'nowrap',
    textAlign: 'right', 
    color: isDarkMode ? '#ffffff' : '#2d3748',
    fontFamily: 'Tahoma, Geneva, sans-serif' // ใช้ฟอนต์มาตรฐานแบบโปรแกรม Streaming
  };

  return (
    // 7. กล่องครอบด้านนอกสุด (Main Container Wrapper)
    <div style={{ 
      backgroundColor: isDarkMode ? '#11151f' : '#ffffff', 
      borderRadius: '6px', 
      marginBottom: '15px',
      border: isDarkMode ? '1px solid #212936' : '1px solid #e2e8f0',
      overflow: 'hidden',
      fontFamily: 'Segoe UI, Tahoma, Arial, sans-serif'
    }}>
      
      {/* 8. แถบหัวข้อสีแดงด้านบนสุด (Positions Header Bar) */}
      <div style={{ backgroundColor: '#b4322b', padding: '6px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 'bold', fontSize: '13px', color: 'white' }}>Positions</span>
        <span style={{ fontSize: '11px', color: '#f39c97' }}>3 positions</span>
      </div>
      
      {/* 9. ส่วนแถบเครื่องมือจัดเรียง (Toolbar Area) */}
      {/* บรรจุ Select Box, Radio Buttons (ascend/descend) และปุ่ม OK */}
      <div style={{ 
        padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11.5px', 
        backgroundColor: isDarkMode ? '#131822' : '#f1f5f9',
        borderBottom: isDarkMode ? '1px solid #1f2735' : '1px solid #e2e8f0',
        color: isDarkMode ? '#ffffff' : '#1e293b'
      }}>
        <span style={{ color: isDarkMode ? '#7f8c9d' : '#64748b' }}>Order by</span>
        <select style={{ backgroundColor: isDarkMode ? '#1b2230' : '#fff', color: isDarkMode ? 'white' : '#1e293b', border: isDarkMode ? '1px solid #2d384c' : '1px solid #cbd5e0', borderRadius: '3px', padding: '2px 4px', fontSize: '11.5px' }}>
          <option>Symbol</option>
        </select>

        <div style={{ display: 'flex', gap: '10px' }}>
          <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <input type="radio" name="sortOrder" checked={sortOrder === 'ascend'} onChange={() => setSortOrder('ascend')} style={{ accentColor: '#52a6ff' }} /> ascend
          </label>
          <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <input type="radio" name="sortOrder" checked={sortOrder === 'descend'} onChange={() => setSortOrder('descend')} style={{ accentColor: '#52a6ff' }} /> descend
          </label>
        </div>

        <button 
          onClick={handleSort}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ backgroundColor: '#b4322b', border: 'none', color: 'white', padding: '2px 14px', borderRadius: '12px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold', opacity: isHovered ? 0.85 : 1 }}
        >
          OK
        </button>
      </div>

      {/* 10. ส่วนโครงสร้างตาราง HTML (Table Elements) */}
      <div style={{ overflowX: 'auto', width: '100%' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1050px' }}>
          
          {/* หัวข้อคอลัมน์แบบ 2 ชั้น (มี rowSpan และ colSpan รวมกลุ่มพอร์ต) */}
          <thead>
            <tr>
              <th rowSpan="2" style={headerStyle}>SYMBOL</th>
              <th colSpan="3" style={headerStyle}>POSITION (SHARES)</th>
              <th rowSpan="2" style={headerStyle}>AVERAGE<br/>PRICE</th>
              <th rowSpan="2" style={headerStyle}>MARKET<br/>PRICE</th>
              <th rowSpan="2" style={headerStyle}>AMOUNT</th>
              <th rowSpan="2" style={headerStyle}>MARKET<br/>VALUE</th>
              <th colSpan="2" style={headerStyle}>UNREALIZED P/L</th>
              <th rowSpan="2" style={headerStyle}>PERCENT<br/>UNREALIZED P/L</th>
              <th rowSpan="2" style={headerStyle}>REALIZED<br/>P/L</th>
            </tr>
            <tr>
              <th style={headerStyle}>START POSITION</th>
              <th style={headerStyle}>AVAILABLE POSITION</th>
              <th style={headerStyle}>ACTUAL POSITION</th>
              <th style={headerStyle}>AMOUNT</th>
              <th style={headerStyle}>VALUE</th>
            </tr>
          </thead>
          
          {/* 11. ส่วนแสดงข้อมูลรายแถว (Table Body - Data Mapping) */}
          <tbody>
            {data.map((row, i) => (
              <tr key={i} style={{ 
                backgroundColor: !isDarkMode && i % 2 !== 0 ? '#f8fafc' : 'transparent' // ถ้าเป็นโหมดสว่าง จะสลับสีแถวเว้นแถวให้ดูง่าย
              }}>
                {/* 🎯 [จุดสำคัญ] 4 คอลัมน์แรก ทำการเขียน Overwrite สไตล์เป็น 'textAlign: 'center'' เพื่อล็อกให้อยู่ตรงกลางตามที่คุณสั่ง */}
                <td style={{ ...cellStyle, textAlign: 'center', color: isDarkMode ? '#52a6ff' : '#0056b3', fontWeight: 'bold' }}>{row.symbol}</td>
                <td style={{ ...cellStyle, textAlign: 'center' }}>{row.start}</td>
                <td style={{ ...cellStyle, textAlign: 'center' }}>{row.avail}</td>
                <td style={{ ...cellStyle, textAlign: 'center' }}>{row.actual}</td>
                
                {/* คอลัมน์หลังจากนี้ ปล่อยให้สืบทอดสไตล์ชิดขวา (cellStyle ดั้งเดิม) ไม่โดนแทรกแซง */}
                <td style={cellStyle}>{row.avg.toFixed(2)}</td>
                {/* เงื่อนไขตรวจสอบราคาตลาดเปรียบเทียบราคาเฉลี่ย เพื่อเปลี่ยนสีตัวเลขเขียว/แดงอัตโนมัติ */}
                <td style={{ ...cellStyle, color: row.market > row.avg ? streamingGreen : streamingRed, fontWeight: 'bold' }}>{row.market.toFixed(2)}</td>
                <td style={cellStyle}>{row.amount.toLocaleString()}</td>
                <td style={cellStyle}>{row.mktVal.toLocaleString()}</td>
                
                {/* ตรวจสอบเครื่องหมายติดลบหรือบวกจากข้อมูลเพื่อพ่นสีเขียว/แดง */}
                <td style={{ ...cellStyle, color: row.plAmt.startsWith('+') ? streamingGreen : streamingRed }}>{row.plAmt}</td>
                <td style={{ ...cellStyle, color: row.plVal.startsWith('+') ? streamingGreen : streamingRed }}>{row.plVal}</td>
                <td style={{ ...cellStyle, color: row.percent.startsWith('+') ? streamingGreen : streamingRed, fontWeight: 'bold' }}>{row.percent}</td>
                <td style={{ ...cellStyle, color: isDarkMode ? '#7f8c9d' : '#94a3b8' }}>{row.realized}</td>
              </tr>
            ))}
            
            {/* 12. แถวสรุปผลรวมท้ายสุด (Table Footer / Total Row) */}
            <tr style={{ backgroundColor: isDarkMode ? '#161c26' : '#f1f5f9', fontWeight: 'bold' }}>
              {/* ใช้ colSpan="6" ควบรวมช่องตั้งแต่ SYMBOL จนถึง MARKET PRICE เข้าด้วยกัน แล้วดันคำว่า Total : ไปชิดขวา */}
              <td colSpan="6" style={{ ...cellStyle, textAlign: 'right', color: isDarkMode ? '#7f8c9d' : '#495057', paddingRight: '15px' }}>Total :</td>
              <td style={cellStyle}>176,400</td>
              <td style={cellStyle}>178,250</td>
              <td style={{ ...cellStyle, color: streamingGreen }}>+1,850</td>
              <td style={{ ...cellStyle, color: streamingGreen }}>+178,250</td>
              <td style={{ ...cellStyle, color: isDarkMode ? '#7f8c9d' : '#495057' }}>N/A</td>
              <td style={cellStyle}>0.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Positions_Portfolio;