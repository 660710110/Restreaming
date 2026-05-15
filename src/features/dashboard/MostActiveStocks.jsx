import React from 'react';

// ข้อมูลจำลองหุ้น 10 อันดับ
const mockData = [
  { symbol: 'DELTA', value: '2,518.02', last: '276.00', change: '+12.00', isUp: true },
  { symbol: 'AOT', value: '1,103.60', last: '51.00', change: '+2.25', isUp: true },
  { symbol: 'GULF', value: '1,052.59', last: '56.50', change: '+1.25', isUp: true },
  { symbol: 'PTTEP', value: '985.40', last: '152.00', change: '-1.50', isUp: false },
  { symbol: 'CPALL', value: '876.12', last: '55.25', change: '-0.50', isUp: false },
  { symbol: 'ADVANC', value: '754.80', last: '210.00', change: '+2.00', isUp: true },
  { symbol: 'BDMS', value: '645.30', last: '28.50', change: '0.00', isUp: null },
  { symbol: 'BBL', value: '598.25', last: '138.50', change: '+1.00', isUp: true },
  { symbol: 'KBANK', value: '520.90', last: '122.00', change: '-1.00', isUp: false },
  { symbol: 'SCB', value: '480.15', last: '105.50', change: '+0.50', isUp: true },
];

const MostActiveStocks = () => {
  return (
    <div className="bg-white dark:bg-[#0b1325] border border-gray-200 dark:border-[#1e3a8a] rounded-lg overflow-hidden flex flex-col w-full h-full shadow-lg transition-colors duration-300">
      
      <div className="bg-gray-50 dark:bg-[#1e3a8a]/30 border-b border-gray-200 dark:border-[#1e3a8a] text-gray-800 dark:text-white text-center py-3 font-semibold text-sm">
        Most Active Value (Top 10)
      </div>
      
      <div className="overflow-x-auto p-2">
        <table className="w-full text-xs text-left">
          <thead className="text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-[#1e3a8a]/50">
            <tr>
              <th className="py-2 px-2 font-medium">STOCK</th>
              <th className="py-2 px-2 font-medium text-right">VALUE (M)</th>
              <th className="py-2 px-2 font-medium text-right">LAST DONE</th>
              <th className="py-2 px-2 font-medium text-right">CHANGE</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-[#1e3a8a]/30 text-gray-700 dark:text-gray-200">
            {mockData.map((stock, index) => {
              // กำหนดสีตามสถานะหุ้น (ปรับให้สีเข้มขึ้นนิดนึงใน Light mode เพื่อให้อ่านง่าย)
              const colorClass = stock.isUp === true 
                ? 'text-green-600 dark:text-green-500' 
                : stock.isUp === false 
                  ? 'text-red-600 dark:text-red-500' 
                  : 'text-yellow-600 dark:text-yellow-500';

              return (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-[#1e3a8a]/20 transition-colors">
                  <td className="py-2.5 px-2 font-semibold text-gray-900 dark:text-white">{stock.symbol}</td>
                  <td className="py-2.5 px-2 text-right font-medium">{stock.value}</td>
                  <td className={`py-2.5 px-2 text-right font-semibold ${colorClass}`}>
                    {stock.last}
                  </td>
                  <td className={`py-2.5 px-2 text-right font-semibold ${colorClass}`}>
                    {stock.change}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default MostActiveStocks;