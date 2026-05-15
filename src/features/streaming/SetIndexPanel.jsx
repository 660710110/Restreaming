import React from 'react';

const SetIndexPanel = () => {
  return (
    <div className="flex items-stretch justify-between border border-[#1479dd] rounded-[8px] px-6 py-2 font-sans select-none overflow-hidden w-full mb-2">
      
      {/* 1st Group: SET */}
      <div className="flex items-center gap-4">
        <span className="text-[#ffffff] text-[20px] font-normal leading-none tracking-wide">SET</span>
        <span className="text-[#f6465d] text-[22px] font-medium leading-none tracking-wide">1,479.57</span>
        <div className="flex flex-col items-end text-[#f6465d] text-[12px] leading-[1.1] font-medium">
          <span>-10.16</span>
          <span>+0.69%</span>
        </div>
      </div>

      <div className="w-[1px] bg-[#193254] mx-2"></div>

      {/* SET High/Low */}
      <div className="flex flex-col justify-center gap-[2px] text-[12px] font-medium">
        <div className="flex justify-between gap-4">
          <span className="text-[#a9b2bf]">High</span>
          <span className="text-[#f6465d]">1,489.14</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-[#a9b2bf]">Low</span>
          <span className="text-[#f6465d]">1,472.58</span>
        </div>
      </div>

      <div className="w-[1px] bg-[#193254] mx-2"></div>

      {/* SET Value / Status */}
      <div className="flex flex-col justify-center gap-[2px] text-[12px] font-medium">
        <div className="flex items-center gap-2">
          <span className="text-[#a9b2bf]">Value</span>
          <span className="text-[#1479dd]">21,734.95 MB</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-[#23df68]"><span className="text-[10px]">▲</span> 134</div>
          <div className="flex items-center gap-1 text-[#f6465d]"><span className="text-[10px]">▼</span> 263</div>
          <div className="flex items-center gap-1 text-[#fbbb1f]"><span className="text-[10px]">♦</span> 210</div>
        </div>
      </div>

      <div className="w-[1px] bg-[#193254] mx-2"></div>

      {/* 2nd Group: SET50 */}
      <div className="flex items-center gap-4">
        <span className="text-[#ffffff] text-[20px] font-normal leading-none tracking-wide">SET50</span>
        <span className="text-[#f6465d] text-[22px] font-medium leading-none tracking-wide">974.83</span>
        <div className="flex flex-col items-end text-[#f6465d] text-[12px] leading-[1.1] font-medium">
          <span>-7.88</span>
          <span>-0.88%</span>
        </div>
      </div>

      <div className="w-[1px] bg-[#193254] mx-2"></div>

      {/* SET50 High/Low */}
      <div className="flex flex-col justify-center gap-[2px] text-[12px] font-medium">
        <div className="flex justify-between gap-4">
          <span className="text-[#a9b2bf]">High</span>
          <span className="text-[#23df68]">983.19</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-[#a9b2bf]">Low</span>
          <span className="text-[#f6465d]">970.45</span>
        </div>
      </div>

      <div className="w-[1px] bg-[#193254] mx-2"></div>

      {/* 3rd Group: TFEX */}
      <div className="flex flex-col justify-center gap-[2px] text-[12px] font-medium">
        <div className="flex justify-between gap-4">
          <span className="text-[#a9b2bf]">TFEX Total Vol</span>
          <span className="text-[#1479dd]">238,460</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-[#a9b2bf]">Total Deal</span>
          <span className="text-[#1479dd]">83,912</span>
        </div>
      </div>

      <div className="w-[1px] bg-[#193254] mx-2"></div>

      {/* 4th Group: Total OI */}
      <div className="flex flex-col justify-center gap-[2px] text-[12px] font-medium">
        <div className="flex justify-between gap-3">
          <span className="text-[#a9b2bf]">Total OI</span>
          <span className="text-[#1479dd]">07/04</span>
        </div>
        <div className="flex justify-end gap-3">
          <span className="text-[#1479dd]">2,435,691</span>
        </div>
      </div>

      <div className="w-[1px] bg-[#193254] mx-2"></div>

      {/* 5th Group: Status */}
      <div className="flex flex-col justify-center gap-[2px] text-[12px] font-medium">
        <div className="flex items-center gap-2">
          <span className="text-[#a9b2bf]">SET:</span>
          <span className="text-[#fbbb1f]">Open2</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#a9b2bf]">Agri:</span>
          <span className="text-[#fbbb1f]">Day</span>
        </div>
      </div>

    </div>
  );
};

export default SetIndexPanel;
