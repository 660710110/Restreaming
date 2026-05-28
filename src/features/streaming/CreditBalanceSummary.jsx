import React from 'react';

// รับ props isDarkMode มาจากไฟล์พ่อ (TradingPortfolioPage)
const CreditBalanceSummary = ({ isDarkMode }) => {
  
  // --- การจัดการ Style ตามโหมดสี ---
  
  // Style สำหรับกล่องเนื้อหาแต่ละส่วน (แบ่งเป็น 3 ช่อง)
  const summaryStyle = { 
    flex: 1, 
    padding: '10px' 
  };

  // Style สำหรับหัวข้อตัวเล็ก (เช่น Credit Limit)
  const labelStyle = { 
    fontSize: '11px', 
    // โหมดมืดใช้สีเทาอ่อน | โหมดสว่างใช้สีเทาเข้ม
    color: isDarkMode ? '#aaa' : '#666', 
    textTransform: 'uppercase',
    fontWeight: 'bold'
  };

  // Style สำหรับตัวเลขเงิน
  const valueStyle = { 
    fontSize: '24px', 
    fontWeight: 'bold', 
    margin: '5px 0',
    // โหมดมืดสีขาว | โหมดสว่างสีเทาเกือบดำ
    color: isDarkMode ? 'white' : '#1a1d26' 
  };

  // Style สำหรับหน่วยเงินด้านล่าง (Thai Baht)
  const unitStyle = { 
    fontSize: '10px', 
    color: isDarkMode ? '#666' : '#999' 
  };

  return (
    <div style={{ 
      // พื้นหลังกล่อง: โหมดมืดสีน้ำเงินเข้ม | โหมดสว่างสีขาว
      backgroundColor: isDarkMode ? '#1a1d26' : '#ffffff', 
      borderRadius: '6px', 
      marginBottom: '15px',
      // เพิ่มเส้นขอบเล็กน้อยในโหมดสว่างเพื่อให้กล่องดูมีมิติ
      border: isDarkMode ? 'none' : '1px solid #e2e8f0',
      transition: 'all 0.3s ease', // สลับโหมดแบบนุ่มนวล
      overflow: 'hidden'
    }}>
      
      {/* แถบหัวข้อสีแดง (Header) - คงไว้เป็นสีแดงตามต้นฉบับทั้งสองโหมด */}
      <div style={{ 
        backgroundColor: '#b71c1c', 
        padding: '8px 15px', 
        fontWeight: 'bold',
        color: 'white', // ตัวอักษรบนแถบแดงต้องขาวเสมอ
        fontSize: '13px'
      }}>
        Credit & Balance Summary
      </div>

      {/* ส่วนเนื้อหาหลักภายใน */}
      <div style={{ display: 'flex', textAlign: 'left', padding: '10px' }}>
        
        {/* ช่องที่ 1: Credit Limit */}
        <div style={summaryStyle}>
          <div style={labelStyle}>Credit Limit</div>
          <div style={valueStyle}>100,000.00</div>
          <div style={unitStyle}>Thai Baht</div>
        </div>

        {/* เส้นคั่นแนวตั้ง (Divider) */}
        <div style={{ 
          width: '1px', 
          backgroundColor: isDarkMode ? '#333' : '#eee', 
          margin: '10px 0' 
        }}></div>

        {/* ช่องที่ 2: Line Available */}
        <div style={summaryStyle}>
          <div style={labelStyle}>Line Available</div>
          <div style={valueStyle}>0.00</div>
          <div style={unitStyle}>Thai Baht</div>
        </div>

        {/* เส้นคั่นแนวตั้ง (Divider) */}
        <div style={{ 
          width: '1px', 
          backgroundColor: isDarkMode ? '#333' : '#eee', 
          margin: '10px 0' 
        }}></div>

        {/* ช่องที่ 3: Cash Balance */}
        <div style={summaryStyle}>
          <div style={labelStyle}>Cash Balance</div>
          <div style={valueStyle}>0.00</div>
          <div style={unitStyle}>Thai Baht</div>
        </div>

      </div>
    </div>
  );
};

export default CreditBalanceSummary;