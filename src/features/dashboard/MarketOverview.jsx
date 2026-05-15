import React from 'react';

const MarketOverview = () => {
  return (
    <div className="bg-white dark:bg-[#0c1421] border border-gray-200 dark:border-[#1e3a8a] rounded-xl overflow-hidden shadow-sm shrink-0">
      <div className="bg-gray-50 dark:bg-[#111827] py-2 text-center border-b border-gray-200 dark:border-[#1e3a8a] text-sm text-gray-700 dark:text-gray-200">
        Market Overview
      </div>
      <div className="p-4 space-y-3 text-sm">
        <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2"><span className="text-gray-500 dark:text-gray-400">SET Index</span><span className="text-gray-900 dark:text-white font-medium">1,434.44</span></div>
        <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2"><span className="text-gray-500 dark:text-gray-400">Value (M)</span><span className="text-gray-900 dark:text-white font-medium">20.805</span></div>
        <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2"><span className="text-gray-500 dark:text-gray-400">Volume ('000)</span><span className="text-gray-900 dark:text-white font-medium">3,145</span></div>
        
        <div className="grid grid-cols-3 gap-2 pt-2">
          <div className="border border-green-200 dark:border-green-900/50 bg-green-50 dark:bg-green-900/10 rounded p-2 text-center">
            <div className="text-[10px] text-gray-500 dark:text-gray-400 mb-1">Gainers</div>
            <div className="text-green-600 dark:text-green-500 font-semibold">319</div>
          </div>
          <div className="border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10 rounded p-2 text-center">
            <div className="text-[10px] text-gray-500 dark:text-gray-400 mb-1">Losers</div>
            <div className="text-red-600 dark:text-red-500 font-semibold">108</div>
          </div>
          <div className="border border-orange-200 dark:border-orange-900/50 bg-orange-50 dark:bg-orange-900/10 rounded p-2 text-center">
            <div className="text-[10px] text-gray-500 dark:text-gray-400 mb-1">Unchanged</div>
            <div className="text-orange-600 dark:text-orange-500 font-semibold">152</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketOverview;