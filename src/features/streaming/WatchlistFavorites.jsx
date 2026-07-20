// WatchlistFavorites.jsx
// แถบคาดยาวตรงกลาง: ส่วนของ Dropdown เลือกพอร์ตบัญชี และแสดงยอดเงินคงเหลือ
import React, { useState } from 'react';

const WatchlistFavorites = () => {
  const [selectedAccount, setSelectedAccount] = useState('241040 (Derivatives)');

  return (
    <div className="w-full bg-[#050910] border border-[#12243d] rounded-[4px] p-2 flex flex-wrap items-center justify-between text-xs text-[#94a3b8] gap-2 relative">
      
      {/* ฝั่งซ้าย: Dropdown สำหรับเลือกบัญชี */}
      <div className="flex items-center gap-1.5">
        <div className="relative bg-[#03060b] border border-[#12243d] rounded-[3px] px-2 py-0.5 flex items-center gap-4 cursor-pointer">
          <span className="text-white font-mono text-[11px]">{selectedAccount}</span>
          <span className="text-[#4d648d] text-[9px]">▼</span>
          <select
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer w-full"
          >
            <option value="241040 (Derivatives)">241040 (Derivatives)</option>
            <option value="241040 (Equity)">241040 (Equity Portfolio)</option>
          </select>
        </div>
      </div>

      {/* ฝั่งขวา: รายงานค่าตัวเลขสถานะทางการเงินทั้งหมด */}
      <div className="flex flex-wrap items-center gap-6 font-mono text-[11px]">
        <div>EE <span className="text-yellow-500 font-bold ml-1">0.00</span></div>
        <div>Equity <span className="text-yellow-500 font-bold ml-1">0.00</span></div>
        <div>Line Available <span className="text-yellow-500 font-bold ml-1">0.00</span></div>
        <div>MR <span className="text-yellow-500 font-bold ml-1">0.00</span></div>
      </div>
    </div>
  );
};

export default WatchlistFavorites;