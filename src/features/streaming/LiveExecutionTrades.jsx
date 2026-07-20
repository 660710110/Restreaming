// LiveExecutionTrades.jsx
// ขอบล่างหน้าจอ: แผงส่งคำสั่งด่วนแนวนอนและตารางประวัติคำสั่งซื้อขายแบบเลื่อนดูได้
import React, { useState } from 'react';

const LiveExecutionTrades = ({ activeSymbolFromTop }) => {
  const [activeBottomTab, setActiveBottomTab] = useState('Portfolio');
  
  const [orderSide, setOrderSide] = useState('Long');
  const [positionMode, setPositionMode] = useState('Open');
  const [symbolField, setSymbolField] = useState('');
  const [volDropdown, setVolDropdown] = useState('Volume');
  const [priceDropdown, setPriceDropdown] = useState('Price');
  const [priceTypeSelect, setPriceTypeSelect] = useState('Limit');
  const [stopOrderCheck, setStopOrderCheck] = useState(false);
  const [hideInactiveCheck, setHideInactiveCheck] = useState(false);

  const currentWorkingSymbol = symbolField || activeSymbolFromTop || 'S50M26';

  const simulatedTrades = Array.from({ length: 20 }, (_, index) => ({
    id: 102450 + index,
    date: '2026-07-16',
    time: `15:${10 + (index % 15)}:${20 + (index % 35)}`,
    pos: index % 3 === 0 ? 'Short' : 'Long',
    symbol: currentWorkingSymbol,
    type: index % 2 === 0 ? 'Open' : 'Close',
    price: '980.60',
    qty: '10',
    matched: '10',
    bal: '0',
    status: 'Matched',
    valid: 'Day'
  }));

  return (
    <div className="w-full bg-[#080d16] border border-[#12243d] rounded-[4px] text-xs font-sans text-white p-2 flex flex-col overflow-hidden">
      
      {/* หัวแท็บตารางด้านล่างสุด */}
      <div className="flex items-center justify-between border-b border-[#12243d] mb-2">
        <div className="flex">
          {['Portfolio', 'Order Status', 'Conditional'].map((tabName) => (
            <button
              key={tabName}
              onClick={() => setActiveBottomTab(tabName)}
              className={`px-4 py-1 font-medium tracking-wide transition-colors ${
                activeBottomTab === tabName 
                  ? 'bg-[#0d223f] text-[#00bfff] rounded-t-[2px] border-t border-x border-[#12243d]' 
                  : 'text-[#4d648d] hover:text-white'
              }`}
            >
              {tabName}
            </button>
          ))}
        </div>
        <button onClick={() => alert('Order Book Updated!')} className="text-[10px] text-[#4d648d] hover:text-white px-2 py-0.5 bg-[#050e18] border border-[#12243d] rounded-[3px] mb-1">⟳ Refresh</button>
      </div>

      {/* แถบการคีย์ข้อมูลส่งคำสั่งซื้อขายด่วนแบบสตรีมมิ่งแนวนอน */}
      <div className="flex flex-wrap items-center gap-2 bg-[#04080e] p-2 rounded-[4px] border border-[#12243d]/60 mb-2 text-[11px]">
        <div className="flex gap-2 items-center text-[#94a3b8] font-bold">
          <label className="flex items-center gap-1 cursor-pointer">
            <input type="radio" name="bottomSide" checked={orderSide === 'Long'} onChange={() => setOrderSide('Long')} className="accent-[#00c853]" />
            <span className="text-[#00c853]">Long</span>
          </label>
          <label className="flex items-center gap-1 cursor-pointer">
            <input type="radio" name="bottomSide" checked={orderSide === 'Short'} onChange={() => setOrderSide('Short')} className="accent-red-500" />
            <span className="text-red-500">Short</span>
          </label>
        </div>

        <select value={positionMode} onChange={(e) => setPositionMode(e.target.value)} className="bg-[#03060b] border border-[#12243d] text-white px-1 py-0.5 rounded-[2px] focus:outline-none">
          <option value="Open">Open</option>
          <option value="Close">Close</option>
        </select>

        <div className="relative flex items-center bg-[#03060b] border border-[#12243d] rounded-[2px] px-1.5 py-0.5 max-w-[85px]">
          <input type="text" placeholder="Symbol" value={symbolField} onChange={(e) => setSymbolField(e.target.value)} className="w-full bg-transparent border-none text-white focus:outline-none font-mono text-[11px]" />
          <span className="text-gray-600 text-[8px]">🔍</span>
        </div>

        <select value={volDropdown} onChange={(e) => setVolDropdown(e.target.value)} className="bg-[#03060b] border border-[#12243d] text-white px-1 py-0.5 rounded-[2px] focus:outline-none font-mono">
          <option value="Volume">Volume</option>
          <option value="5">5</option>
          <option value="20">20</option>
        </select>

        <select value={priceDropdown} onChange={(e) => setPriceDropdown(e.target.value)} className="bg-[#03060b] border border-[#12243d] text-white px-1 py-0.5 rounded-[2px] focus:outline-none font-mono">
          <option value="Price">Price</option>
          <option value="980.60">980.60</option>
        </select>

        <select value={priceTypeSelect} onChange={(e) => setPriceTypeSelect(e.target.value)} className="bg-[#03060b] border border-[#12243d] text-white px-1 py-0.5 rounded-[2px] focus:outline-none">
          <option value="Limit">Limit</option>
          <option value="Market">Market</option>
        </select>

        <label className="flex items-center gap-1 cursor-pointer text-[#94a3b8] select-none">
          <input type="checkbox" checked={stopOrderCheck} onChange={(e) => setStopOrderCheck(e.target.checked)} className="accent-[#005bb5]" />
          <span>Stop Order</span>
        </label>

        <button onClick={() => alert('Condition Config opened')} className="bg-[#050e18] border border-[#12243d] text-[#00bfff] px-2 py-0.5 rounded-[2px] hover:bg-[#0c223f]">Cond.</button>

        <div className="ml-auto flex items-center gap-1.5">
          <span className="bg-[#03060b] border border-[#12243d] p-0.5 px-2 rounded-[2px] text-gray-400 text-[10px] cursor-pointer">Pin 🔒</span>
          <button onClick={() => alert(`Submitted successfully`)} className="bg-[#005bb5] hover:bg-[#004ba3] text-white font-bold px-3 py-0.5 rounded-[2px] shadow-md transition-colors">Submit</button>
          <button onClick={() => setSymbolField('')} className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-2 py-0.5 rounded-[2px]">Clear</button>
        </div>
      </div>

      {/* ตารางจัดเก็บข้อมูลประวัติหลัก */}
      <div className="flex-1 border border-[#12243d] bg-[#03060b] rounded-[4px] flex flex-col overflow-hidden max-h-[190px]">
        <div className="overflow-auto scrollbar-thin flex-1">
          <table className="w-full text-left border-collapse font-mono text-[10px]">
            <thead>
              <tr className="bg-[#091424] text-[#4d648d] border-b border-[#12243d] whitespace-nowrap sticky top-0 z-10">
                <th className="p-1 px-2">Order No.</th>
                <th className="p-1">Date ▾</th>
                <th className="p-1">Time ▾</th>
                <th className="p-1">Pos ▾</th>
                <th className="p-1">Symbol ▾</th>
                <th className="p-1">Side ▾</th>
                <th className="p-1 text-right">Price ▾</th>
                <th className="p-1 text-right">Volume ▾</th>
                <th className="p-1 text-right">Matched ▾</th>
                <th className="p-1 text-right">Balance ▾</th>
                <th className="p-1 text-center">Status</th>
                <th className="p-1 text-center">Valid</th>
                <th className="p-1 text-center">Clear</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#12243d]/30 text-white whitespace-nowrap">
              {simulatedTrades.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#0c1725] transition-colors">
                  <td className="p-1 px-2 text-[#4d648d]">{row.id}</td>
                  <td className="p-1 text-gray-400">{row.date}</td>
                  <td className="p-1 text-gray-400">{row.time}</td>
                  <td className={`p-1 font-bold ${row.pos === 'Long' ? 'text-[#00c853]' : 'text-red-500'}`}>{row.pos}</td>
                  <td className="p-1 text-[#00bfff] font-bold">{row.symbol}</td>
                  <td className="p-1 text-gray-300">{row.type}</td>
                  <td className="p-1 text-right text-yellow-500">{row.price}</td>
                  <td className="p-1 text-right">{row.qty}</td>
                  <td className="p-1 text-right text-[#00c853]">{row.matched}</td>
                  <td className="p-1 text-right">{row.bal}</td>
                  <td className="p-1 text-center text-[9px] text-gray-400"><span className="bg-[#091e36] px-1 py-0.5 rounded-[2px]">{row.status}</span></td>
                  <td className="p-1 text-center text-gray-500">{row.valid}</td>
                  <td className="p-1 text-center text-red-400 cursor-pointer font-sans hover:text-red-300">✕</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="bg-[#050910] border-t border-[#12243d] p-1 px-3 flex items-center justify-end text-[10px] text-[#4d648d]">
          <label className="flex items-center gap-1.5 cursor-pointer hover:text-white select-none">
            <input type="checkbox" checked={hideInactiveCheck} onChange={(e) => setHideInactiveCheck(e.target.checked)} className="accent-[#005bb5]" />
            <span>Hide Inactive Orders</span>
          </label>
        </div>
      </div>

    </div>
  );
};

export default LiveExecutionTrades;