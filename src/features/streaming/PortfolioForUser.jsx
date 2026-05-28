import React, { useState, useEffect, useRef } from 'react';

// รับ props isDarkMode จาก TradingPortfolioPage
const PortfolioForUser = ({ isDarkMode }) => {
  // --- การประกาศ State ต่าง ๆ ---
  const [account, setAccount] = useState('237280'); // State สำหรับเก็บหมายเลขบัญชีเทรด
  const [customerName, setCustomerName] = useState(''); // State สำหรับเก็บชื่อลูกค้าที่ผู้ใช้กรอก
  const [traderName, setTraderName] = useState(''); // State สำหรับเก็บชื่อเทรดเดอร์ที่ผู้ใช้กรอก
  const [isRefreshing, setIsRefreshing] = useState(false); // State สำหรับสถานะกำลังรีเฟรชข้อมูล (เพื่อทำอนิเมชั่น)
  const [autoRefresh, setAutoRefresh] = useState('ON'); // State เก็บการเปิด-ปิดระบบ Auto Refresh ('ON' / 'OFF')
  const [refreshInterval, setRefreshInterval] = useState('1 min'); // State เก็บระยะเวลารีเฟรช เช่น '1 min', '5 min'

  // รายการบัญชีเทรดที่มีให้เลือกใน Dropdown
  const accountOptions = ['237280', '115240', '998210', '445320'];

  // ฟังก์ชันรีเฟรชข้อมูล จำลองการรีโหลดข้อมูล 1.5 วินาที
  const handleRefresh = () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      console.log(`Updated data for account: ${account}`);
    }, 1500); 
  };

  // ถ้าระบบเปลี่ยนบัญชีเทรด ให้ยกเลิกสถานะกำลังรีเฟรชก่อน
  useEffect(() => {
    setIsRefreshing(false);
  }, [account]);

  // --- ระบบ Auto Refresh ทำงานอัตโนมัติตามระยะเวลาที่เลือก ---
  
  // ใช้ useRef เพื่อเก็บฟังก์ชัน handleRefresh ล่าสุด
  // วิธีนี้ช่วยป้องกันการ Reset / Restart ตัวจับเวลา (Interval) ทุกครั้งที่ช่องกรอกข้อมูลหรือหน้าจอมีการเรนเดอร์ใหม่
  const handleRefreshRef = useRef(handleRefresh);
  
  useEffect(() => {
    handleRefreshRef.current = handleRefresh;
  }, [handleRefresh]);

  useEffect(() => {
    let intervalId = null;

    // ทำงานเฉพาะเมื่อเลือก Auto Refresh เป็น 'ON' เท่านั้น
    if (autoRefresh === 'ON') {
      // แปลงข้อความช่วงเวลา (เช่น '1 min' หรือ '5 min') ให้เป็นตัวเลขจำนวนนาที
      const minutes = parseInt(refreshInterval, 10) || 1;
      const ms = minutes * 60 * 1000; // แปลงหน่วยนาทีให้เป็นมิลลิวินาที (1 นาที = 60,000 ms)

      // เริ่มต้นนับเวลาถอยหลังเพื่อรันฟังก์ชันรีเฟรชข้อมูลอัตโนมัติ
      intervalId = setInterval(() => {
        console.log(`Auto refreshing portfolio for account: ${account}`);
        // เรียกใช้ฟังก์ชัน handleRefresh ล่าสุดผ่าน Ref
        handleRefreshRef.current();
      }, ms);
    }

    // ฟังก์ชันเคลียร์ (Cleanup Function) จะทำงานเพื่อยกเลิกการนับเวลาก่อนหน้า
    // เมื่อผู้ใช้กดปิด (OFF), เปลี่ยนเวลา หรือเปลี่ยนบัญชีเทรด เพื่อไม่ให้ตัวนับเวลาทำงานทับซ้อนกัน
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [autoRefresh, refreshInterval, account]); // จะรันเอฟเฟกต์ใหม่เมื่อสลับ ON/OFF, เปลี่ยนระยะเวลา หรือเปลี่ยนหมายเลขบัญชี

  // --- กำหนดค่าตัวแปร CSS (Theme Colors) สำหรับโหมดมืดและโหมดสว่าง ---
  const themeVars = isDarkMode
    ? {
        '--bg': '#131722', // พื้นหลังกล่องหลัก (น้ำเงินเข้มมาก)
        '--border': '#2a2e39', // เส้นขอบกล่องหลัก
        '--text': '#b2b5be', // ตัวหนังสือฉลากทั่วไป (สีเทาอ่อน)
        '--text-light': '#ffffff', // ตัวหนังสือที่ต้องการความสว่าง (สีขาว)
        '--select-bg': '#1e222d', // พื้นหลังของช่องเลือก Dropdown ต่าง ๆ
        '--select-border': '#2c3142', // เส้นขอบของ Dropdown ต่าง ๆ
        '--select-hover-border': '#3f4456', // เส้นขอบของ Dropdown เมื่อโฮเวอร์
        '--btn-bg': 'transparent', // พื้นหลังปุ่ม Refresh
        '--btn-border': '#363c4e', // เส้นขอบปุ่ม Refresh
        '--btn-text': '#d1d4dc', // ตัวหนังสือปุ่ม Refresh
        '--btn-hover-bg': '#2a2e39', // พื้นหลังปุ่ม Refresh เมื่อโฮเวอร์
        
        // สไตล์สำหรับป้ายชื่อ Customer / Trader (Badge สีแดงเข้มสไตล์แอปเทรด)
        '--badge-bg': '#2b1416', // พื้นหลังป้ายชื่อสีแดงเข้ม
        '--badge-border': '#5c1e22', // เส้นขอบป้ายชื่อสีแดง
        '--badge-text': '#ff8a80', // ตัวหนังสือบนป้ายชื่อสีชมพูแดงระเรื่อ
        
        // สไตล์สำหรับกล่องกรอกข้อมูล (Input) ข้าง ๆ ป้ายชื่อ
        '--input-bg': '#1c1f26', // พื้นหลังช่องกรอกข้อมูลสีเทาเข้ม
        '--input-border': '#2d3139', // เส้นขอบช่องกรอกข้อมูล
        '--input-focus-border': '#3888ff', // เส้นขอบเมื่อคลิกโฟกัส (สีฟ้าเรืองแสง)
        '--input-color': '#ffffff', // ตัวหนังสือที่พิมพ์ลงในช่องกรอก
        '--input-shadow': 'inset 0 1px 3px rgba(0,0,0,0.5)', // เงาจำลองเลเยอร์ยุบเข้าไป
        
        '--radio-border': '#4c525e', // เส้นขอบวงกลมวิทยุเมื่อไม่ได้เลือก
        '--radio-active-color': '#3888ff', // สีของวงกลมวิทยุเมื่อถูกเลือก (สีฟ้าเรืองแสง)
      }
    : {
        '--bg': '#ffffff', // พื้นหลังกล่องหลัก (สีขาว)
        '--border': '#e2e8f0', // เส้นขอบกล่องหลัก
        '--text': '#475569', // ตัวหนังสือฉลากทั่วไป
        '--text-light': '#1e293b', // ตัวหนังสือที่ต้องการความชัดเจน
        '--select-bg': '#ffffff', // พื้นหลัง Dropdown
        '--select-border': '#cbd5e0', // เส้นขอบ Dropdown
        '--select-hover-border': '#94a3b8', // เส้นขอบ Dropdown เมื่อโฮเวอร์
        '--btn-bg': '#f8fafc', // พื้นหลังปุ่ม Refresh
        '--btn-border': '#cbd5e0', // เส้นขอบปุ่ม Refresh
        '--btn-text': '#475569', // ตัวหนังสือปุ่ม Refresh
        '--btn-hover-bg': '#e2e8f0', // พื้นหลังปุ่ม Refresh เมื่อโฮเวอร์
        
        // สไตล์สำหรับป้ายชื่อโหมดสว่าง
        '--badge-bg': '#fff5f5', // พื้นหลังป้ายสีแดงอ่อนนวล
        '--badge-border': '#feb2b2', // เส้นขอบสีชมพูอ่อน
        '--badge-text': '#c53030', // ตัวหนังสือสีแดงเข้มเพื่อให้อ่านง่าย
        
        // สไตล์ช่องกรอกโหมดสว่าง
        '--input-bg': '#f8fafc', // พื้นหลังช่องกรอกสีเทาขาวนวล
        '--input-border': '#cbd5e0', // เส้นขอบ
        '--input-focus-border': '#0066cc', // เส้นขอบเมื่อโฟกัส
        '--input-color': '#1e293b', // ตัวหนังสือที่พิมพ์
        '--input-shadow': 'inset 0 1px 2px rgba(0,0,0,0.05)',
        
        '--radio-border': '#cbd5e0',
        '--radio-active-color': '#0066cc',
      };

  return (
    <div 
      className="portfolio-container"
      style={{ 
        ...themeVars,
        backgroundColor: 'var(--bg)', 
        color: 'var(--text-light)', 
        borderRadius: '6px', 
        marginBottom: '15px', 
        border: '1px solid var(--border)', 
        overflow: 'visible',
        transition: 'all 0.3s ease'
      }}
    >
      {/* สไตล์ชีท CSS สำหรับฟอร์แมตปุ่มและเลย์เอาต์ตามรูปภาพตัวอย่าง */}
      <style>{`
        .portfolio-container {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        
        /* หัวการ์ดสีแดงพร้อมขอบมนโค้ง */
        .portfolio-header {
          background-color: #b71c1c; 
          padding: 8px 12px; 
          font-weight: 700; 
          font-size: 13px; 
          color: white;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          letter-spacing: 0.3px;
        }

        /* แถบจัดวางคอนโทรลหลัก */
        .controls-row {
          display: flex; 
          align-items: center; 
          gap: 24px; 
          padding: 12px 12px 10px 12px;
        }

        /* จัดกรุ๊ปตัวหนังสือฉลากคู่กับตัวควบคุม */
        .control-group {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
        }

        .control-label {
          color: var(--text-muted);
          font-weight: 500;
        }

        /* ออกแบบ Dropdown สำหรับเลือกบัญชีและตั้งค่าเวลาด้วย Native CSS ปิดบั๊กต่าง ๆ */
        .account-select {
          background-color: var(--select-bg);
          border: 1px solid var(--select-border);
          color: var(--text-light);
          border-radius: 4px;
          padding: 3px 22px 3px 8px;
          font-size: 12px;
          font-weight: 500;
          outline: none;
          cursor: pointer;
          appearance: none;
          /* ใช้รูปภาพเวกเตอร์ SVG สำหรับรูปลูกศรชี้ลงตรงขอบขวา */
          background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3E%3Cpath fill='%238f96a3' d='M5 7L2 3h6z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 6px center;
          width: 90px;
          text-align-last: center;
          transition: border-color 0.2s;
        }

        .account-select:hover {
          border-color: var(--select-hover-border);
        }

        /* ปุ่มวิทยุ (Radio Options) แบบปรับแต่งเอง (OFF/ON) */
        .custom-radio {
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          user-select: none;
          font-size: 11px;
          font-weight: 600;
          color: var(--text-muted);
          transition: color 0.2s;
        }

        .custom-radio.active {
          color: var(--text-light);
        }

        /* โครงร่างวงกลมนอก */
        .radio-circle {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          border: 1.5px solid var(--radio-border);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.2s, background-color 0.2s;
        }

        .custom-radio.active .radio-circle {
          border-color: var(--radio-active-color);
        }

        /* จุดวงกลมเล็กด้านในแสดงเมื่อมีการเลือกงาน (Active) */
        .radio-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--radio-active-color);
          transform: scale(0);
          transition: transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .custom-radio.active .radio-dot {
          transform: scale(1);
        }

        /* ตัวเลือก Dropdown ตั้งเวลา */
        .interval-select {
          background-color: var(--select-bg); 
          color: var(--text-light); 
          border: 1px solid var(--select-border); 
          border-radius: 4px; 
          padding: 3px 20px 3px 8px; 
          font-size: 11px; 
          font-weight: 600;
          outline: none; 
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3E%3Cpath fill='%238f96a3' d='M5 7L2 3h6z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 6px center;
          width: 65px;
          transition: border-color 0.2s;
        }

        /* 🆕 จุดเสริมสไตล์เสริมเพิ่มเติม (ไม่ใช่การแก้โค้ดหลัก): */
        /* ช่วยเพิ่มเอฟเฟกต์ให้ Dropdown เลือกเวลาและปุ่มรีเฟรชดูจางลงและกดไม่ได้เมื่อติดสถานะ disabled */
        .interval-select:disabled, .refresh-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .interval-select:hover:not(:disabled) {
          border-color: var(--select-hover-border);
        }

        /* ปุ่ม Refresh สไตล์โมเดิร์นของแอปหุ้น */
        .refresh-btn {
          background-color: var(--btn-bg); 
          color: var(--btn-text); 
          border: 1px solid var(--btn-border); 
          border-radius: 4px; 
          padding: 3px 12px; 
          font-size: 12px; 
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          height: 24px;
          transition: all 0.2s ease;
        }

        .refresh-btn:hover:not(:disabled) {
          background-color: var(--btn-hover-bg);
          color: var(--text-light);
          border-color: var(--select-hover-border);
        }

        /* การจัดวางช่องกรอกชื่อ Customer และ Trader */
        .name-inputs-row {
          display: flex; 
          gap: 20px; 
          padding: 0 12px 15px 12px;
        }

        /* กรุ๊ปคู่ที่รวม "ป้ายชื่อสีแดง" และ "ช่องกรอกด้านขวา" เข้าติดด้วยกัน */
        .name-input-group {
          display: flex;
          align-items: center;
          flex: 1; // ขยายแบ่งสัดส่วนคนละครึ่งจออย่างเท่ากัน
          gap: 0px; // นำ gap ออกเพื่อให้กล่องแนบติดกันสนิท
        }

        /* บล็อกป้ายชื่อสีแดงเล็ก ๆ (Badge Label) ด้านซ้าย */
        .name-badge-label {
          background-color: var(--badge-bg);
          border: 1px solid var(--badge-border);
          border-right: none; // ลบเส้นขอบด้านขวาออกเพื่อให้ประสานเข้ากับกล่องกรอกข้อมูล
          color: var(--badge-text);
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
          border-top-right-radius: 0px;
          border-bottom-right-radius: 0px;
          padding: 3px 12px;
          font-size: 11px;
          font-weight: 600;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
          box-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }

        /* ช่องว่างสำหรับกรอกข้อมูล (Input Box) ด้านขวาที่เชื่อมต่อสนิทกับป้ายชื่อ */
        .name-input-field-box {
          background-color: var(--input-bg);
          border: 1px solid var(--input-border);
          border-top-left-radius: 0px;
          border-bottom-left-radius: 0px;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          padding: 2px 10px;
          color: var(--input-color);
          height: 24px;
          flex: 1; // ยืดช่องกรอกเพื่อเติมเต็มพื้นที่ของกรุ๊ปให้สมบูรณ์
          font-size: 12px;
          font-weight: 500;
          outline: none;
          font-family: inherit;
          box-shadow: var(--input-shadow);
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .name-input-field-box:focus {
          border-color: var(--input-focus-border);
        }

        /* หมุนอนิเมชั่นปุ่มดาวน์โหลด */
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .spinning {
          animation: spin 1.5s linear infinite;
        }

        /* 🆕 โค้ด CSS พิเศษที่เพิ่มเข้าไป: ปิดตัวช่วยลูกศรซ้ำซ้อนของระบบบราวเซอร์ดั้งเดิมเพื่อไม่ให้เกิดข้อความหรือสัญลักษณ์ขึ้นมาซ้อนทับกัน */
        .account-select::-webkit-calendar-picker-indicator,
        .interval-select::-webkit-calendar-picker-indicator {
          opacity: 0 !important;
          position: absolute;
          right: 0;
          width: 25px;
          height: 100%;
          cursor: pointer;
        }
      `}</style>

      {/* แถบ Header สีแดงตามตัวอย่างแอปเทรด */}
      <div className="portfolio-header">
        PortFolio for User
      </div>

      {/* ส่วนปุ่มควบคุมบัญชี และการตั้งค่ารีเฟรช */}
      <div className="controls-row">
        
        {/* คอนโทรลเลือกบัญชีผู้ใช้ (Trading Account) */}
        <div className="control-group">
          <span className="control-label">Trading Account :</span>
          {/* // 🆕 เปลี่ยนแปลงโค้ด: เปลี่ยนจาก Tag <select> เป็น <input type="text"> ร่วมกับคุณสมบัติ list เพื่อให้กรอกข้อความอิสระพร้อมเลือก Dropdown ในปุ่มเดิมได้ และเมื่อเลือกค่าเสร็จจะหลุดโฟกัสอัตโนมัติด้วย onInput */}
          <input 
            type="text"
            className="account-select"
            list="account-options-list"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            onInput={(e) => {
              if (accountOptions.includes(e.target.value)) { e.target.blur(); }
            }}
          />
          {/* // 🆕 เพิ่มเติมโค้ด: นำชุดข้อมูลตัวเลือกที่มีอยู่มาผูกเข้ากับ <datalist> เพื่อเปิดแสดงรายการ Dropdown ควบคู่กับกล่องกรอกข้อมูลด้านบน */}
          <datalist id="account-options-list">
            {accountOptions.map((opt) => (
              <option key={opt} value={opt} />
            ))}
          </datalist>
        </div>

        {/* คอนโทรลควบคุมระบบรีเฟรชข้อมูลอัตโนมัติ (Auto Refresh) */}
        <div className="control-group" style={{ gap: '12px' }}>
          <span className="control-label">Auto refresh :</span>
          
          {/* วิทยุจำลองปุ่มเลือก OFF */}
          <div 
            className={`custom-radio ${autoRefresh === 'OFF' ? 'active' : ''}`}
            onClick={() => setAutoRefresh('OFF')}
          >
            <div className="radio-circle">
              <div className="radio-dot" />
            </div>
            <span>OFF</span>
          </div>

          {/* วิทยุจำลองปุ่มเลือก ON */}
          <div 
            className={`custom-radio ${autoRefresh === 'ON' ? 'active' : ''}`}
            onClick={() => setAutoRefresh('ON')}
          >
            <div className="radio-circle">
              <div className="radio-dot" />
            </div>
            <span>ON</span>
          </div>
          
          {/* Dropdown ตัวเลือกเวลา */}
          {/* // 🆕 เปลี่ยนแปลงโค้ด: เปลี่ยนจาก Tag <select> มาเป็น <input type="text"> ร่วมกับ list ของ HTML5 เพื่อให้พิมพ์ตัวเลขได้ตามต้องการ */}
          {/* // 🆕 เพิ่มเติมอีเวนต์ onBlur: ใช้สำหรับตรวจสอบข้อมูลที่กรอกเสร็จ ถ้าผู้ใช้ป้อนเข้ามาเฉพาะตัวเลขล้วน จะนำคำว่า " min" ไปเติมต่อท้ายให้อัตโนมัติทันที */}
          <input 
            type="text"
            className="interval-select"
            list="interval-options-list"
            value={refreshInterval}
            onChange={(e) => setRefreshInterval(e.target.value)}
            onInput={(e) => {
              if (['1 min', '5 min'].includes(e.target.value)) { e.target.blur(); }
            }}
            onBlur={(e) => {
              const val = e.target.value.trim();
              if (val && /^\d+$/.test(val)) {
                setRefreshInterval(`${val} min`);
              }
            }}
            style={{ marginLeft: '4px' }}
            disabled={autoRefresh === 'OFF'}
          />
          {/* // 🆕 เพิ่มเติมโค้ด: สำรองค่าลิสต์ตัวเลือกหลัก '1 min' และ '5 min' ไว้ให้เรียกกดดูผ่านตัวปุ่ม Dropdown ได้ตลอดเวลา */}
          <datalist id="interval-options-list">
            <option value="1 min" />
            <option value="5 min" />
          </datalist>
        </div>

        {/* ปุ่มรีเฟรชสดข้อมูล (Refresh Button) */}
        {/* // 🆕 เพิ่มเติมเงื่อนไข: ปรับค่า attribute `disabled` เดิม ให้พ่วงเงื่อนไขเพิ่มเข้าไป */}
        {/* // โดยถ้า autoRefresh === 'ON' ปุ่มรีเฟรชนี้จะกดใช้งานไม่ได้ทันที และจะกดไม่ได้เช่นกันหากระบบอยู่ระหว่างรีเฟรช (isRefreshing) */}
        <button 
          onClick={handleRefresh}
          disabled={autoRefresh === 'ON' || isRefreshing}
          className="refresh-btn"
        >
          <span className={isRefreshing ? 'spinning' : ''} style={{ display: 'inline-block' }}>↻</span>
          refresh
        </button>

      </div>

      {/* ส่วนกรอกชื่อที่ประกอบด้วย ป้ายชื่อสีแดงแดง และช่องกรอกข้อมูลว่างด้านข้าง */}
      <div className="name-inputs-row">
        
        {/* ส่วนบล็อก Customer Name */}
        <div className="name-input-group">
          {/* ป้ายชื่อสีแดงขนาดเล็ก */}
          <div className="name-badge-label">
            Customer Name
          </div>
          {/* ช่องกรอกข้อมูลว่างสีเข้มข้าง ๆ */}
          <input 
            type="text" 
            value={customerName} 
            onChange={(e) => setCustomerName(e.target.value)}
            className="name-input-field-box"
          />
        </div>

        {/* ส่วนบล็อก Trader Name */}
        <div className="name-input-group">
          {/* ป้ายชื่อสีแดงขนาดเล็ก */}
          <div className="name-badge-label">
            Trader Name
          </div>
          {/* ช่องกรอกข้อมูลว่างสีเข้มข้าง ๆ */}
          <input 
            type="text" 
            value={traderName} 
            onChange={(e) => setTraderName(e.target.value)}
            className="name-input-field-box"
          />
        </div>

      </div>

    </div>
  );
};

export default PortfolioForUser;