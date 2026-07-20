// TechnicalCandleChart.jsx
// คอลัมน์ขวาสุด: แผงควบคุม Order Entry ฝั่ง Long/Short แบบคลีน ๆ ไม่มีตัวอักษรส่วนเกิน
import React, { useState } from 'react';

const TechnicalCandleChart = ({ currentSymbol }) => {
  const [tradeSide, setTradeSide] = useState('Long');
  const [priceType, setPriceType] = useState('Limit');
  const [inputPrice, setInputPrice] = useState('980.60');
  const [inputVolume, setInputVolume] = useState('');
  const [timeValidity, setTimeValidity] = useState('Day');
  const [isTriggeredTpSl, setIsTriggeredTpSl] = useState(false);

  const marginEstimate = inputVolume ? (Number(inputVolume) * 9840).toLocaleString() : '0.00';
  const commissionEstimate = inputVolume ? (Number(inputVolume) * 48.50).toLocaleString() : '0.00';

  return (
    <div className="w-full bg-[#080d16] border border-[#12243d] rounded-[4px] p-2 text-xs font-sans text-white h-full flex flex-col justify-between min-h-[460px]">
      
      <div>
        {/* แถบรายงานเวลาหัวฟอร์ม */}
        <div className="flex items-center justify-between text-[9px] text-[#243b5a] mb-1.5">
          <span className="text-[#4d648d]">Last Update : <span className="text-white">12:48:46</span></span>
          <button onClick={() => alert('Order Panel Refreshed!')} className="bg-[#050e18] border border-[#12243d] text-white px-2 py-0.5 rounded-[2px] hover:bg-[#0c223f]">⟳ Refresh</button>
        </div>

        {/* แท็บปุ่มยักษ์ Long / Short */}
        <div className="flex border-b border-[#12243d] bg-[#03060b] rounded-t-[4px] overflow-hidden mb-3">
          <button
            onClick={() => setTradeSide('Long')}
            className={`flex-1 text-center py-2 font-bold text-sm transition-all ${
              tradeSide === 'Long' ? 'bg-[#005bb5] text-white' : 'text-[#4d648d] bg-transparent hover:bg-[#07101c]'
            }`}
          >
            Long
          </button>
          <button
            onClick={() => setTradeSide('Short')}
            className={`flex-1 text-center py-2 font-bold text-sm transition-all ${
              tradeSide === 'Short' ? 'bg-red-950 text-white font-bold' : 'text-[#4d648d] bg-transparent hover:bg-[#07101c]'
            }`}
          >
            Short
          </button>
        </div>

        {/* กลุ่มปุ่มเลือกโหมดเงื่อนไขราคาตราสาร */}
        <div className="flex gap-1 mb-3">
          {['Limit', 'Market', 'Condition'].map((mode) => (
            <button
              key={mode}
              onClick={() => setPriceType(mode)}
              className={`px-3 py-0.5 border text-[10px] rounded-[2px] transition-colors ${
                priceType === mode
                  ? 'bg-[#0d223f] border-[#005bb5] text-[#00bfff] font-bold'
                  : 'bg-transparent border-[#16273c] text-[#4d648d] hover:text-white'
              }`}
            >
              {mode}
            </button>
          ))}
          <span className="text-gray-600 ml-auto cursor-pointer">•••</span>
        </div>

        {/* ฟิลด์การกรอกข้อมูล Price / Volume */}
        <div className="space-y-2.5">
          <div className="flex items-center bg-[#03060b] border border-[#12243d] rounded-[4px] px-2 py-1.5">
            <input
              type="number"
              placeholder="Price"
              value={inputPrice}
              onChange={(e) => setInputPrice(e.target.value)}
              className="w-full bg-transparent border-none text-white font-mono focus:outline-none text-[12px] placeholder-[#1f334d]"
            />
            <div className="flex flex-col text-[7px] text-[#00bfff] font-bold cursor-pointer select-none">
              <span onClick={() => setInputPrice((p) => (Number(p) + 0.1).toFixed(2))}>▲</span>
              <span onClick={() => setInputPrice((p) => (Number(p) - 0.1).toFixed(2))}>▼</span>
            </div>
          </div>

          <div className="flex items-center bg-[#03060b] border border-[#12243d] rounded-[4px] px-2 py-1.5">
            <input
              type="number"
              placeholder="Volumn"
              value={inputVolume}
              onChange={(e) => setInputVolume(e.target.value)}
              className="w-full bg-transparent border-none text-white font-mono focus:outline-none text-[12px] placeholder-[#1f334d]"
            />
            <div className="flex flex-col text-[7px] text-[#00bfff] font-bold cursor-pointer select-none">
              <span onClick={() => setInputVolume((v) => String(Number(v || 0) + 1))}>▲</span>
              <span onClick={() => setInputVolume((v) => String(Math.max(0, Number(v || 0) - 1)))}>▼</span>
            </div>
          </div>

          {/* Validity Dropdown */}
          <div className="flex items-center bg-[#03060b] border border-[#12243d] rounded-[4px] px-2 py-1.5 justify-between relative">
            <span className="text-white font-mono text-[11px]">{timeValidity}</span>
            <select
              value={timeValidity}
              onChange={(e) => setTimeValidity(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer"
            >
              <option value="Day">Day</option>
              <option value="IOC">IOC</option>
              <option value="FOK">FOK</option>
            </select>
            <span className="text-[#4d648d] text-[9px]">▼</span>
          </div>

          <label className="flex items-center gap-2 cursor-pointer mt-1 text-[#94a3b8] text-[11px] select-none">
            <input
              type="checkbox"
              checked={isTriggeredTpSl}
              onChange={(e) => setIsTriggeredTpSl(e.target.checked)}
              className="accent-[#005bb5] bg-transparent rounded-sm"
            />
            <span>Take Profit / Stop Loss</span>
          </label>
        </div>
      </div>

      {/* กรอบตารางสรุปการคำนวณเงินมาร์จิ้น */}
      <div className="border border-[#12243d] bg-[#03060b] rounded-[4px] p-2 mt-4 space-y-2 text-[11px] text-[#94a3b8]">
        <div className="text-center text-white border-b border-[#12243d] pb-1 font-bold text-[10px]">
          Order Side: <span className={tradeSide === 'Long' ? 'text-[#00bfff]' : 'text-red-400'}>{tradeSide}</span> - {currentSymbol}
        </div>
        <div className="flex justify-between"><span>Margin Required :</span><span className="text-white font-mono">{marginEstimate}</span></div>
        <div className="flex justify-between"><span>1st Step Comm & VAT :</span><span className="text-white font-mono">{commissionEstimate}</span></div>
        <div className="flex justify-between border-t border-[#12243d]/60 pt-1 font-semibold">
          <span>Total Cost :</span><span className="text-[#00bfff] font-mono">{marginEstimate}</span>
        </div>
        <div className="flex justify-between"><span>Current EE :</span><span className="text-yellow-500 font-mono">0.00</span></div>
      </div>

      <button 
        onClick={() => alert(`Place Order ${tradeSide} ${inputVolume} Vol Success!`)}
        className={`w-full mt-2 py-2 rounded-[4px] font-bold text-white tracking-wide transition-colors ${
          tradeSide === 'Long' ? 'bg-[#005bb5] hover:bg-[#004794]' : 'bg-[#b91c1c] hover:bg-[#991b1b]'
        }`}
      >
        Submit Order ({tradeSide})
      </button>

    </div>
  );
};

export default TechnicalCandleChart;