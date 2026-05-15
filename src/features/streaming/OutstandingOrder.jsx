import React from 'react';

// รับ props isDarkMode มาจากไฟล์พ่อ (TradingPortfolioPage)
const OutstandingOrder = ({ isDarkMode }) => {
  const orders = [
    { id: '1001234', fis: '-', symbol: 'AOT', time: '10:30:15', side: 'B', price: '51.00', vol: '1,000', ice: '-', valid: 'Day', match: '1,000', bal: '0', can: '0', status: 'Matched', statusColor: '#3d4b7c', action: 'View' },
    { id: '1001235', fis: '-', symbol: 'PTT', time: '10:42:08', side: 'S', price: '34.50', vol: '500', ice: '-', valid: 'Day', match: '0', bal: '500', can: '0', status: 'Open', statusColor: '#2e4a31', action: 'Detail', showCancel: true },
    { id: '1001236', fis: '-', symbol: 'KBANK', time: '10:45:22', side: 'B', price: '140.00', vol: '200', ice: '-', valid: 'Day', match: '100', bal: '100', can: '0', status: 'Partial', statusColor: '#6b4f1a', action: 'Change', showCancel: true },
  ];

  // --- การจัดการ Style ตามโหมดสี ---

  // หัวตาราง (Table Header)
  const thStyle = { 
    // โหมดมืดสีเทาเข้ม | โหมดสว่างสีเทาอ่อนมาก
    backgroundColor: isDarkMode ? '#252932' : '#f8f9fa', 
    // โหมดมืดตัวหนังสือเทาอ่อน | โหมดสว่างตัวหนังสือเทาเข้ม
    color: isDarkMode ? '#8e94a0' : '#495057', 
    fontSize: '10px', 
    padding: '8px 4px', 
    fontWeight: 'bold', 
    borderBottom: isDarkMode ? '1px solid #1a1d26' : '1px solid #dee2e6' 
  };

  // ช่องข้อมูล (Table Data)
  const tdStyle = { 
    padding: '10px 4px', 
    borderBottom: isDarkMode ? '1px solid #2a2e39' : '1px solid #edf2f7', 
    fontSize: '11px',
    // ปรับสีตัวหนังสือหลักตามโหมด
    color: isDarkMode ? 'white' : '#2d3748'
  };

  return (
    <div style={{ 
      // พื้นหลังกล่องหลัก
      backgroundColor: isDarkMode ? '#131722' : '#ffffff', 
      borderRadius: '4px', 
      overflow: 'hidden', 
      border: isDarkMode ? '1px solid #2a2e39' : '1px solid #e2e8f0',
      transition: 'all 0.3s ease' 
    }}>
      
      {/* แถบหัวข้อสีแดง (Header) - คงสีแดงไว้ทั้งสองโหมดตามอัตลักษณ์แอป */}
      <div style={{ backgroundColor: '#b71c1c', padding: '6px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 'bold', fontSize: '13px', color: 'white' }}>Outstanding Order</span>
        <span style={{ fontSize: '11px', color: '#4caf50' }}>● Live</span>
      </div>

      {/* แถบเครื่องมือ (Tool Bar) */}
      <div style={{ 
        padding: '8px 12px', 
        backgroundColor: isDarkMode ? '#1a1d26' : '#f1f5f9', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: isDarkMode ? 'none' : '1px solid #e2e8f0'
      }}>
        <button style={{ 
          backgroundColor: 'transparent', 
          border: isDarkMode ? '1px solid #444' : '1px solid #cbd5e0', 
          color: isDarkMode ? '#ccc' : '#4a5568', 
          fontSize: '10px', 
          borderRadius: '15px', 
          padding: '2px 10px',
          cursor: 'pointer'
        }}>
          ⓘ Order Status Meaning
        </button>
        <div style={{ fontSize: '11px', color: isDarkMode ? 'white' : '#2d3748' }}>
          Insert PIN for Cancel: 
          <input 
            type="password" 
            value="****" 
            readOnly 
            style={{ 
              width: '50px', 
              backgroundColor: isDarkMode ? '#131722' : '#fff', 
              border: isDarkMode ? '1px solid #444' : '1px solid #cbd5e0', 
              color: isDarkMode ? 'white' : '#000', 
              textAlign: 'center', 
              marginLeft: '5px' 
            }} 
          />
        </div>
      </div>

      {/* ตารางรายการคำสั่งซื้อ */}
      <div style={{ overflowX: 'auto' }}> {/* เพิ่มเผื่อกรณีจอมือถือ */}
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
          <thead>
            <tr>
              <th style={thStyle}>ORDER NO</th>
              <th style={thStyle}>FIS NO</th>
              <th style={thStyle}>SYMBOL</th>
              <th style={thStyle}>TIME</th>
              <th style={thStyle}>SIDE</th>
              <th style={thStyle}>PRICE</th>
              <th style={thStyle}>VOL</th>
              <th style={thStyle}>ICEBERG VOL</th>
              <th style={thStyle}>VALID</th>
              <th style={thStyle}>MATCHED</th>
              <th style={thStyle}>BALANCE</th>
              <th style={thStyle}>CANCELLED</th>
              <th style={thStyle}>STATUS</th>
              <th style={thStyle}>CANCEL</th>
              <th style={thStyle}>DETAIL/ CHANGE</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={i} style={{ 
                // เพิ่มสีพื้นหลังสลับแถวในโหมดสว่างเพื่อให้อ่านง่ายขึ้น
                backgroundColor: !isDarkMode && i % 2 !== 0 ? '#f8fafc' : 'transparent' 
              }}>
                <td style={tdStyle}>{order.id}</td>
                <td style={{ ...tdStyle, color: isDarkMode ? '#666' : '#94a3b8' }}>{order.fis}</td>
                <td style={{ ...tdStyle, color: '#4da3ff', fontWeight: 'bold' }}>{order.symbol}</td>
                <td style={tdStyle}>{order.time}</td>
                <td style={tdStyle}>
                  <span style={{ 
                    color: order.side === 'B' ? '#4caf50' : '#f44336', 
                    border: `1px solid ${order.side === 'B' ? '#4caf50' : '#f44336'}`, 
                    padding: '0 4px', 
                    borderRadius: '2px', 
                    fontSize: '10px',
                    fontWeight: 'bold'
                  }}>
                    {order.side}
                  </span>
                </td>
                <td style={tdStyle}>{order.price}</td>
                <td style={tdStyle}>{order.vol}</td>
                <td style={{ ...tdStyle, color: isDarkMode ? '#666' : '#94a3b8' }}>{order.ice}</td>
                <td style={tdStyle}>{order.valid}</td>
                <td style={tdStyle}>{order.match}</td>
                <td style={tdStyle}>{order.bal}</td>
                <td style={tdStyle}>{order.can}</td>
                <td style={tdStyle}>
                  <span style={{ 
                    backgroundColor: order.statusColor, 
                    color: 'white', // ตัวหนังสือในป้ายสถานะให้เป็นสีขาวเสมอ
                    padding: '2px 10px', 
                    borderRadius: '10px', 
                    fontSize: '10px', 
                    minWidth: '60px', 
                    display: 'inline-block' 
                  }}>
                    {order.status}
                  </span>
                </td>
                <td style={{ 
                  ...tdStyle, 
                  color: order.showCancel ? '#f44336' : (isDarkMode ? '#666' : '#cbd5e0'), 
                  cursor: order.showCancel ? 'pointer' : 'default',
                  textDecoration: order.showCancel ? 'underline' : 'none'
                }}>
                  {order.showCancel ? 'Cancel' : '—'}
                </td>
                <td style={{ ...tdStyle, color: '#4da3ff', cursor: 'pointer', textDecoration: 'underline' }}>{order.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OutstandingOrder;