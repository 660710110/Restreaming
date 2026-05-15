import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, Tooltip } from 'recharts';

const data = [
  { time: '10:00', value: 1420, volume: '12,500 MB' },
  { time: '11:00', value: 1427, volume: '14,200 MB' },
  { time: '11:30', value: 1418, volume: '15,100 MB' },
  { time: '12:00', value: 1428, volume: '16,800 MB' },
  { time: '14:00', value: 1428, volume: '17,500 MB' },
  { time: '15:00', value: 1430, volume: '19,440 MB' },
  { time: '15:30', value: 1427, volume: '20,100 MB' },
  { time: '16:00', value: 1430, volume: '21,000 MB' },
  { time: '16:30', value: 1420, volume: '22,300 MB' },
  { time: '17:00', value: 1432, volume: '24,500 MB' },
];

const IntradayChart = () => {
  const [clickedPoint, setClickedPoint] = useState(null);

  const CustomActiveDot = (props) => {
    const { cx, cy, payload } = props;
    return (
      <circle
        cx={cx}
        cy={cy}
        r={8}
        fill="#3b82f6"
        stroke="#ffffff"
        strokeWidth={2}
        style={{ cursor: 'pointer', pointerEvents: 'auto' }} 
        onClick={(e) => {
          e.stopPropagation();
          setClickedPoint(prev => {
            if (prev && prev.label === payload.time) return null;
            return { label: payload.time, dataPoint: payload, x: cx, y: cy };
          });
        }}
      />
    );
  };

  const handleBackgroundClick = () => {
    setClickedPoint(null);
  };

  const renderPinnedTooltip = () => {
    if (!clickedPoint) return null;

    const { label, dataPoint, x, y } = clickedPoint;
    const prevClose = 1424.99; 
    const currentVal = dataPoint.value;
    
    const change = (currentVal - prevClose).toFixed(2);
    const percentChange = ((change / prevClose) * 100).toFixed(2);
    const isPositive = change >= 0;
    const isRightSide = x > 200; 

    return (
      <div 
        className="absolute z-[100] bg-[#0c1421] border border-blue-400 rounded-md p-3 text-[11px] shadow-xl text-white w-48 pointer-events-none transition-all duration-200"
        style={{
          left: `${x}px`,
          top: `${y}px`,
          transform: isRightSide ? 'translate(-110%, -50%)' : 'translate(15px, -50%)',
        }}
      >
        <div className="text-blue-300 mb-2">{label}</div>
        <div className="flex justify-between border-b border-gray-700 pb-1 mb-1">
          <span className="text-gray-300">SET</span>
          <span className="font-semibold text-white">{currentVal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between pb-1 mb-1">
          <span className="text-gray-300">vs Prev Close</span>
          <span className={`font-semibold ${isPositive ? "text-green-500" : "text-red-500"}`}>
            {isPositive ? '+' : ''}{change} ({isPositive ? '+' : ''}{percentChange}%)
          </span>
        </div>
        <div className="flex justify-between pb-1 mb-1">
          <span className="text-gray-300">Prev Close</span>
          <span className="font-semibold text-orange-400">{prevClose.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">Volume</span>
          <span className="font-semibold text-white">{dataPoint.volume}</span>
        </div>
      </div>
    );
  };

  return (
    <div 
      className="bg-white dark:bg-[#0c1421] border border-gray-200 dark:border-[#1e3a8a] rounded-xl overflow-hidden mt-8 shadow-lg transition-colors duration-300 relative z-10"
      onClick={handleBackgroundClick}
    >
      {/* 📍 ส่วนที่แก้ไข: ใส่ items-center เพื่อจัดให้อยู่กึ่งกลางแนวตั้ง และลบเส้นใต้ border-b ออก */}
      <div className="flex items-center bg-gray-50 dark:bg-transparent transition-colors">
        <button className="flex-1 py-4 text-sm text-gray-400">Settrade</button>
        
        {/* 📍 เพิ่ม: เส้นแบ่งสั้นๆ ที่ 1 (ใช้ h-6 ความสูงกำลังสวย) */}
        <div className="w-[1px] h-6 bg-gray-300 dark:bg-[#1e3a8a]"></div>
        
        <button className="flex-1 py-4 text-sm text-gray-400">SET INDEX</button>
        
        {/* 📍 เพิ่ม: เส้นแบ่งสั้นๆ ที่ 2 */}
        <div className="w-[1px] h-6 bg-gray-300 dark:bg-[#1e3a8a]"></div>
        
        <button className="flex-1 py-4 text-sm text-gray-400">Intraday Chart</button>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-4 gap-4 text-center mb-6">
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">SET</div>
            <div className="text-green-600 dark:text-green-500 font-semibold text-sm">1,434.44</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">CHANGE</div>
            <div className="text-green-600 dark:text-green-500 font-semibold text-sm">+24.05</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">HIGH</div>
            <div className="text-green-600 dark:text-green-500 font-semibold text-sm">1,440.67</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">LOW</div>
            <div className="text-red-600 dark:text-red-500 font-semibold text-sm">1,431.18</div>
          </div>
        </div>

        <div className="h-[250px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={data} 
              margin={{ top: 5, right: 0, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#9ca3af" strokeOpacity={0.3} vertical={false} />
              <XAxis dataKey="time" stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis domain={[1410, 1440]} stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} tickCount={7} />
              <ReferenceLine y={1425} stroke="#d97706" strokeWidth={1} />
              
              <Tooltip 
                cursor={{ stroke: '#6b7280', strokeWidth: 1, strokeDasharray: '3 3' }} 
                content={() => null} 
                wrapperStyle={{ pointerEvents: 'none' }} 
              />
              
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6" 
                strokeWidth={2} 
                dot={false} 
                activeDot={(props) => <CustomActiveDot {...props} />} 
              />
            </LineChart>
          </ResponsiveContainer>

          {renderPinnedTooltip()}
        </div>
      </div>
    </div>
  );
};

export default IntradayChart;