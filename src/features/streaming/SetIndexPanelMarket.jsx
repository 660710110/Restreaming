import React, { useState } from 'react';

const SetIndexPanelMarket = () => {
  const [marketStatus] = useState({ isOpen: true, text: 'Market Open' });

  return (
    <div className="flex items-center justify-between border border-[#1479dd] rounded-[8px] bg-[#090e19] px-6 py-3 font-sans w-full select-none mb-4">
      
      {/* Left Section: Indices */}
      <div className="flex items-center gap-10">
        
        {/* SET Index */}
        <div className="flex items-end gap-3">
          <span className="text-[#ffffff] text-[20px] font-normal leading-none tracking-wide">SET</span>
          <span className="text-[#23df68] text-[24px] font-medium leading-none tracking-wide">1,440.01</span>
          <span className="text-[#23df68] text-[13px] font-medium leading-[1.2] mb-[2px]">+29.62 (+2.11%)</span>
        </div>

        {/* SET50 Index */}
        <div className="flex items-end gap-3">
          <span className="text-[#ffffff] text-[20px] font-normal leading-none tracking-wide">SET50</span>
          <span className="text-[#23df68] text-[24px] font-medium leading-none tracking-wide">957.54</span>
          <span className="text-[#23df68] text-[13px] font-medium leading-[1.2] mb-[2px]">+18.14 (+1.93%)</span>
        </div>

      </div>

      {/* Right Section: Market Status */}
      <div className="flex items-center gap-2">
        <div 
          className="w-[8px] h-[8px] rounded-full bg-[#23df68] shadow-[0_0_8px_#23df68]"
        ></div>
        <span className="text-[13px] font-medium text-[#23df68]">
          {marketStatus.text}
        </span>
      </div>

    </div>
  );
};

export default SetIndexPanelMarket;
