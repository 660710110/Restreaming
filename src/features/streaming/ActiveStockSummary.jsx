// ActiveStockSummary.jsx
// คอลัมน์ตรงกลาง: แสดงเฉพาะตารางเสนอซื้อ/เสนอขาย (Bid/Offer) และ Ticker เอาตัวอักษรกำกับ Frame ออกแล้ว
import React, { useState } from 'react';

const ActiveStockSummary = ({ currentSymbol }) => {
  const [centerTab, setCenterTab] = useState('Bid/Offers');

  return (
    <div className="w-full flex flex-col bg-[#080d16] p-2 text-xs font-sans h-full min-h-[460px]">
      {/* แท็บสลับหน้าย่อยของคอลัมน์กลาง */}
      <div className="flex">
        {['Bid/Offers', 'Ticker'].map((tab) => (
          <button
            key={tab}
            onClick={() => setCenterTab(tab)}
            className={`px-4 py-1 text-[11px] font-medium transition-all rounded-t-[4px] border-t border-x ${
              centerTab === tab
                ? 'bg-[#002b5c] text-[#00bfff] border-[#005bb5]'
                : 'bg-[#04080e] text-[#4d648d] border-[#12243d] hover:text-gray-400'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* กรอบเนื้อหาบอร์ดข้อมูลราคาตลาด */}
      <div className="flex-1 flex flex-col gap-2 overflow-hidden mt-0">
        
        {/* กล่องบน: กระดาน Bid / Offer */}
        <div className="flex-1 border border-[#12243d] rounded-[4px] bg-[#050910] p-2 flex flex-col overflow-hidden">
          <div className="flex justify-between text-[10px] text-[#4d648d] border-b border-[#12243d] pb-1 font-bold">
            <span>Price ({currentSymbol})</span>
            <span>Volumn</span>
          </div>
          <div className="flex-1 overflow-y-auto pt-1 space-y-1 scrollbar-none font-mono text-[11px]">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="flex justify-between py-0.5 hover:bg-[#0d223f]/30 px-1 rounded-[2px]">
                <span className="text-[#00bfff]">{(980.60 - i * 0.1).toFixed(2)}</span>
                <span className="text-[#e2e8f0]">{(250 + i * 110).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* กล่องล่าง: ข้อมูล Ticker */}
        <div className="flex-1 border border-[#12243d] rounded-[4px] bg-[#050910] p-2 flex flex-col overflow-hidden">
          <div className="text-[10px] text-[#4d648d] border-b border-[#12243d] pb-1 font-bold">Ticker Logs</div>
          <div className="flex-1 overflow-y-auto pt-1 space-y-1 scrollbar-none font-mono text-[10px]">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex justify-between items-center py-0.5 border-b border-[#12243d]/20">
                <span className="text-gray-500">12:48:46</span>
                <span className="text-[#00bfff] font-bold">{currentSymbol}</span>
                <span className="text-[#00c853]">980.63</span>
                <span className={i % 2 === 0 ? 'text-[#00c853]' : 'text-red-500 font-medium'}>
                  {i % 2 === 0 ? 'Long' : 'Short'}
                </span>
                <span className="text-gray-300">{(i + 1) * 3}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ActiveStockSummary;