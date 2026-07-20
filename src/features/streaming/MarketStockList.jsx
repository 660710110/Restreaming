// MarketStockList.jsx
// คอลัมน์ซ้ายมือสุด: เอาคำว่า Frame ออกแล้ว เหลือขอบเขตการทำงานของแท็บสลับข้อมูลที่สะอาดตา
import React, { useState } from 'react';

const MarketStockList = ({ currentSymbol, onSelectSymbol }) => {
  const [marketTab, setMarketTab] = useState('Futures');
  const [searchTerm, setSearchTerm] = useState('');
  const [agreementAccepted, setAgreementAccepted] = useState(false);

  const rawList = Array.from({ length: 30 }, (_, index) => ({
    ticker: `S50${String.fromCharCode(72 + (index % 4))}26`,
    price: (980.50 - index * 0.20).toFixed(2),
    percent: (index % 3 === 0 ? '+' : '-') + (Math.random() * 2).toFixed(2) + '%'
  }));

  const filteredList = rawList.filter(item => 
    item.ticker.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col bg-[#080d16] p-2 text-xs font-sans h-full min-h-[460px]">
      {/* แท็บหมวดหมู่ย่อย 4 ปุ่ม */}
      <div className="flex gap-1 mb-2">
        {['Futures', 'Options', 'Portfolio', 'Simulation'].map((name) => (
          <button
            key={name}
            onClick={() => setMarketTab(name)}
            className={`px-3 py-1 border text-[10px] tracking-tight transition-all rounded-[2px] ${
              marketTab === name
                ? 'bg-[#0d223f] border-[#005bb5] text-[#00bfff] font-bold'
                : 'bg-[#04080e] border-[#16273c] text-[#4d648d] hover:text-white'
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* ช่อง Input ค้นหา Symbol สัญญา */}
      <div className="relative mb-2">
        <input
          type="text"
          placeholder="Symbol"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#03060b] border border-[#005bb5] rounded-[4px] py-1 pl-2 pr-8 text-white text-[11px] placeholder-[#1f334d] focus:outline-none focus:border-[#00bfff]"
        />
        <span className="absolute right-2.5 top-1.5 text-[#00bfff] cursor-pointer text-[11px]">🔍</span>
      </div>

      {/* กรอบกล่อง Content หลัก */}
      <div className="flex-1 border border-[#12243d] rounded-[4px] bg-[#050910] p-4 flex flex-col justify-between overflow-hidden relative">
        {!agreementAccepted ? (
          <div className="flex flex-col flex-1 justify-between items-center py-4">
            <span className="text-sm font-semibold text-white tracking-wider">Agreement</span>
            
            <div className="w-full max-w-[280px] bg-[#040e19] border border-[#0b1f36] rounded-[4px] py-12 px-4 text-center relative shadow-md">
              <p className="text-[11px] leading-relaxed text-[#94a3b8]">
                To View your favourite items here.<br />
                please add items on the Maket page.
              </p>
              <div className="absolute right-1 top-3 bottom-3 w-[4px] bg-[#005bb5]/60 rounded-full"></div>
            </div>

            <button
              onClick={() => setAgreementAccepted(true)}
              className="bg-[#0b223f] hover:bg-[#103059] border border-[#005bb5] text-[#00bfff] text-[11px] px-8 py-1.5 rounded-[4px] transition-all"
            >
              Accept
            </button>
          </div>
        ) : (
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="flex justify-between border-b border-[#12243d] pb-1 text-[#4d648d] font-bold text-[10px]">
              <span>SYMBOL</span>
              <div className="flex gap-8"><span>LAST</span><span>%CHG</span></div>
            </div>
            
            <div className="flex-1 overflow-y-auto pt-1 space-y-1 scrollbar-thin pr-1">
              {filteredList.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => onSelectSymbol(item.ticker)}
                  className={`flex justify-between items-center py-1.5 px-1 rounded-sm border-b border-[#12243d]/30 cursor-pointer transition-colors ${
                    currentSymbol === item.ticker ? 'bg-[#0d223f]/60' : 'hover:bg-[#0c1624]'
                  }`}
                >
                  <span className="font-bold font-mono text-[#00bfff]">{item.ticker}</span>
                  <div className="flex gap-6 font-mono text-right">
                    <span className="text-white font-medium">{item.price}</span>
                    <span className={item.percent.startsWith('+') ? 'text-[#00c853]' : 'text-red-500'}>
                      {item.percent}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => setAgreementAccepted(false)} className="text-[9px] text-[#4d648d] pt-2 text-left hover:text-[#00bfff]">
              ← Back to Agreement Box
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketStockList;