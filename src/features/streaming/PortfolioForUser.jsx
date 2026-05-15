import React, { useState, useEffect } from 'react';

// รับ props isDarkMode จาก TradingPortfolioPage
const PortfolioForUser = ({ isDarkMode }) => {
  const [account, setAccount] = useState('237280');
  const [customerName, setCustomerName] = useState('');
  const [traderName, setTraderName] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showAccountList, setShowAccountList] = useState(false);

  const accountOptions = ['237280', '115240', '998210', '445320'];

  const handleRefresh = () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      console.log(`Updated data for account: ${account}`);
    }, 1500); 
  };

  useEffect(() => {
    setIsRefreshing(false);
  }, [account]);

  // --- การจัดการสไตล์ตามโหมดสี ---

  // สไตล์สำหรับกล่องกรอกชื่อ Customer / Trader
  const nameBoxStyle = {
    // โหมดมืดสีเข้ม | โหมดสว่างสีขาวนวล
    backgroundColor: isDarkMode ? '#1c1f26' : '#f8fafc',
    border: isDarkMode ? '1px solid #2d3139' : '1px solid #cbd5e0',
    borderRadius: '4px',
    padding: '4px 12px',
    width: '240px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    boxShadow: isDarkMode ? 'inset 0 1px 3px rgba(0,0,0,0.5)' : 'inset 0 1px 2px rgba(0,0,0,0.05)'
  };

  // สไตล์พื้นฐานของ Input
  const inputReset = {
    background: 'transparent',
    border: 'none',
    // โหมดมืดสีขาว | โหมดสว่างสีเทาเข้ม
    color: isDarkMode ? 'white' : '#1e293b',
    outline: 'none',
    width: '100%',
    fontSize: '12px',
    fontFamily: 'sans-serif'
  };

  return (
    <div style={{ 
      // พื้นหลังกล่องหลัก: โหมดมืดสีน้ำเงินเข้ม | โหมดสว่างสีขาว
      backgroundColor: isDarkMode ? '#131722' : '#ffffff', 
      color: isDarkMode ? 'white' : '#1e293b', 
      borderRadius: '4px', 
      marginBottom: '15px', 
      border: isDarkMode ? '1px solid #2a2e39' : '1px solid #e2e8f0', 
      overflow: 'visible', 
      fontFamily: 'sans-serif',
      transition: 'all 0.3s ease'
    }}>
      {/* แถบ Header สีแดง (คงเอกลักษณ์แอป) */}
      <div style={{ backgroundColor: '#b71c1c', padding: '6px 12px', fontWeight: 'bold', fontSize: '13px', color: 'white' }}>
        PortFolio for User
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '12px 12px 8px 12px' }}>
        
        {/* Trading Account Selection */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', position: 'relative' }}>
          <span style={{ color: isDarkMode ? 'white' : '#64748b' }}>Trading Account :</span>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            backgroundColor: isDarkMode ? '#1d212b' : '#ffffff', 
            border: isDarkMode ? '1px solid #444' : '1px solid #cbd5e0', 
            borderRadius: '4px' 
          }}>
            <input 
              type="text" 
              value={account} 
              onChange={(e) => setAccount(e.target.value)}
              style={{ ...inputReset, width: '70px', padding: '4px 8px', textAlign: 'center' }}
            />
            <div 
              onClick={() => setShowAccountList(!showAccountList)}
              style={{ 
                borderLeft: isDarkMode ? '1px solid #444' : '1px solid #cbd5e0', 
                padding: '0 6px', 
                cursor: 'pointer', 
                backgroundColor: isDarkMode ? '#2a2e39' : '#f1f5f9', 
                height: '22px', 
                display: 'flex', 
                alignItems: 'center',
                color: isDarkMode ? 'white' : '#64748b'
              }}
            >
              <span style={{ fontSize: '8px' }}>▼</span>
            </div>
          </div>

          {/* Dropdown Menu */}
          {showAccountList && (
            <div style={{ 
              position: 'absolute', top: '30px', left: '110px', 
              backgroundColor: isDarkMode ? '#1d212b' : '#ffffff', 
              border: isDarkMode ? '1px solid #444' : '1px solid #e2e8f0', 
              borderRadius: '4px', zIndex: 100, width: '100px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}>
              {accountOptions.map((opt) => (
                <div 
                  key={opt}
                  onClick={() => { setAccount(opt); setShowAccountList(false); }}
                  style={{ 
                    padding: '8px 10px', cursor: 'pointer', fontSize: '12px', 
                    borderBottom: isDarkMode ? '1px solid #333' : '1px solid #f1f5f9',
                    color: isDarkMode ? 'white' : '#1e293b'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = isDarkMode ? '#b71c1c' : '#fef2f2'}
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
          <span style={{ color: isDarkMode ? '#ccc' : '#64748b' }}>Auto refresh :</span>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
            <input type="radio" name="refresh" /> <span style={{ fontSize: '11px' }}>OFF</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
            <input type="radio" name="refresh" defaultChecked /> <span style={{ fontSize: '11px' }}>ON</span>
          </label>
          
          <select style={{ 
            backgroundColor: isDarkMode ? '#1d212b' : '#ffffff', 
            color: isDarkMode ? 'white' : '#1e293b', 
            border: isDarkMode ? '1px solid #444' : '1px solid #cbd5e0', 
            borderRadius: '4px', padding: '2px 4px', fontSize: '12px', outline: 'none' 
          }}>
            <option>1 min</option>
            <option>5 min</option>
          </select>
        </div>

        {/* ปุ่ม Refresh */}
        <button 
          onClick={handleRefresh}
          disabled={isRefreshing}
          style={{ 
            backgroundColor: isRefreshing ? (isDarkMode ? '#444' : '#e2e8f0') : (isDarkMode ? '#2a2e39' : '#f1f5f9'), 
            color: isRefreshing ? '#888' : (isDarkMode ? 'white' : '#475569'), 
            border: isDarkMode ? '1px solid #444' : '1px solid #cbd5e0', 
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

      {/* สไตล์สำหรับอนิเมชั่นหมุน */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default PortfolioForUser;