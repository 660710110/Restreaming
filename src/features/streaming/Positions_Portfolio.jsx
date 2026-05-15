import React, { useState } from 'react';

const Positions_Portfolio = () => {
  const initialData = [
    { symbol: 'AOT', start: '1,000', avail: '1,000', actual: '1,000', avg: 48.50, market: 51.00, amount: 48500, mktVal: 51000, plAmt: '+2,500', plVal: '+51,000', percent: '+5.15%', realized: 'N/A' },
    { symbol: 'PTT', start: '2,000', avail: '2,000', actual: '2,000', avg: 35.20, market: 34.00, amount: 70400, mktVal: 68000, plAmt: '-2,400', plVal: '-68,000', percent: '-3.41%', realized: 'N/A' },
    { symbol: 'SCB', start: '500', avail: '500', actual: '500', avg: 115.00, market: 118.50, amount: 57500, mktVal: 59250, plAmt: '+1,750', plVal: '+59,250', percent: '+3.04%', realized: 'N/A' },
  ];

  const [data, setData] = useState(initialData);
  const [sortOrder, setSortOrder] = useState('ascend');
  const [isHovered, setIsHovered] = useState(false);

  // ฟังก์ชันเรียงลำดับข้อมูลเมื่อกด OK
  const handleSort = () => {
    const sortedData = [...data].sort((a, b) => {
      if (sortOrder === 'ascend') {
        return a.symbol.localeCompare(b.symbol);
      } else {
        return b.symbol.localeCompare(a.symbol);
      }
    });
    
    setData(sortedData);
    
    // แสดง Alert เพื่อให้รู้ว่าปุ่มถูกกดแล้วจริงๆ
    console.log("Sorting executed!");
    alert(`Sorted by Symbol: ${sortOrder}`);
  };

  const headerStyle = { 
    backgroundColor: '#252932', color: '#8e94a0', fontSize: '10px', 
    padding: '8px 4px', border: '1px solid #1a1d26', textAlign: 'center',
    verticalAlign: 'middle', whiteSpace: 'nowrap'
  };

  const cellStyle = { 
    padding: '10px 8px', borderBottom: '1px solid #2a2e39', 
    fontSize: '12px', whiteSpace: 'nowrap' 
  };

  return (
    <div style={{ backgroundColor: '#131722', color: 'white', borderRadius: '4px', marginBottom: '15px', border: '1px solid #2a2e39' }}>
      <div style={{ backgroundColor: '#b71c1c', padding: '6px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 'bold', fontSize: '13px' }}>Positions</span>
        <span style={{ fontSize: '11px' }}>{data.length} positions</span>
      </div>
      
      {/* Toolbar */}
      <div style={{ padding: '10px', display: 'flex', alignItems: 'center', gap: '15px', fontSize: '12px', backgroundColor: '#1a1d26' }}>
        <span>Order by</span>
        <select style={{ backgroundColor: '#2a2e39', color: 'white', border: '1px solid #444', borderRadius: '4px', padding: '2px' }}>
          <option>Symbol</option>
        </select>

        <div style={{ display: 'flex', gap: '10px' }}>
          <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <input type="radio" name="sortOrder" checked={sortOrder === 'ascend'} onChange={() => setSortOrder('ascend')} /> ascend
          </label>
          <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <input type="radio" name="sortOrder" checked={sortOrder === 'descend'} onChange={() => setSortOrder('descend')} /> descend
          </label>
        </div>

        {/* ปุ่ม OK ที่ปรับปรุงใหม่ */}
        <button 
          onClick={handleSort}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ 
            backgroundColor: isHovered ? '#d32f2f' : '#b71c1c', // เปลี่ยนสีเมื่อชี้
            border: 'none', 
            color: 'white', 
            padding: '4px 20px', 
            borderRadius: '4px', 
            cursor: 'pointer',
            fontSize: '12px', 
            fontWeight: 'bold',
            transition: 'all 0.2s',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)', // ขยายเล็กน้อยเมื่อชี้
            boxShadow: isHovered ? '0 0 8px rgba(183, 28, 28, 0.6)' : 'none'
          }}
        >
          OK
        </button>
      </div>

      <div style={{ overflowX: 'auto', width: '100%' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1000px' }}>
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
          <tbody>
            {data.map((row, i) => (
              <tr key={i} style={{ textAlign: 'right' }}>
                <td style={{ ...cellStyle, textAlign: 'left', color: '#4da3ff' }}>{row.symbol}</td>
                <td style={cellStyle}>{row.start}</td>
                <td style={cellStyle}>{row.avail}</td>
                <td style={cellStyle}>{row.actual}</td>
                <td style={cellStyle}>{row.avg.toFixed(2)}</td>
                <td style={{ ...cellStyle, color: row.market > row.avg ? '#4caf50' : '#f44336' }}>{row.market.toFixed(2)}</td>
                <td style={cellStyle}>{row.amount.toLocaleString()}</td>
                <td style={cellStyle}>{row.mktVal.toLocaleString()}</td>
                <td style={{ ...cellStyle, color: row.plAmt.startsWith('+') ? '#4caf50' : '#f44336' }}>{row.plAmt}</td>
                <td style={{ ...cellStyle, color: row.plVal.startsWith('+') ? '#4caf50' : '#f44336' }}>{row.plVal}</td>
                <td style={{ ...cellStyle, color: row.percent.startsWith('+') ? '#4caf50' : '#f44336' }}>{row.percent}</td>
                <td style={{ ...cellStyle, color: '#8e94a0' }}>{row.realized}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Positions_Portfolio;