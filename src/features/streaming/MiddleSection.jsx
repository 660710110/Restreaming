import React from 'react';

const MiddleSection = () => {
  return (
    <div className="grid grid-cols-12 gap-1 mt-1 h-[250px]">
      {/* Market Depth */}
      <div className="col-span-3 bg-[#0b141e] border border-[#1e2d3d] p-1 flex flex-col">
        <div className="flex justify-between items-center bg-[#1a2b3c] p-1 mb-1">
          <span className="text-[10px] text-white">Market Depth</span>
          <div className="relative">
            <input className="bg-[#070b10] border border-gray-600 text-[10px] px-1 w-24 text-white" placeholder="Search Symbol"/>
          </div>
        </div>
        <div className="grid grid-cols-4 text-[10px] text-gray-400 border-b border-gray-700 pb-1">
          <span>Volume</span><span className="text-right">Bids</span><span className="text-left ml-2">Offers</span><span className="text-right">Volume</span>
        </div>
        {[1449.0, 1448.5, 1448.0, 1447.5, 1447.0].map((price, i) => (
          <div key={i} className="grid grid-cols-4 text-[11px] py-0.5 border-b border-[#1a2b3c]">
            <span className="text-blue-400">{(10000 * (i+1)).toLocaleString()}</span>
            <span className="text-right text-blue-400">{price.toFixed(1)}</span>
            <span className="text-left ml-2 text-red-500">{(price + 0.5).toFixed(1)}</span>
            <span className="text-right text-red-500">{(12300 * (i+1)).toLocaleString()}</span>
          </div>
        ))}
      </div>

      {/* Chart Display Area */}
      <div className="col-span-6 bg-[#0b141e] border border-[#1e2d3d] relative flex flex-col">
        <div className="flex bg-[#070b10]">
          <button className="bg-[#2b6cb0] text-white px-3 py-1 text-[10px]">Market Value Chart</button>
          <button className="bg-[#1a2b3c] text-gray-400 px-3 py-1 text-[10px] border-l border-[#070b10]">%Unrealized Chart</button>
        </div>
        <div className="flex-grow flex flex-col items-center justify-center text-gray-600">
           <div className="text-3xl mb-2">📊</div>
           <span className="text-xs italic">No data to Display</span>
        </div>
      </div>

      {/* Account Info */}
      <div className="col-span-3 bg-[#0b141e] border border-[#1e2d3d] p-2 flex flex-col">
        <div className="text-[10px] text-white border-b border-gray-700 mb-2 pb-1 uppercase font-bold">Account Information</div>
        <div className="space-y-2">
          { [
            {l: "Account Type", v: "Cash Balance for Turnover List"},
            {l: "Credit Limit", v: "100,000.00"},
            {l: "Line Available", v: "0.0"},
            {l: "Cash Balance", v: "0.0"}
          ].map((item, idx) => (
            <div key={idx} className="flex justify-between text-[10px]">
              <span className="text-gray-400">{item.l}</span>
              <span className="text-yellow-500 font-bold">{item.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MiddleSection;