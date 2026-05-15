import React from 'react';
import PortfolioSection from './PortfolioSection';
import MiddleSection from './MiddleSection';
import OrderTerminal from './OrderTerminal';

const PortfolioApp = () => {
  return (
    <div className="min-h-screen bg-[#070b10] text-white font-sans p-0.5 select-none">
      <main className="p-1">
        <PortfolioSection />
        <MiddleSection />
        <OrderTerminal />
        
        {/* Order Status Table (Bottom) */}
        <div className="mt-1 bg-[#0b141e] border border-[#1e2d3d] h-[150px] overflow-auto">
          <div className="grid grid-cols-10 bg-[#1a2b3c] text-[10px] text-gray-400 p-1 border-b border-[#1e2d3d] uppercase">
            <span>Order No.</span><span>Date</span><span>Time</span><span>Symbol</span><span>Side</span><span>Price</span><span>Vol</span><span>Matched</span><span>Status</span><span>Cancel</span>
          </div>
          <div className="flex items-center justify-center h-full text-gray-600 text-xs italic">
            No active orders to display
          </div>
        </div>
      </main>
    </div>
  );
};

export default PortfolioApp;