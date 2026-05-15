import React, { useState } from 'react';
import { 
  Plus, Search, Crosshair, 
  Settings, Camera, DownloadCloud, UploadCloud, FileDown, FileUp, 
  Type, Smile, PenTool, Eye, Lock, Magnet, Trash, Ruler, ZoomIn, 
  TrendingUp, Activity, Maximize, ChevronDown
} from 'lucide-react';

const PriceChart = () => {
  const [activeRange, setActiveRange] = useState('1d');

  // Dummy chart data resembling the wave in Technical.png
  // Up: green, Down: red
  const chartData = [
    { o: 30, c: 40, color: 'bg-[#ff0000]' }, { o: 28, c: 35, color: 'bg-[#ff0000]' },
    { o: 25, c: 30, color: 'bg-[#ff0000]' }, { o: 30, c: 45, color: 'bg-[#ff0000]' },
    { o: 45, c: 38, color: 'bg-[#ff0000]' }, { o: 38, c: 60, color: 'bg-[#23df68]' },
    { o: 60, c: 55, color: 'bg-[#ff0000]' }, { o: 55, c: 75, color: 'bg-[#23df68]' },
    { o: 75, c: 70, color: 'bg-[#ff0000]' }, { o: 70, c: 85, color: 'bg-[#23df68]' },
    { o: 85, c: 90, color: 'bg-[#23df68]' }, { o: 90, c: 80, color: 'bg-[#ff0000]' },
    { o: 80, c: 100, color: 'bg-[#23df68]' }, { o: 100, c: 95, color: 'bg-[#ff0000]' },
    { o: 95, c: 85, color: 'bg-[#ff0000]' }, { o: 85, c: 105, color: 'bg-[#23df68]' },
    { o: 105, c: 110, color: 'bg-[#23df68]' }, { o: 110, c: 115, color: 'bg-[#ff0000]' },
    { o: 115, c: 100, color: 'bg-[#ff0000]' }, { o: 100, c: 95, color: 'bg-[#ff0000]' },
    { o: 95, c: 80, color: 'bg-[#ff0000]' }, { o: 80, c: 70, color: 'bg-[#ff0000]' },
    { o: 70, c: 60, color: 'bg-[#ff0000]' }, { o: 60, c: 50, color: 'bg-[#ff0000]' },
    { o: 50, c: 40, color: 'bg-[#ff0000]' }, { o: 40, c: 30, color: 'bg-[#ff0000]' },
    { o: 30, c: 45, color: 'bg-[#ff0000]' }, { o: 45, c: 35, color: 'bg-[#ff0000]' },
    { o: 35, c: 50, color: 'bg-[#23df68]' }, { o: 50, c: 60, color: 'bg-[#23df68]' },
    { o: 60, c: 75, color: 'bg-[#23df68]' }, { o: 75, c: 95, color: 'bg-[#23df68]' },
    { o: 95, c: 110, color: 'bg-[#23df68]' }, { o: 110, c: 130, color: 'bg-[#23df68]' },
    { o: 130, c: 150, color: 'bg-[#23df68]' }, { o: 150, c: 145, color: 'bg-[#ff0000]' },
    { o: 145, c: 160, color: 'bg-[#23df68]' }, { o: 160, c: 155, color: 'bg-[#ff0000]' },
    { o: 155, c: 135, color: 'bg-[#ff0000]' }, { o: 135, c: 120, color: 'bg-[#ff0000]' },
    { o: 120, c: 140, color: 'bg-[#ff0000]' }, { o: 140, c: 110, color: 'bg-[#ff0000]' },
    { o: 110, c: 90, color: 'bg-[#ff0000]' }, { o: 90, c: 100, color: 'bg-[#ff0000]' },
    { o: 100, c: 85, color: 'bg-[#ff0000]' }, { o: 85, c: 65, color: 'bg-[#ff0000]' },
    { o: 65, c: 55, color: 'bg-[#ff0000]' }, { o: 55, c: 65, color: 'bg-[#ff0000]' }
  ];

  const ranges = ['1d', '5d', '1m', '3m', '1y', '5y'];
  const indicators = ['EMA20', 'EMA50', 'BB'];
  
  return (
    <div className="flex flex-col flex-1 w-full h-full bg-[#090e19] border border-[#193254] font-sans text-white select-none">
      
      {/* Top Header Row 1 */}
      <div className="flex items-center border-b border-[#193254] text-[13px] text-[#a9b2bf]">
        <div className="flex items-center px-4 py-2 border-r border-[#193254] gap-2">
          <Search size={16} />
          <span className="text-[#ffffff]">SCB</span>
          <div className="w-[18px] h-[18px] border border-[#1479dd] text-[#1479dd] rounded-full flex items-center justify-center cursor-pointer ml-12">
            <Plus size={12} />
          </div>
        </div>
        <div className="flex items-center px-4 py-2 border-r border-[#193254] hover:text-white cursor-pointer">
          <span className="text-white">D</span>
        </div>
        <div className="flex items-center px-4 py-2 border-r border-[#193254] hover:text-white cursor-pointer">
          <Activity size={16} style={{transform: "rotate(90deg)"}} />
        </div>
        <div className="flex items-center px-4 py-2 border-r border-[#193254] flex-1 hover:text-white cursor-pointer">
          <span className="font-serif italic mr-1">f</span>x indicators
        </div>
        
        {/* Right Tools */}
        <div className="flex items-center border-l border-[#193254] h-full">
          <div className="flex items-center gap-2 px-3 py-2 border-r border-[#193254] hover:text-white cursor-pointer"><UploadCloud size={14}/> Save Indicator</div>
          <div className="flex items-center gap-2 px-3 py-2 border-r border-[#193254] hover:text-white cursor-pointer"><DownloadCloud size={14}/> Load Indicator</div>
          <div className="flex items-center gap-2 px-3 py-2 border-r border-[#193254] hover:text-white cursor-pointer"><FileUp size={14}/> Save Chart</div>
          <div className="flex items-center gap-2 px-3 py-2 border-r border-[#193254] hover:text-white cursor-pointer"><FileDown size={14}/> Load Chart</div>
          <div className="flex items-center px-3 py-2 border-r border-[#193254] hover:text-white cursor-pointer"><Settings size={14}/></div>
          <div className="flex items-center px-3 py-2 hover:text-white cursor-pointer"><Camera size={14}/></div>
        </div>
      </div>

      {/* Top Header Row 2 */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#193254]">
         <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3 text-[12px] font-medium tracking-wide">
              <span className="text-white">SCB X • 1D • SET</span>
              <span className="text-[#f6465d]">O 1,483.22</span>
              <span className="text-[#f6465d]">H 1,489.14</span>
              <span className="text-[#f6465d]">L 1,472.58</span>
              <span className="text-[#f6465d]">C 1,479.46 -10.27 (-0.69%)</span>
            </div>
            <div className="w-5 h-5 border border-[#1479dd] rounded-[2px] flex items-center justify-center text-[#1479dd] mt-1 cursor-pointer">
              <ChevronDown size={14} />
            </div>
         </div>
         <div className="flex items-center gap-2 text-[11px] font-medium">
            {ranges.map(r => (
              <div 
                key={r}
                onClick={() => setActiveRange(r)}
                className={`cursor-pointer px-1.5 py-0.5 rounded-[2px] ${activeRange === r ? 'bg-[#1479dd]/20 text-[#1479dd]' : 'text-[#a9b2bf] hover:text-white'}`}
              >
                {r}
              </div>
            ))}
            <div className="w-[1px] h-3 bg-[#193254] mx-1"></div>
            {indicators.map(i => (
              <div key={i} className="cursor-pointer text-[#a9b2bf] hover:text-white px-1">
                {i}
              </div>
            ))}
         </div>
      </div>

      {/* Workspace */}
      <div className="flex flex-1 relative overflow-hidden">
        
        {/* Left Toolbar */}
        <div className="flex flex-col w-[40px] items-center py-2 gap-3 border-r border-[#193254] text-[#a9b2bf]">
          <Crosshair size={16} className="cursor-pointer hover:text-white" />
          <TrendingUp size={16} className="cursor-pointer hover:text-white" />
          <Activity size={16} className="cursor-pointer hover:text-white rotate-90" />
          <PenTool size={16} className="cursor-pointer hover:text-white" />
          <Type size={16} className="cursor-pointer hover:text-white" />
          <Smile size={16} className="cursor-pointer hover:text-white" />
          <Ruler size={16} className="cursor-pointer hover:text-white mt-1" />
          <ZoomIn size={16} className="cursor-pointer hover:text-white" />
          <Magnet size={16} className="cursor-pointer hover:text-white text-[#a9b2bf]" />
          <Lock size={16} className="cursor-pointer hover:text-white" />
          <Eye size={16} className="cursor-pointer hover:text-white" />
          <Trash size={16} className="cursor-pointer hover:text-white" />
          <Maximize size={16} className="cursor-pointer hover:text-white mt-auto mb-2" />
        </div>

        {/* Chart Area */}
        <div className="flex-1 relative flex flex-col pt-8 pb-10 px-2 group">
          
          {/* Main Chart Line at specific level */}
          <div className="absolute w-[calc(100%-60px)] border-t border-[#ff0000] bottom-[48%] left-0 z-10 opacity-70"></div>
          
          <div className="flex-1 flex items-end justify-between px-2 mr-[60px] h-full">
             {chartData.map((d, i) => {
               const minP = Math.min(d.o, d.c);
               const maxP = Math.max(d.o, d.c);
               const h = Math.max(1, maxP - minP);
               const b = minP;
               const totalHeight = 180; // arbitrary max
               
               // Random wicks for visual authenticity
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
          <div className="absolute bottom-6 left-2 right-[68px] h-[60px] flex items-end justify-between opacity-50 z-0">
             {chartData.map((d, i) => (
                <div key={`v-${i}`} className={`w-[8px] rounded-t-sm ${d.color}`} style={{ height: `${Math.random() * 40 + 10}px` }}></div>
             ))}
          </div>

          {/* X Axis */}
          <div className="absolute bottom-2 left-0 right-[60px] flex justify-between px-10 text-[10px] text-[#a9b2bf]">
            <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span><span>2026</span><span>Feb</span><span>Mar</span><span>Apr</span>
          </div>
          
        </div>

        {/* Y Axis right */}
        <div className="w-[60px] absolute right-0 top-0 bottom-0 bg-[#090e19] border-l border-[#193254] flex flex-col justify-between pt-[40px] pb-[40px] text-[10px] text-[#a9b2bf] font-mono z-20">
          <div className="text-right pr-2">1560</div>
          <div className="text-right pr-2">1520</div>
          <div className="text-right pr-2">1480</div>
          <div className="text-right pr-2">1440</div>
          <div className="text-right pr-2">1400</div>
          <div className="text-right pr-2">1360</div>
          
          {/* Active Price Label */}
          <div className="absolute bottom-[48%] translate-y-[50%] right-0 w-full bg-[#ff0000] text-white text-right pr-1 py-[2px] font-bold">1,477.54</div>
          
          <div className="text-right pr-2">1320</div>
          <div className="text-right pr-2">1280</div>
          <div className="text-right pr-2">1240</div>
          <div className="text-right pr-2">1200</div>

          <div className="absolute bottom-2 right-2 text-[10px] flex items-center gap-1 text-[#1479dd] font-sans">
             Adj <span className="text-[#a9b2bf]">% log</span> auto <Settings size={10} className="text-[#a9b2bf] ml-1"/>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PriceChart;
