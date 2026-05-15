import React, { useState, useEffect } from 'react';

const PortfolioForUser = () => {
  const [account, setAccount] = useState('237280');
  const [customerName, setCustomerName] = useState('');
  const [traderName, setTraderName] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showAccountList, setShowAccountList] = useState(false);

  const accountOptions = ['237280', '115240', '998210', '445320'];

  // ฟังก์ชัน Refresh ที่ปรับเวลาให้เร็วขึ้น (1.5 วินาที) และตรวจสอบสถานะ
  const handleRefresh = () => {
    if (isRefreshing) return; // ป้องกันการกดซ้ำซ้อน

    setIsRefreshing(true);
    
    // จำลองการโหลดข้อมูล (ปรับเหลือ 1.5 วินาที เพื่อให้เห็นผลเร็วและไม่ค้างนาน)
    setTimeout(() => {
      setIsRefreshing(false);
      console.log(`Updated data for account: ${account}`);
    }, 1500); 
  };

  // เมื่อเปลี่ยนเลขบัญชี ให้ยกเลิกสถานะ Loading ทันที (ป้องกันปุ่มค้างจากบัญชีก่อนหน้า)
  useEffect(() => {
    setIsRefreshing(false);
  }, [account]);

  const nameBoxStyle = {
    backgroundColor: '#1c1f26',
    border: '1px solid #2d3139',
    borderRadius: '4px',
    padding: '4px 12px',
    width: '240px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)'
  };

  const inputReset = {
    background: 'transparent',
    border: 'none',
    color: 'white',
    outline: 'none',
    width: '100%',
    fontSize: '12px',
    fontFamily: 'sans-serif'
  };

  return (
    <div style={{ backgroundColor: '#131722', color: 'white', borderRadius: '4px', marginBottom: '15px', border: '1px solid #2a2e39', overflow: 'visible', fontFamily: 'sans-serif' }}>
      <div style={{ backgroundColor: '#b71c1c', padding: '6px 12px', fontWeight: 'bold', fontSize: '13px' }}>
        PortFolio for User
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '12px 12px 8px 12px' }}>
        
        {/* Trading Account Selection */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', position: 'relative' }}>
          <span>Trading Account :</span>
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#1d212b', border: '1px solid #444', borderRadius: '4px' }}>
            <input 
              type="text" 
              value={account} 
              onChange={(e) => setAccount(e.target.value)}
              style={{ ...inputReset, width: '70px', padding: '4px 8px', textAlign: 'center' }}
            />
            <div 
              onClick={() => setShowAccountList(!showAccountList)}
              style={{ borderLeft: '1px solid #444', padding: '0 6px', cursor: 'pointer', backgroundColor: '#2a2e39', height: '22px', display: 'flex', alignItems: 'center' }}
            >
              <span style={{ fontSize: '8px' }}>▼</span>
            </div>
          </div>

          {/* Dropdown Menu */}
          {showAccountList && (
            <div style={{ 
              position: 'absolute', top: '30px', left: '110px', backgroundColor: '#1d212b', 
              border: '1px solid #444', borderRadius: '4px', zIndex: 100, width: '100px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.8)'
            }}>
              {accountOptions.map((opt) => (
                <div 
                  key={opt}
                  onClick={() => { setAccount(opt); setShowAccountList(false); }}
                  style={{ padding: '8px 10px', cursor: 'pointer', fontSize: '12px', borderBottom: '1px solid #333' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#b71c1c'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  {opt}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Auto Refresh Control */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px' }}>
          <span style={{ color: '#ccc' }}>Auto refresh :</span>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
            <input type="radio" name="refresh" /> <span style={{ fontSize: '11px' }}>OFF</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
            <input type="radio" name="refresh" defaultChecked /> <span style={{ fontSize: '11px' }}>ON</span>
          </label>
          
          <select style={{ backgroundColor: '#1d212b', color: 'white', border: '1px solid #444', borderRadius: '4px', padding: '2px 4px', fontSize: '12px', outline: 'none' }}>
            <option>1 min</option>
            <option>5 min</option>
            <option>10 min</option>
            <option>30 min</option>
          </select>
        </div>

        {/* ปุ่ม Refresh ที่แก้ไขแล้ว */}
        <button 
          onClick={handleRefresh}
          disabled={isRefreshing}
          style={{ 
            backgroundColor: isRefreshing ? '#444' : '#2a2e39', 
            color: isRefreshing ? '#888' : 'white', 
            border: '1px solid #444', 
            borderRadius: '4px', 
            padding: '2px 12px', 
            fontSize: '12px', 
            cursor: isRefreshing ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            minWidth: '85px',
            justifyContent: 'center'
          }}
        >
          <span style={{ 
            display: 'inline-block',
            animation: isRefreshing ? 'spin 1s linear infinite' : 'none' 
          }}>↻</span>
          {isRefreshing ? 'Loading' : 'refresh'}
        </button>

        {/* สไตล์สำหรับอนิเมชั่นหมุน (Inline CSS) */}
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>

      {/* Customer / Trader Name Fields */}
      <div style={{ display: 'flex', gap: '15px', padding: '0 12px 15px 12px' }}>
        <div style={nameBoxStyle}>
          <input 
            type="text" placeholder="Customer Name"
            value={customerName} onChange={(e) => setCustomerName(e.target.value)}
            style={inputReset}
          />
        </div>
        <div style={nameBoxStyle}>
          <input 
            type="text" placeholder="Trader Name"
            value={traderName} onChange={(e) => setTraderName(e.target.value)}
            style={inputReset}
          />
        </div>
      </div>
    </div>
  );
};

export default PortfolioForUser;