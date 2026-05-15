import React, { useState } from 'react';
import { Info, Filter, Layout } from 'lucide-react';

const mockTrades = [
  { time: '14:55:36', side: 'S', vol: '200', price: '294.00' },
  { time: '14:55:31', side: 'S', vol: '300', price: '294.00' },
  { time: '14:55:27', side: 'B', vol: '100', price: '294.50' },
  { time: '14:55:24', side: 'S', vol: '1,300', price: '294.00' },
  { time: '14:55:23', side: 'B', vol: '500', price: '294.00' },
  { time: '14:55:19', side: 'B', vol: '700', price: '293.50' },
  { time: '14:55:18', side: 'B', vol: '1,000', price: '293.50' },
  { time: '14:55:15', side: 'B', vol: '400', price: '293.50' },
  { time: '14:55:08', side: 'B', vol: '300', price: '293.00' },
  { time: '14:55:05', side: 'S', vol: '1,200', price: '292.50' },
];

const LiveTrades = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [buyPercent, setBuyPercent] = useState(61);
  const sellPercent = Math.max(0, 100 - buyPercent);

  const handleSliderChange = (e) => {
    setBuyPercent(Number(e.target.value));
  };

  const filteredTrades = mockTrades.filter(t => {
    if (activeTab === 'Buy') return t.side === 'B';
    if (activeTab === 'Sell') return t.side === 'S';
    return true;
  });

  return (
    <div className="flex flex-col bg-[#101c2c] border border-[#193254] rounded-[8px] font-sans overflow-hidden h-full select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2">
        <div className="flex items-center gap-2">
           <h2 className="text-[#ffffff] font-medium text-[14px]">Live Trades</h2>
           <div className="bg-[#1479dd] rounded-full w-[14px] h-[14px] flex items-center justify-center text-white cursor-pointer hover:bg-[#4b7cff]">
             <Info size={10} className="stroke-[3]" />
           </div>
        </div>
        <button className="text-[#1479dd] text-[12px] hover:text-[#4b7cff] font-medium transition-colors">View All &gt;</button>
      </div>

      {/* Buy / Sell Progress Bar & Slider */}
      <div className="px-5 py-2 relative group">
        <div className="flex justify-between text-[11px] font-medium mb-1.5">
          <span className="text-[#23df68]">Buy {buyPercent}%</span>
          <span className="text-[#ff0000]">Sell {sellPercent}%</span>
        </div>
        <div className="w-full h-[4px] bg-[#193254] flex rounded-[2px] overflow-hidden relative">
          <div className="h-full bg-[#23df68]" style={{ width: `${buyPercent}%` }}></div>
          <div className="h-full bg-[#ff0000]" style={{ width: `${sellPercent}%`, marginLeft: 'auto' }}></div>
        </div>
        {/* Hidden intrinsic slider overlaid */}
        <input 
          type="range" 
          min="0" max="100" 
          value={buyPercent} 
          onChange={handleSliderChange}
          className="absolute top-6 left-5 w-[calc(100%-40px)] opacity-0 cursor-ew-resize z-10"
        />
        
        <div className="flex justify-between text-[11px] text-[#757575] mt-2 pb-3 border-b border-[#193254]">
          <span>Avg. Price <span className="text-[#ffffff] font-medium ml-1">293.80</span></span>
          <span>Total Vol. <span className="text-[#ffffff] font-medium ml-1">23.83 M</span></span>
        </div>
      </div>

      {/* Toggles & Filter */}
      <div className="flex items-center justify-between px-5 py-3">
        <div className="flex gap-[6px]">
          <button 
             onClick={() => setActiveTab('All')}
             className={`px-[12px] py-[3px] text-[12px] rounded-[4px] font-medium border transition-colors ${activeTab === 'All' ? 'bg-[#1479dd] text-white border-[#1479dd]' : 'bg-transparent text-[#757575] border-[#193254] hover:border-[#757575] hover:text-[#ffffff]'}`}
          >All</button>
          <button 
             onClick={() => setActiveTab('Buy')}
             className={`px-[12px] py-[3px] text-[12px] rounded-[4px] border transition-colors font-medium ${activeTab === 'Buy' ? 'bg-[#23df68] text-white border-[#23df68]' : 'bg-transparent text-[#757575] hover:text-[#ffffff] border-[#193254] hover:border-[#757575]'}`}
          >Buy</button>
          <button 
             onClick={() => setActiveTab('Sell')}
             className={`px-[12px] py-[3px] text-[12px] rounded-[4px] border transition-colors font-medium ${activeTab === 'Sell' ? 'bg-[#ff0000] text-white border-[#ff0000]' : 'bg-transparent text-[#757575] hover:text-[#ffffff] border-[#193254] hover:border-[#757575]'}`}
          >Sell</button>
        </div>
        <div className="flex items-center gap-[10px] text-[#757575]">
           <Filter size={14} className="hover:text-[#ffffff] cursor-pointer transition-colors" />
           <div className="w-[1px] h-[14px] bg-[#193254]"></div>
           <Layout size={14} className="hover:text-[#ffffff] cursor-pointer transition-colors" />
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[1.5fr_1fr_2fr_2fr] px-5 py-2 text-[11px] text-[#757575] font-medium border-b border-t border-[#193254]">
        <div>Time</div>
        <div className="text-center">Side</div>
        <div className="text-right">Volume</div>
        <div className="text-right">Price</div>
      </div>

      {/* Table Body */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {filteredTrades.map((trade, i) => (
          <div 
            key={i}
            className="grid grid-cols-[1.5fr_1fr_2fr_2fr] px-5 py-[7px] text-[12px] hover:bg-[#193254] transition-colors cursor-pointer"
          >
            <div className={`font-sans font-medium tracking-tight ${trade.side === 'B' ? 'text-[#23df68]' : 'text-[#ff0000]'}`}>{trade.time}</div>
            <div className={`text-center font-sans font-medium ${trade.side === 'B' ? 'text-[#23df68]' : 'text-[#ff0000]'}`}>{trade.side}</div>
            <div className={`text-right font-sans font-medium ${trade.side === 'B' ? 'text-[#23df68]' : 'text-[#ff0000]'}`}>{trade.vol}</div>
            <div className={`text-right font-sans font-medium ${trade.side === 'B' ? 'text-[#23df68]' : 'text-[#ff0000]'}`}>{trade.price}</div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default LiveTrades;
