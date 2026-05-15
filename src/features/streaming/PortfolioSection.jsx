import React from 'react';

const PortfolioSection = () => {
  const headers = ["Symbol", "Start Vol", "Avail Vol", "Actual Vol", "Avg Cost", "Mkt Price", "Amount (Cost)", "Market Value", "Unrealized P/L", "%Unrealized P/L", "Realized P/L"];

  return (
    <div className="bg-[#0b141e] border border-[#1e2d3d] flex flex-col h-[320px]">
      <div className="flex bg-[#070b10] p-0.5">
        <button className="bg-[#2b6cb0] text-white px-4 py-1.5 text-xs rounded-t-sm">Portfolio</button>
        <button className="bg-[#1a2b3c] text-gray-400 px-4 py-1.5 text-xs rounded-t-sm ml-0.5">Deal Summary</button>
      </div>
      <div className="flex-grow overflow-auto">
        <table className="w-full text-[11px] border-collapse">
          <thead>
            <tr className="text-gray-400 border-b border-[#1e2d3d] bg-[#0b141e] sticky top-0">
              {headers.map(h => <th key={h} className="p-2 font-normal text-center border-x border-[#1e2d3d]/30">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={11} className="py-20 text-center text-gray-500 text-sm">No Data to Display</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-11 bg-[#0b141e] border-t border-[#1e2d3d] text-[11px] font-bold p-2 text-right">
        <span className="text-left col-span-4">Total</span>
        <span>0.00</span>
        <span>0.00</span>
        <span>0.00</span>
        <span>0.00</span>
        <span className="text-yellow-500">0.00</span>
        <span className="text-yellow-500">0.00%</span>
        <span className="text-yellow-500">0.00</span>
      </div>
    </div>
  );
};

export default PortfolioSection;