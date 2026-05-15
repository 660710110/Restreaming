import React, { useState } from 'react';

const MarketStockTabs = () => {
  const [activeTab, setActiveTab] = useState('mostActive');

  return (
    <div className="bg-white dark:bg-[#0c1421] border border-gray-200 dark:border-[#1e3a8a] rounded-xl overflow-hidden shadow-sm h-full flex flex-col">
      
      {/* 📍 3. สร้างเงื่อนไขสลับคลาสของปุ่ม Tab เมื่อมีการคลิก */}
      <div className="flex">
        <button 
          onClick={() => setActiveTab('mostActive')}
          className={`flex-1 py-2 text-xs font-semibold transition-colors ${
            activeTab === 'mostActive' 
              ? 'bg-gray-50 dark:bg-[#111827] border-t-2 border-blue-500 text-blue-600 dark:text-white' 
              : 'bg-white dark:bg-[#090e19] text-gray-500 dark:text-gray-400 border-r border-gray-200 dark:border-[#1e3a8a]'
          }`}
        >
          Most Active Value
        </button>
        <button 
          onClick={() => setActiveTab('topGainers')}
          className={`flex-1 py-2 text-xs font-semibold transition-colors ${
            activeTab === 'topGainers'
              ? 'bg-gray-50 dark:bg-[#111827] border-t-2 border-blue-500 text-blue-600 dark:text-white'
              : 'bg-white dark:bg-[#090e19] text-gray-500 dark:text-gray-400 border-l border-gray-200 dark:border-[#1e3a8a]'
          }`}
        >
          Top Gainers
        </button>
      </div>
      <div className="flex-1 overflow-auto">
        <table className="w-full text-[10px] text-right">
          <thead>
            {/* 📍 4. สลับหัวตาราง ถ้าเป็น Top Gainers ให้เปลี่ยน VALUE (M) -> VALUE และ CHANGE -> %CHANGE */}
            <tr className="text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-[#1e3a8a] bg-gray-50/50 dark:bg-transparent">
              <th className="py-2 px-3 text-left font-normal">STOCK</th>
              <th className="py-2 px-3 font-normal">{activeTab === 'topGainers' ? 'VALUE' : 'VALUE (M)'}</th>
              <th className="py-2 px-3 font-normal">LAST DONE</th>
              <th className="py-2 px-3 font-normal">{activeTab === 'topGainers' ? '%CHANGE' : 'CHANGE'}</th>
            </tr>
          </thead>
          <tbody>
            {/* 📍 5. แสดงข้อมูลตาม Tab ที่เลือก */}
            {activeTab === 'mostActive' ? (
              <>
                <tr className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#111827]">
                  <td className="py-2 px-3 text-left font-semibold text-gray-900 dark:text-white">DELTA</td><td className="py-2 px-3 text-gray-700 dark:text-gray-300">2,518,029,100</td><td className="py-2 px-3 text-gray-700 dark:text-gray-300">276.000</td><td className="py-2 px-3 text-green-600 dark:text-green-500">+12.000</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#111827]">
                  <td className="py-2 px-3 text-left font-semibold text-gray-900 dark:text-white">AOT</td><td className="py-2 px-3 text-gray-700 dark:text-gray-300">1,103,601,700</td><td className="py-2 px-3 text-gray-700 dark:text-gray-300">51.000</td><td className="py-2 px-3 text-green-600 dark:text-green-500">+2.250</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-[#111827]">
                  <td className="py-2 px-3 text-left font-semibold text-gray-900 dark:text-white">GULF</td><td className="py-2 px-3 text-gray-700 dark:text-gray-300">1,052,592,925</td><td className="py-2 px-3 text-gray-700 dark:text-gray-300">56.500</td><td className="py-2 px-3 text-green-600 dark:text-green-500">+1.250</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#111827]">
                  <td className="py-2 px-3 text-left font-semibold text-gray-900 dark:text-white">PTTEP</td><td className="py-2 px-3 text-gray-700 dark:text-gray-300">985,400,000</td><td className="py-2 px-3 text-gray-700 dark:text-gray-300">152.000</td><td className="py-2 px-3 text-red-500 dark:text-red-500">-1.500</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#111827]">
                  <td className="py-2 px-3 text-left font-semibold text-gray-900 dark:text-white">CPALL</td><td className="py-2 px-3 text-gray-700 dark:text-gray-300">876,120,000</td><td className="py-2 px-3 text-gray-700 dark:text-gray-300">55.250</td><td className="py-2 px-3 text-red-500 dark:text-red-500">-0.500</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-[#111827]">
                  <td className="py-2 px-3 text-left font-semibold text-gray-900 dark:text-white">ADVANC</td><td className="py-2 px-3 text-gray-700 dark:text-gray-300">754,800,000</td><td className="py-2 px-3 text-gray-700 dark:text-gray-300">210.000</td><td className="py-2 px-3 text-green-600 dark:text-green-500">+2.000</td>
                </tr>
              </>
            ) : (
              <>
                {/* 📍 ข้อมูลสำหรับ Top Gainers ตามรูปภาพ */}
                <tr className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#111827]">
                  <td className="py-2 px-3 text-left font-semibold text-gray-900 dark:text-white">HANA13C2604A</td><td className="py-2 px-3 text-gray-700 dark:text-gray-300">240,000</td><td className="py-2 px-3 text-gray-700 dark:text-gray-300">276.000</td><td className="py-2 px-3 text-green-600 dark:text-green-500">+150.00%</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#111827]">
                  <td className="py-2 px-3 text-left font-semibold text-gray-900 dark:text-white">BCP001C2607A</td><td className="py-2 px-3 text-gray-700 dark:text-gray-300">679,000</td><td className="py-2 px-3 text-gray-700 dark:text-gray-300">51.000</td><td className="py-2 px-3 text-green-600 dark:text-green-500">+111.11%</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-[#111827]">
                  <td className="py-2 px-3 text-left font-semibold text-gray-900 dark:text-white">HANA19C2604A</td><td className="py-2 px-3 text-gray-700 dark:text-gray-300">4,773,400</td><td className="py-2 px-3 text-gray-700 dark:text-gray-300">56.500</td><td className="py-2 px-3 text-green-600 dark:text-green-500">+100.00%</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#111827]">
                  <td className="py-2 px-3 text-left font-semibold text-gray-900 dark:text-white">JAS13C2405A</td><td className="py-2 px-3 text-gray-700 dark:text-gray-300">1,250,000</td><td className="py-2 px-3 text-gray-700 dark:text-gray-300">2.500</td><td className="py-2 px-3 text-green-600 dark:text-green-500">+25.00%</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#111827]">
                  <td className="py-2 px-3 text-left font-semibold text-gray-900 dark:text-white">TRUE01C2406B</td><td className="py-2 px-3 text-gray-700 dark:text-gray-300">3,400,000</td><td className="py-2 px-3 text-gray-700 dark:text-gray-300">8.000</td><td className="py-2 px-3 text-green-600 dark:text-green-500">+10.50%</td>
                </tr>
                <tr className="hover:bg-gray-50 dark:hover:bg-[#111827]">
                  <td className="py-2 px-3 text-left font-semibold text-gray-900 dark:text-white">KTB19P2408A</td><td className="py-2 px-3 text-gray-700 dark:text-gray-300">8,900,000</td><td className="py-2 px-3 text-gray-700 dark:text-gray-300">16.500</td><td className="py-2 px-3 text-green-600 dark:text-green-500">+5.00%</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>  
    </div>
  );
};

export default MarketStockTabs;