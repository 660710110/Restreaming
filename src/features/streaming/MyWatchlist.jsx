import React, { useState } from 'react';
import { Star, Edit2, Scan, Eye } from 'lucide-react';

const mockWatchlist = [
  { symbol: 'SCB', price: '108.00', change: '+1.50', pChg: '+1.41%', vol: '7.1M', dir: 'up', isSelected: true },
  { symbol: 'DELTA', price: '102.50', change: '+3.00', pChg: '+3.02%', vol: '25.6M', dir: 'up' },
  { symbol: 'KBANK', price: '136.50', change: '-1.50', pChg: '-1.09%', vol: '15.2M', dir: 'down' },
  { symbol: 'PTT', price: '34.75', change: '+0.75', pChg: '+2.21%', vol: '14.8M', dir: 'up' },
  { symbol: 'KTB', price: '20.30', change: '+0.10', pChg: '+0.50%', vol: '75M', dir: 'up' },
  { symbol: 'MINT', price: '30.25', change: '+0.50', pChg: '+1.68%', vol: '35M', dir: 'up' },
  { symbol: 'BTS', price: '6.80', change: '-0.10', pChg: '-1.45%', vol: '90M', dir: 'down' },
  { symbol: 'HMPRO', price: '13.20', change: '+0.20', pChg: '+1.45%', vol: '45M', dir: 'up' },
];

const MyWatchlist = ({ onSelectStock, onToggleWatchlist }) => {
  const tabs = ['All', 'Tech', 'Bank', 'Other'];
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div className="flex flex-col flex-1 h-full bg-[#090e19] border border-[#193254] rounded-[8px] font-sans overflow-hidden select-none pb-2 relative">
      
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <div className="flex items-center gap-3">
           <h2 className="text-[#ffffff] font-medium text-[16px] tracking-wide">My Watchlist</h2>
           <button className="transition flex items-center gap-1 text-[12px] font-medium text-[#a9b2bf] hover:text-[#ffffff]">
             <Edit2 size={12} className="mb-[1px]" /> Edit
           </button>
        </div>
        <button 
          onClick={onToggleWatchlist}
          className="text-[#a9b2bf] hover:text-[#ffffff] transition-colors relative flex items-center justify-center w-6 h-6"
        >
          <Scan size={18} />
          <Eye size={10} strokeWidth={2.5} className="absolute" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex px-4 pt-1 gap-[10px] pb-3">
        {tabs.map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-[18px] py-[6px] rounded-full text-[13px] transition-colors border ${
              activeTab === tab 
              ? 'bg-[#1479dd] text-white border-[#1479dd] font-medium' 
              : 'bg-transparent text-[#a9b2bf] border-[#193254] hover:border-[#1479dd] hover:text-[#ffffff]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[3fr_2fr_2fr_2.5fr_2fr] px-4 py-3 text-[12px] text-[#a9b2bf] font-medium border-b border-[#193254]">
        <div>Symbol</div>
        <div className="text-right">Price</div>
        <div className="text-right pl-2">Change</div>
        <div className="text-right">%Chg</div>
        <div className="text-right">Volume</div>
      </div>

      {/* Table Body */}
      <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden w-full">
        {mockWatchlist.map((stock, i) => {
          const isSelected = stock.isSelected;
          const bgClass = isSelected ? 'bg-[#1479dd]/10' : 'hover:bg-[#193254]/50';
          const starColor = isSelected ? 'fill-[#1479dd] text-[#1479dd]' : 'fill-[#fbbb1f] text-[#fbbb1f]';
          const symbolColor = 'text-[#ffffff]';
          const priceColor = isSelected ? 'text-[#1479dd]' : 'text-[#ffffff]';
          const changeColor = stock.dir === 'up' ? 'text-[#23df68]' : 'text-[#f6465d]';
          const volColor = 'text-[#ffffff]';

          return (
            <div 
              key={stock.symbol}
              onClick={() => onSelectStock && onSelectStock(stock)}
              className={`grid grid-cols-[3fr_2fr_2fr_2.5fr_2fr] px-4 py-[10px] text-[13px] items-center transition-colors cursor-pointer ${bgClass}`}
            >
              <div className="flex items-center gap-[8px]">
                <div>
                  <Star size={14} className={starColor} />
                </div>
                <span className={`font-sans font-medium ${symbolColor}`}>{stock.symbol}</span>
              </div>
              <div className={`text-right font-medium ${priceColor}`}>{stock.price}</div>
              <div className={`text-right font-medium pl-2 ${changeColor}`}>
                {stock.change}
              </div>
              <div className={`text-right font-medium ${changeColor}`}>
                {stock.pChg}
              </div>
              <div className={`text-right font-medium ${volColor}`}>{stock.vol}</div>
            </div>
          )
        })}
        
        {/* Add Button */}
        <div className="px-4 mt-auto mb-2 pt-3">
          <button 
            className="w-full py-[8px] border border-[#193254] rounded-[4px] text-[#ffffff] text-[13px] hover:bg-[#193254] transition-colors font-medium text-center"
          >
            + Add
          </button>
        </div>
      </div>

    </div>
  );
};

export default MyWatchlist;
