import React from 'react';

const HeaderMarketStats = () => {
  return (
    <div className="bg-[#070b10] flex items-center gap-4 p-1 border-b border-[#1e2d3d] text-[12px]">
      <div className="flex items-center gap-2 border-r border-[#1e2d3d] pr-4">
        <span className="text-white font-bold">SET</span>
        <span className="text-[#00ff00] text-lg font-bold">1,471.65</span>
        <div className="flex flex-col text-[10px] text-[#00ff00]">
          <span>+23.51</span>
          <span>+1.57%</span>
        </div>
      </div>
      <div className="flex gap-4 text-[10px] text-gray-400">
        <div>High <span className="text-[#00ff00] ml-1">1,477.96</span><br/>Low <span className="text-[#ff4d4d] ml-1">1,464.28</span></div>
        <div>Value <span className="text-white ml-1 font-bold">63,623.39 MB</span></div>
      </div>
      <div className="flex items-center gap-2 border-l border-[#1e2d3d] pl-4">
        <span className="text-white font-bold">SET50</span>
        <span className="text-[#00ff00] text-lg font-bold">980.63</span>
        <div className="flex flex-col text-[10px] text-[#00ff00]">
          <span>+11.48</span>
          <span>+1.18%</span>
        </div>
      </div>
    </div>
  );
};

export default HeaderMarketStats;