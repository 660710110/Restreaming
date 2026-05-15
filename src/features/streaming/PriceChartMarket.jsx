import React, { useState } from 'react';
import { 
  Crosshair, Type, Eye, Lock, Star, Ruler, TrendingUp, Activity, Menu
} from 'lucide-react';

const PriceChartMarket = () => {
  const [activeRange, setActiveRange] = useState('1D');

  const chartData = [
    { o: 30, c: 40, color: 'bg-[#23df68]' }, { o: 38, c: 50, color: 'bg-[#23df68]' },
    { o: 45, c: 60, color: 'bg-[#23df68]' }, { o: 55, c: 45, color: 'bg-[#ff0000]' },
    { o: 48, c: 35, color: 'bg-[#ff0000]' }, { o: 38, c: 45, color: 'bg-[#23df68]' },
    { o: 42, c: 60, color: 'bg-[#23df68]' }, { o: 55, c: 75, color: 'bg-[#23df68]' },
    { o: 70, c: 85, color: 'bg-[#23df68]' }, { o: 80, c: 70, color: 'bg-[#ff0000]' },
    { o: 72, c: 85, color: 'bg-[#23df68]' }, { o: 80, c: 95, color: 'bg-[#23df68]' },
    { o: 95, c: 85, color: 'bg-[#ff0000]' }, { o: 85, c: 105, color: 'bg-[#23df68]' },
    { o: 100, c: 120, color: 'bg-[#23df68]' }, { o: 115, c: 100, color: 'bg-[#ff0000]' },
    { o: 105, c: 95, color: 'bg-[#ff0000]' }, { o: 98, c: 85, color: 'bg-[#ff0000]' },
    { o: 88, c: 75, color: 'bg-[#ff0000]' }, { o: 78, c: 65, color: 'bg-[#ff0000]' },
    { o: 68, c: 80, color: 'bg-[#23df68]' }, { o: 75, c: 90, color: 'bg-[#23df68]' },
    { o: 85, c: 100, color: 'bg-[#23df68]' }, { o: 95, c: 110, color: 'bg-[#23df68]' },
    { o: 105, c: 125, color: 'bg-[#23df68]' }, { o: 120, c: 110, color: 'bg-[#ff0000]' },
    { o: 115, c: 130, color: 'bg-[#23df68]' }, { o: 125, c: 140, color: 'bg-[#23df68]' },
    { o: 135, c: 145, color: 'bg-[#23df68]' }, { o: 140, c: 130, color: 'bg-[#ff0000]' },
    { o: 132, c: 120, color: 'bg-[#ff0000]' }, { o: 122, c: 110, color: 'bg-[#ff0000]' },
    { o: 115, c: 105, color: 'bg-[#ff0000]' }, { o: 108, c: 95, color: 'bg-[#ff0000]' },
    { o: 98, c: 85, color: 'bg-[#ff0000]' }, { o: 90, c: 105, color: 'bg-[#23df68]' }
  ];

  const ranges = ['1D', '5D', '1M', '3M', '6M', '1Y', 'YTD', 'All'];
  
  return (
    <div className="flex flex-col flex-1 w-full bg-[#090e19] font-sans text-white select-none">
      
      {/* Workspace */}
      <div className="flex flex-1 relative overflow-hidden">
        
        {/* Left Toolbar */}
        <div className="flex flex-col w-[40px] items-center py-4 gap-4 text-[#a9b2bf]">
          <Crosshair size={16} className="cursor-pointer hover:text-white" />
          <TrendingUp size={16} className="cursor-pointer hover:text-white" />
          <Activity size={16} className="cursor-pointer hover:text-white" />
          <Menu size={16} className="cursor-pointer hover:text-white" />
          <div className="w-[16px] h-[16px] border-t-2 border-b-2 border-[#a9b2bf] cursor-pointer hover:border-white"></div>
          <Type size={16} className="cursor-pointer hover:text-white" />
          <div className="w-[16px] h-[16px] rounded-full border-2 border-[#a9b2bf] cursor-pointer hover:border-white"></div>
          <Ruler size={16} className="cursor-pointer hover:text-white mt-2" />
          <Eye size={16} className="cursor-pointer hover:text-white" />
          <Lock size={16} className="cursor-pointer hover:text-white" />
          <Star size={16} className="cursor-pointer hover:text-white" />
        </div>

        {/* Chart Area */}
        <div className="flex-1 relative flex flex-col pt-4 pb-10 px-2 group">
          
          {/* Timeframes Floating inside Chart Top Left */}
          <div className="absolute top-0 left-4 z-20 flex gap-4 text-[12px] font-medium">
            {ranges.map(r => (
              <div 
                key={r}
                onClick={() => setActiveRange(r)}
                className={`cursor-pointer px-2 py-[2px] rounded-[4px] ${activeRange === r ? 'bg-[#1479dd] text-white' : 'text-[#a9b2bf] hover:text-white'}`}
              >
                {r}
              </div>
            ))}
          </div>

          {/* Main Chart Line at specific level */}
          <div className="absolute w-[calc(100%-60px)] border-t border-[#ff0000] top-[30%] left-0 z-10 opacity-70"></div>
          
          <div className="flex-1 flex items-end justify-between px-2 mr-[60px] mt-10">
             {chartData.map((d, i) => {
               const minP = Math.min(d.o, d.c);
               const maxP = Math.max(d.o, d.c);
               const h = Math.max(1, maxP - minP);
               const b = minP;
               const totalHeight = 160; 
               
               const wickH = h + Math.random() * 20 + 5;
               const wickB = b - Math.random() * 10;
               const wickBottomPercent = `${wickB / totalHeight * 100}%`;
               const wickHeightPercent = `${wickH / totalHeight * 100}%`;
               const bodyBottomPercent = `${b / totalHeight * 100}%`;
               const bodyHeightPercent = `${h / totalHeight * 100}%`;

               return (
                 <div key={i} className="flex flex-col items-center w-[2%] h-full relative">
                   <div className={`absolute w-[1px] ${d.color}`} style={{ bottom: wickBottomPercent, height: wickHeightPercent }}></div>
                   <div className={`absolute w-[80%] max-w-[8px] rounded-[1px] ${d.color}`} style={{ bottom: bodyBottomPercent, height: bodyHeightPercent }}></div>
                 </div>
               )
             })}
          </div>

          {/* Volume bars overlay at bottom */}
          <div className="absolute bottom-6 left-2 right-[68px] h-[40px] flex items-end justify-between opacity-50 z-0">
             {chartData.map((d, i) => (
                <div key={`v-${i}`} className={`w-[8px] rounded-t-sm ${d.color}`} style={{ height: `${Math.random() * 30 + 5}px` }}></div>
             ))}
          </div>

          {/* X Axis */}
          <div className="absolute bottom-2 left-0 right-[60px] flex justify-between px-10 text-[11px] font-medium text-[#a9b2bf]">
            <span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span>
          </div>
          
        </div>

        {/* Y Axis right */}
        <div className="w-[60px] absolute right-0 top-0 bottom-0 flex flex-col justify-between pt-[40px] pb-[40px] text-[11px] font-medium text-[#a9b2bf] z-20">
          <div className="text-right pr-2">110.00</div>
          <div className="text-right pr-2">100.00</div>
          <div className="text-right pr-2">90.00</div>
          <div className="text-right pr-2">80.00</div>
          <div className="text-right pr-2">70.00</div>
          <div className="text-right pr-2">60.00</div>
          <div className="text-right pr-2">50.00</div>
          
          {/* Active Price Label */}
          <div className="absolute top-[30%] -translate-y-[50%] right-0 w-full bg-[#23df68] text-white text-right pr-1 py-[2px] font-bold rounded-sm">102.50</div>
        </div>

      </div>
    </div>
  );
};

export default PriceChartMarket;
