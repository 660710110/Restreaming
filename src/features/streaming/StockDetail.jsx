import React, { useState } from 'react';
import { Star, Settings, Maximize2 } from 'lucide-react';

const StockDetail = ({ stock, selectedTimeRange, setSelectedTimeRange }) => {
  const [isCompareActive, setIsCompareActive] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showIndicators, setShowIndicators] = useState(false);

  // Fallback defaults if stock is null
  const s = stock || {
    symbol: 'DELTA',
    desc: 'DELTA ELECTRONICS (THAILAND) PCL. - SET',
    sector: 'Technology | Electronic Components',
    price: '102.50',
    change: '+3.00',
    pChg: '+3.02%',
    h: '103.00',
    l: '99.00',
    vol: '25.6M',
    val: '2.61B',
    avgVol: '15.2M',
    pe: '58.45',
    mktCap: '1.28T',
    yield: '0.78%',
    open: '99.50',
    dir: 'up'
  };

  return (
    <div className="flex flex-col bg-[#101c2c] pt-5 px-6 pb-4 select-none border-b border-[#193254] relative">
      
      {/* Top Header Row */}
      <div className="flex justify-between items-start">
        {/* Title */}
        <div className="flex items-center gap-[10px]">
          <h1 className="text-[28px] font-bold text-[#ffffff] tracking-tight leading-none">{s.symbol}</h1>
          <Star size={20} className="text-[#f5b041] fill-[#f5b041]" />
        </div>

        {/* Top Right Action Buttons */}
        <div className="flex items-center gap-[14px] text-[13px] font-medium relative">
          <button 
            onClick={() => setShowIndicators(!showIndicators)}
            className={`transition-colors ${showIndicators ? 'text-[#ffffff]' : 'text-[#a9b2bf] hover:text-[#ffffff]'}`}
          >
            Indicators
          </button>
          
          <button 
            onClick={() => setIsCompareActive(!isCompareActive)}
            className={`transition-colors ${isCompareActive ? 'text-[#1479dd]' : 'text-[#a9b2bf] hover:text-[#ffffff]'}`}
          >
            Compare
          </button>
          
          <button 
            onClick={() => setIsSaved(!isSaved)}
            className={`transition-colors flex items-center gap-1 ${isSaved ? 'text-[#23df68]' : 'text-[#a9b2bf] hover:text-[#ffffff]'}`}
          >
            Save {isSaved && '✓'}
          </button>
          
          <div className="flex gap-[8px] ml-1 text-[#a9b2bf]">
            <button className="hover:text-[#ffffff] transition p-1"><Settings size={16} /></button>
            <button className="hover:text-[#ffffff] transition p-1"><Maximize2 size={16} /></button>
          </div>

          {/* Indicators Modal Placeholder */}
          {showIndicators && (
            <div className="absolute top-[30px] right-[100px] w-48 bg-[#0e2c49] border border-[#193254] rounded shadow-lg p-3 z-50">
               <p className="text-[#ffffff] text-[12px] text-center">Add Indicators...</p>
            </div>
          )}
        </div>
      </div>

      {/* Info Row: Left (Desc & Price) / Right (Stats Grid) */}
      <div className="flex flex-col mt-3 sm:flex-row sm:justify-between items-start">
        
        {/* Left Side: Description and Price */}
        <div className="flex flex-col">
          <p className="text-[12px] text-[#ffffff] font-medium">{s.desc}</p>
          <p className="text-[11px] text-[#a9b2bf] mt-1 pr-4">{s.sector}</p>
          
          <div className="flex items-baseline gap-2 mt-[14px]">
            <span className={`text-[42px] leading-none font-bold tracking-tight ${s.dir === 'up' ? 'text-[#23df68]' : 'text-[#ff0000]'}`}>
              {s.price}
            </span>
            <span className="text-[16px] font-bold text-[#ffffff]">THB</span>
            <span className={`font-medium ml-2 text-[14px] ${s.dir === 'up' ? 'text-[#23df68]' : 'text-[#ff0000]'}`}>
              {s.change} ({s.pChg})
            </span>
          </div>
        </div>

        {/* Right Side: Stats Matrix */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-[6px] mt-4 sm:mt-0 text-[12px] min-w-[300px]">
          <div className="flex justify-between w-full">
            <span className="text-[#a9b2bf]">High</span>
            <span className="text-[#23df68] font-medium">{s.h}</span>
          </div>
          <div className="flex justify-between w-full">
            <span className="text-[#a9b2bf]">Volume</span>
            <span className="text-[#ffffff] font-medium">{s.vol}</span>
          </div>
          <div className="flex justify-between w-full">
            <span className="text-[#a9b2bf]">Low</span>
            <span className="text-[#ffffff] font-medium">{s.l}</span>
          </div>
          <div className="flex justify-between w-full">
             <span className="text-[#a9b2bf]">Value</span>
             <span className="text-[#ffffff] font-medium">{s.val}</span>
          </div>
          <div className="flex justify-between w-full">
             <span className="text-[#a9b2bf]">Avg. Vol</span>
             <span className="text-[#ffffff] font-medium">{s.avgVol}</span>
          </div>
          <div className="flex justify-between w-full">
             <span className="text-[#a9b2bf]">P/E</span>
             <span className="text-[#ffffff] font-medium">{s.pe}</span>
          </div>
          <div className="flex justify-between w-full">
             <span className="text-[#a9b2bf]">Market Cap</span>
             <span className="text-[#ffffff] font-medium">{s.mktCap}</span>
          </div>
          <div className="flex justify-between w-full">
             <span className="text-[#a9b2bf]">Div Yield</span>
             <span className="text-[#ffffff] font-medium">{s.yield}</span>
          </div>
          <div className="flex justify-between w-full">
             <span className="text-[#a9b2bf]">Open</span>
             <span className="text-[#ffffff] font-medium">{s.open}</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default StockDetail;
