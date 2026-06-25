import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Filter, RotateCw, ChevronDown, X, Check, Star, RefreshCw } from 'lucide-react';

// --- Constants Pool ---
const SET_TYPES = ['Common Stock', 'Foreign Common Stock', 'Convertible', 'Warrant', 'Derivatives Warrant', 'DR', 'Preferred', 'ETF'];
const TFEX_TYPES = ['Equity Index', 'Single Stock', 'Metal', 'Agricultural', 'Currency', 'Interest Rate', 'Deferred Contract', 'ALL Counters Options'];
const FAV_LIST = Array.from({ length: 10 }, (_, i) => `Favourite ${i + 1}`).concat(['My Port']);

const INITIAL_SYMBOLS = [
  { symbol: 'BTS', market: 'SET', type: 'Common Stock' },
  { symbol: 'DELTA', market: 'SET', type: 'Common Stock' },
  { symbol: 'PTTEP', market: 'SET', type: 'Common Stock' },
  { symbol: 'BGRIMM26', market: 'SET', type: 'Derivatives Warrant' },
  { symbol: 'TITLE', market: 'SET', type: 'Common Stock' },
  { symbol: 'LANNA', market: 'SET', type: 'Common Stock' },
  { symbol: 'XBIO-W8', market: 'SET', type: 'Warrant' },
  { symbol: 'AMARC', market: 'SET', type: 'Common Stock' },
  { symbol: 'ROJNA', market: 'SET', type: 'Common Stock' },
  { symbol: 'CATL80', market: 'SET', type: 'DR' },
  { symbol: 'S50M26', market: 'TFEX', type: 'Equity Index' },
  { symbol: 'GOM26', market: 'TFEX', type: 'Metal' },
  { symbol: 'IVL', market: 'SET', type: 'Common Stock' },
  { symbol: 'SPTX', market: 'SET', type: 'ETF' },
  { symbol: 'DMT', market: 'SET', type: 'Common Stock' },
  { symbol: 'PLUS', market: 'SET', type: 'Common Stock' },
  { symbol: 'LH', market: 'SET', type: 'Common Stock' },
  { symbol: 'GUNKUL', market: 'SET', type: 'Common Stock' },
  { symbol: 'CPALL', market: 'SET', type: 'Common Stock' },
  { symbol: 'SAWAD', market: 'SET', type: 'Common Stock' },
  { symbol: 'FSMART', market: 'SET', type: 'Common Stock' },
  { symbol: 'WPH', market: 'SET', type: 'Common Stock' },
  { symbol: 'CPN', market: 'SET', type: 'Common Stock' },
  { symbol: 'KTB', market: 'SET', type: 'Common Stock' },
  { symbol: 'AIE', market: 'SET', type: 'Common Stock' },
  { symbol: 'HTECH', market: 'SET', type: 'Common Stock' },
  { symbol: 'SIS', market: 'SET', type: 'Common Stock' },
  { symbol: 'SPTECH80', market: 'SET', type: 'DR' },
  { symbol: 'TBN', market: 'SET', type: 'Common Stock' }
];

const USER_FAVORITES = ['DELTA', 'PTTEP', 'SIS', 'GUNKUL', 'AMARC', 'ROJNA'];

function TickerTerminal() {
  // --- States ---
  const [tickerList, setTickerList] = useState([]);
  const [isLive, setIsLive] = useState(true);
  const [autoScroll, setAutoScroll] = useState(true);
  const [columnsCount, setColumnsCount] = useState(3);
  
  // Navigation Dropdowns Status
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Active Screen Real Filters
  const [activeSET, setActiveSET] = useState(SET_TYPES);
  const [activeTFEX, setActiveTFEX] = useState(TFEX_TYPES);
  const [activeSide, setActiveSide] = useState('Buy & Sell');

  // Modal Inside State
  const [modalFilters, setModalFilters] = useState({
    setAll: true,
    setTypes: SET_TYPES,
    tfexAll: true,
    tfexTypes: TFEX_TYPES,
    favAll: true,
    favTypes: FAV_LIST,
    filterValueOn1: false,
    filterValueCondition1: '>=',
    filterValue1: '',
    filterValueOn2: false,
    filterValueCondition2: '>=',
    filterValue2: '',
    orderSide: 'Buy & Sell',
    sumMode: false,
  });

  const scrollContainerRefs = useRef([]);

  // --- Real-time Generation Engine ---
  useEffect(() => {
    // //จุดที่เพิ่มเข้าไป: ปรับปรุงระบบควบคุมเมื่อปิดออโต้สกรอลล์ (Auto Scroll = false)
    // เพื่อสั่งให้เครื่องยนต์สตรีมมิ่งหยุดป้อนข้อมูลใหม่เข้าสู่สถานะจำลองทันที ทำให้หน้าจอหยุดนิ่งไม่เลื่อนลายตา
    if (!isLive || !autoScroll) return; 

    const generateTicker = () => {
      const base = INITIAL_SYMBOLS[Math.floor(Math.random() * INITIAL_SYMBOLS.length)];
      const side = Math.random() > 0.45 ? 'B' : 'S';
      const volume = Math.floor(Math.random() * 50) * 1000 + 100;
      
      let last = parseFloat((Math.random() * 400 + 2).toFixed(2));
      if (base.symbol === 'DELTA') last = parseFloat((350 + Math.random() * 10).toFixed(2));
      if (base.symbol === 'XBIO-W8') last = parseFloat((0.15 + Math.random() * 0.05).toFixed(2));
      
      const change = parseFloat((Math.random() * 4 - 2).toFixed(2));
      const pctChg = parseFloat(((change / last) * 100).toFixed(2));

      const item = {
        id: Math.random().toString(36).substr(2, 9),
        symbol: base.symbol,
        side,
        volume,
        last,
        change,
        pctChg,
        market: base.market,
        type: base.type,
        timestamp: Date.now()
      };

      const matchSET = item.market === 'SET' && activeSET.includes(item.type);
      const matchTFEX = item.market === 'TFEX' && activeTFEX.includes(item.type);
      const matchSide = activeSide === 'Buy & Sell' || (activeSide === 'Buy' && item.side === 'B') || (activeSide === 'Sell' && item.side === 'S');

      if ((matchSET || matchTFEX) && matchSide) {
        setTickerList(prev => {
          const updated = [...prev, item];
          if (updated.length > 150) updated.shift();
          return updated;
        });
      }
    };

    const interval = setInterval(generateTicker, 400);
    return () => clearInterval(interval);
  }, [isLive, activeSET, activeTFEX, activeSide, autoScroll]); // //เพิ่มกุญแจตรวจจับ autoScroll เพื่อผูกกระบวนการปิด/เปิดหน้าจอ

  // //จุดที่เพิ่มเข้าไป: ฟังก์ชันสำหรับปุ่มรีเฟรชค่าล่าสุดเรียบลไทม์ (Refresh Real-time Generator)
  // ทำหน้าที่ล้างอาร์เรย์เดิมทิ้ง และระเบิดชุดข้อมูลหุ้นแบบ Random ใหม่ล่าสุดขึ้นมาทันทีเพื่อจำลองสถานการณ์ราคาล่าสุด ณ วินาทีนั้น
  const handleRefreshData = () => {
    const refreshedItems = [];
    for (let i = 0; i < 45; i++) {
      const base = INITIAL_SYMBOLS[Math.floor(Math.random() * INITIAL_SYMBOLS.length)];
      const side = Math.random() > 0.45 ? 'B' : 'S';
      const volume = Math.floor(Math.random() * 50) * 1000 + 100;
      let last = parseFloat((Math.random() * 400 + 2).toFixed(2));
      if (base.symbol === 'DELTA') last = parseFloat((350 + Math.random() * 10).toFixed(2));
      const change = parseFloat((Math.random() * 4 - 2).toFixed(2));
      const pctChg = parseFloat(((change / last) * 100).toFixed(2));

      refreshedItems.push({
        id: Math.random().toString(36).substr(2, 9),
        symbol: base.symbol,
        side,
        volume,
        last,
        change,
        pctChg,
        market: base.market,
        type: base.type,
        timestamp: Date.now()
      });
    }
    setTickerList(refreshedItems);
  };

  // --- Grid Column Distribute System ---
  const distributedColumns = useMemo(() => {
    const cols = Array.from({ length: columnsCount }, () => []);
    const itemsPerColumn = 22; 
    
    // //จุดที่เพิ่มเข้าไปและแก้ไขใหม่ล่าสุด: ระบบจัดสรรคอลัมน์แบบดันขึ้นย้อนกลับ (Reverse Column Push Overflow System)
    // 1. คัดเอาเฉพาะข้อมูลล่าสุดจำนวนเท่าที่หน้าจอจะจุได้ทั้งหมด (เช่น 3 คอลัมน์ x 22 แถว = 66 รายการล่าสุด) เพื่อเอามาแสดงผล
    const maxVisibleItems = columnsCount * itemsPerColumn;
    const visibleTickers = tickerList.slice(-maxVisibleItems);

    // 2. นำข้อมูลชุดนี้มาหยอดใส่คอลัมน์ทีละช่อง โดยเติมคอลัมน์ 1 ให้ครบ 22 แถว -> แล้วล้นไปคอลัมน์ 2 -> และล้นไปคอลัมน์ 3 ตามลำดับ
    // เมื่อมีข้อมูลใหม่โผล่เข้ามา รายการเก่าสุดที่อยู่บนสุดของคอลัมน์ 1 จะโดนดันตกกระดานหายไป ข้อมูลคอลัมน์ 2 จะดันขึ้นไปแทนท้ายคอลัมน์ 1 และคอลัมน์ 3 จะดันขึ้นไปแทนท้ายคอลัมน์ 2 เป็นทอดๆ
    visibleTickers.forEach((item, index) => {
      const targetCol = Math.floor(index / itemsPerColumn);
      if (targetCol < columnsCount) {
        cols[targetCol].push(item);
      }
    });
    return cols;
  }, [tickerList, columnsCount]);

  // Handle Container Auto-scrolling
  useEffect(() => {
    if (autoScroll && isLive) {
      scrollContainerRefs.current.forEach(el => {
        if (el) el.scrollTop = el.scrollHeight;
      });
    }
  }, [tickerList, autoScroll, isLive]);

  const handleSaveChanges = () => {
    setActiveSET(modalFilters.setTypes);
    setActiveTFEX(modalFilters.tfexTypes);
    setActiveSide(modalFilters.orderSide);
    setIsFilterModalOpen(false);
  };

  return (
    <div className="w-full min-h-screen bg-[#080d14] text-[#d1d5db] p-3 font-sans select-none overflow-x-hidden antialiased">
      
      {/* HEADER INDEX BAR */}
      <div className="w-full bg-[#0d1622] border border-[#172537] rounded-t-xl p-3 flex flex-wrap items-center justify-between text-xs font-semibold shadow-xl">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-gray-400 font-bold">SET</span>
            <span className="text-[#00e676] tracking-wider text-[13px]">1,471.65</span>
            <span className="text-[#00e676] bg-[#00e676]/10 px-1.5 py-0.5 rounded text-[11px] font-mono">+23.51 (+1.57%)</span>
          </div>
          <div className="flex items-center gap-2 border-l border-[#1f354f] pl-6">
            <span className="text-gray-400 font-bold">SET50</span>
            <span className="text-[#00e676] tracking-wider text-[13px]">980.63</span>
            <span className="text-[#00e676] bg-[#00e676]/10 px-1.5 py-0.5 rounded text-[11px] font-mono">+11.48 (+1.18%)</span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-gray-400 font-mono text-[11px]">
          <div>TFEX Total Vol: <span className="text-white font-bold">238,460</span></div>
          <div className="border-l border-[#1f354f] pl-4">Total OI: <span className="text-white font-bold">2,435,891</span></div>
        </div>
      </div>

      {/* --- CONTROL NAVIGATION BAR --- */}
      <div className="w-full bg-[#0d1622] border-x border-b border-[#172537] rounded-b-xl p-2.5 flex flex-wrap items-center justify-between gap-3 shadow-lg relative z-30">
        
        <div className="flex items-center flex-wrap gap-2">
          <button 
            onClick={() => setIsFilterModalOpen(true)}
            className="flex items-center gap-1.5 bg-[#122035] hover:bg-[#1a2d4a] border border-[#1e3556] px-3 py-1.5 rounded-lg text-sky-400 text-xs font-bold transition shadow-sm"
          >
            <Filter size={13} /> Filter <ChevronDown size={11} />
          </button>

          {/* SET DROPDOWN */}
          <div className="relative">
            <button 
              onClick={() => setOpenDropdown(openDropdown === 'SET' ? null : 'SET')}
              className={`flex items-center gap-1.5 bg-[#122035] px-3 py-1.5 rounded-lg border text-xs font-semibold transition ${activeSET.length < SET_TYPES.length ? 'border-sky-500 text-sky-400' : 'border-[#1e3556] text-gray-300'}`}
            >
              {/* //จุดที่เปลี่ยนฟังก์ชัน: เปลี่ยนไอคอนตัวนำหน้า จากเดิมกากบาท ✕ เป็นกล่อง Checkbox สีน้ำเงินตามตัวอย่างในรูปภาพ */}
              <span className={`w-3.5 h-3.5 border border-sky-500 rounded-xs flex items-center justify-center bg-[#0a1424] text-[10px] text-sky-400 font-bold ${activeSET.length > 0 ? 'border-sky-400' : 'border-gray-600'}`}>
                {activeSET.length === SET_TYPES.length && '✓'}
              </span>
              SET <ChevronDown size={11} />
            </button>
            {openDropdown === 'SET' && (
              <div className="absolute left-0 mt-2 w-56 bg-[#0f1b2c] border border-[#1e3452] rounded-xl shadow-2xl p-1.5 z-50">
                {SET_TYPES.map(type => {
                  const isChecked = activeSET.includes(type);
                  return (
                    <button 
                      key={type}
                      onClick={() => setActiveSET(prev => isChecked ? prev.filter(t => t !== type) : [...prev, type])}
                      className="w-full flex items-center justify-between text-left p-2 rounded-lg text-xs hover:bg-[#162942] transition text-gray-300"
                    >
                      <span className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${isChecked ? 'bg-sky-400' : 'bg-gray-600'}`}></span>
                        {type}
                      </span>
                      {isChecked && <Check size={12} className="text-sky-400" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* TFEX DROPDOWN */}
          <div className="relative">
            <button 
              onClick={() => setOpenDropdown(openDropdown === 'TFEX' ? null : 'TFEX')}
              className={`flex items-center gap-1.5 bg-[#122035] px-3 py-1.5 rounded-lg border text-xs font-semibold transition ${activeTFEX.length < TFEX_TYPES.length ? 'border-sky-500 text-sky-400' : 'border-[#1e3556] text-gray-300'}`}
            >
              {/* //จุดที่เปลี่ยนฟังก์ชัน: เปลี่ยนไอคอนตัวนำหน้าของช่อง TFEX เป็นกล่องสี่เหลี่ยมบลูบล็อกที่มีเครื่องหมายถูกในตัวแบบภาพตัวอย่างสตรีมมิ่ง */}
              <span className={`w-3.5 h-3.5 border border-sky-500 rounded-xs flex items-center justify-center bg-[#0a1424] text-[10px] text-sky-400 font-bold ${activeTFEX.length > 0 ? 'border-sky-400' : 'border-gray-600'}`}>
                {activeTFEX.length === TFEX_TYPES.length && '✓'}
              </span>
              TFEX <ChevronDown size={11} />
            </button>
            {openDropdown === 'TFEX' && (
              <div className="absolute left-0 mt-2 w-56 bg-[#0f1b2c] border border-[#1e3452] rounded-xl shadow-2xl p-1.5 max-h-72 overflow-y-auto custom-scroll z-50">
                <div className="px-2 py-1 text-[10px] font-bold text-sky-400/70 uppercase tracking-wider">Futures</div>
                {TFEX_TYPES.slice(0, 7).map(type => {
                  const isChecked = activeTFEX.includes(type);
                  return (
                    <button 
                      key={type}
                      onClick={() => setActiveTFEX(prev => isChecked ? prev.filter(t => t !== type) : [...prev, type])}
                      className="w-full flex items-center justify-between text-left p-2 rounded-lg text-xs hover:bg-[#162942] transition text-gray-300"
                    >
                      <span className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${isChecked ? 'bg-sky-400' : 'bg-gray-600'}`}></span>
                        {type}
                      </span>
                      {isChecked && <Check size={12} className="text-sky-400" />}
                    </button>
                  );
                })}
                <div className="px-2 py-1 mt-2 text-[10px] font-bold text-purple-400/70 uppercase tracking-wider border-t border-[#1e3452]/50">Options</div>
                <button 
                  onClick={() => setActiveTFEX(prev => prev.includes('ALL Counters Options') ? prev.filter(t => t !== 'ALL Counters Options') : [...prev, 'ALL Counters Options'])}
                  className="w-full flex items-center justify-between text-left p-2 rounded-lg text-xs hover:bg-[#162942] transition text-gray-300"
                >
                  <span className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${activeTFEX.includes('ALL Counters Options') ? 'bg-sky-400' : 'bg-gray-600'}`}></span>
                    ALL Counters Options
                  </span>
                  {activeTFEX.includes('ALL Counters Options') && <Check size={12} className="text-sky-400" />}
                </button>
              </div>
            )}
          </div>

          {/* SIDE DROPDOWN */}
          <div className="relative">
            <button 
              onClick={() => setOpenDropdown(openDropdown === 'SIDE' ? null : 'SIDE')}
              className="flex items-center gap-1.5 bg-[#122035] px-3 py-1.5 rounded-lg border border-[#1e3556] text-xs font-semibold text-gray-300 hover:bg-[#1a2d4a]"
            >
              Side ({activeSide}) <ChevronDown size={11} />
            </button>
            {openDropdown === 'SIDE' && (
              <div className="absolute left-0 mt-2 w-40 bg-[#0f1b2c] border border-[#1e3452] rounded-xl shadow-2xl p-1 z-50">
                {['Buy & Sell', 'Buy', 'Sell'].map((side) => (
                  <button 
                    key={side}
                    onClick={() => { setActiveSide(side); setOpenDropdown(null); }}
                    className={`w-full flex items-center gap-2 text-left p-2 rounded-lg text-xs transition ${activeSide === side ? 'bg-sky-600 text-white font-bold' : 'text-gray-300 hover:bg-[#162942]'}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${activeSide === side ? 'bg-white' : 'bg-sky-400'}`}></span>
                    {side}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-3">
          {/* LIVE LIGHT */}
          <button 
            onClick={() => setIsLive(!isLive)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
              isLive ? 'bg-[#0a231c] border-[#00e676]/40 text-[#00e676]' : 'bg-[#1c1212] border-red-500/30 text-red-400'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-[#00e676] animate-pulse' : 'bg-red-500'}`}></span>
            Live
          </button>

          {/* AUTO-SCROLL */}
          <div className="flex items-center bg-[#122035] border border-[#1e3556] rounded-xl px-3 py-1.5 gap-2.5">
            <span className="text-[11px] font-medium text-gray-300 font-mono">Auto - scroll {autoScroll ? 'ON' : 'OFF'}</span>
            <button 
              onClick={() => setAutoScroll(!autoScroll)}
              className={`w-8 h-4.5 rounded-full p-0.5 transition-colors duration-200 outline-none ${autoScroll ? 'bg-sky-500' : 'bg-gray-700'}`}
            >
              <div className={`bg-[#080d14] w-3.5 h-3.5 rounded-full shadow-md transform transition-transform duration-200 ${autoScroll ? 'translate-x-3.5' : 'translate-x-0'}`} />
            </button>
          </div>

          {/* COLUMNS SELECT */}
          <div className="relative">
            <button 
              onClick={() => setOpenDropdown(openDropdown === 'COLUMNS' ? null : 'COLUMNS')}
              className="bg-[#122035] border border-[#1e3556] px-3 py-1.5 rounded-lg text-xs text-gray-300 font-semibold flex items-center gap-2 hover:bg-[#1a2d4a]"
            >
              {columnsCount} Columns <ChevronDown size={11} />
            </button>
            {openDropdown === 'COLUMNS' && (
              <div className="absolute right-0 mt-2 w-28 bg-[#0f1b2c] border border-[#1e3452] rounded-xl shadow-2xl p-1 z-50">
                {[1, 2, 3].map(num => (
                  <button 
                    key={num} 
                    onClick={() => { setColumnsCount(num); setOpenDropdown(null); }}
                    className={`w-full p-2 text-center text-xs rounded-lg transition ${columnsCount === num ? 'bg-sky-600 text-white font-bold' : 'text-gray-300 hover:bg-[#162942]'}`}
                  >
                    {num} Column{num > 1 ? 's' : ''}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* //จุดที่เปลี่ยนฟังก์ชัน: สั่งการเรียกใช้ฟังก์ชันโหลดค่าหุ้นชุดราคาเรียลไทม์ล่าสุดตัวล่าสุดแทนคำสั่ง Clear ล้างเปล่าของเดิม */}
          <button 
            onClick={handleRefreshData}
            className="p-1.5 bg-[#122035] border border-[#1e3556] hover:bg-[#1a2d4a] text-gray-400 hover:text-white rounded-lg transition"
          >
            <RefreshCw size={13} />
          </button>
        </div>
      </div>

      {/* --- TICKER GRID BOARD --- */}
      <div 
        className="mt-3 grid gap-3.5 overflow-hidden" 
        style={{ gridTemplateColumns: `repeat(${columnsCount}, minmax(0, 1fr))`, height: 'calc(100vh - 150px)' }}
      >
        {distributedColumns.map((colItems, colIdx) => (
          <div 
            key={colIdx} 
            className="bg-[#0a111a] border border-[#152538] rounded-xl overflow-hidden flex flex-col h-full shadow-inner"
          >
            <div className="grid grid-cols-6 bg-[#0e1927] text-[11px] text-gray-400 font-bold py-2.5 px-3 border-b border-[#152538] uppercase tracking-wider sticky top-0 z-10">
              <div className="col-span-1 text-left">Symbol</div>
              <div className="text-center">Side</div>
              <div className="text-right col-span-1">Volume</div>
              <div className="text-right">Last</div>
              <div className="text-right">Change</div>
              <div className="text-right">%Chg</div>
            </div>

            <div 
              ref={el => { scrollContainerRefs.current[colIdx] = el; }}
              className="flex-1 overflow-y-auto custom-scroll p-1.5 space-y-1"
            >
              {colItems.map((row) => {
                const isFavorite = USER_FAVORITES.includes(row.symbol);
                const sideColor = row.side === 'B' ? 'text-sky-400' : 'text-pink-500';
                
                // //จุดที่เพิ่มเข้าไป: ปรับแต่งสถาปัตยกรรมการแบ่งคู่เฉดสีอย่างเด็ดขาด (Strict Green & Red System)
                // ตรวจสอบค่าการเปลี่ยนแปลงของหุ้นแต่ละตัวอย่างตรงไปตรงมา: บวกรุนแรง=เขียวสว่าง, ติดลบ=แดงสดชัดเจน, คงที่=ส้มเหลืองนิ่ง
                const trendColor = row.change > 0 ? 'text-[#00e676]' : row.change < 0 ? 'text-[#ff3355]' : 'text-[#ffaa00]';

                // //จุดที่เพิ่มเข้าไปใหม่ล่าสุด: คำนวณคลาสสีพื้นหลังและสีขอบแยกสตรีมสำหรับรายการโปรด (Favorites Border System)
                // เพื่อเช็กว่าหุ้นในดวงใจของเรากำลังมีสถานะตลาดเป็น "บวก" หรือ "ลบ" เพื่อฉีดสีเขียวเข้ม/แดงเข้มครอบกล่องทันทีโดยคงสไตล์เรียบหรูไว้
                let favBgStyle = 'bg-[#0d1622]/40 border-transparent hover:bg-[#122035]/60 hover:border-[#1e3452]';
                if (isFavorite) {
                  if (row.change > 0) {
                    favBgStyle = 'bg-[#0a1e16] border-[#00e676]/40 shadow-[0_0_8px_rgba(0,230,118,0.12)] animate-pulse-subtle';
                  } else if (row.change < 0) {
                    favBgStyle = 'bg-[#1c1014] border-[#ff3355]/40 shadow-[0_0_8px_rgba(255,51,85,0.12)] animate-pulse-subtle';
                  } else {
                    favBgStyle = 'bg-[#151b26] border-[#e6a100]/30 shadow-[0_0_8px_rgba(230,161,0,0.1)]';
                  }
                }

                return (
                  <div 
                    key={row.id} 
                    className={`grid grid-cols-6 text-[11px] py-1.5 px-2.5 rounded-lg font-mono transition-all duration-200 items-center border ${favBgStyle}`}
                  >
                    <div className="col-span-1 font-bold flex items-center gap-1 overflow-hidden truncate">
                      {isFavorite && <Star size={10} className="fill-[#e6a100] text-[#e6a100] flex-shrink-0" />}
                      {/* //จุดที่เพิ่มเข้าไป: กำหนดสีขาวนวลให้กับหุ้นตัวโปรดไม่ปนเปกับสีหุ้นทั่วไปเพื่อให้แยกโฟกัสได้ในพริบตา */}
                      <span className={isFavorite ? 'text-[#ffffff] font-extrabold text-[11.5px]' : 'text-gray-300'}>
                        {row.symbol}
                      </span>
                    </div>
                    <div className={`text-center font-extrabold ${sideColor}`}>{row.side}</div>
                    <div className="text-right text-purple-300 col-span-1 font-medium">{row.volume.toLocaleString()}</div>
                    <div className={`text-right font-bold ${trendColor}`}>{row.last.toFixed(2)}</div>
                    <div className={`text-right font-medium ${trendColor}`}>
                      {row.change > 0 ? `+${row.change.toFixed(2)}` : row.change.toFixed(2)}
                    </div>
                    <div className={`text-right font-bold ${trendColor}`}>
                      {row.pctChg > 0 ? `+${row.pctChg}%` : `${row.pctChg}%`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* --- FILTER POPUP MODAL --- */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center z-50 p-4 transition-all duration-300">
          <div className="bg-[#09111c] border border-[#1a2d44] rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col">
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1a2d44]">
              <h3 className="text-[14px] font-bold text-white tracking-wide">Filter Ticker</h3>
              <button onClick={() => setIsFilterModalOpen(false)} className="text-gray-400 hover:text-white transition">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4 text-xs text-gray-300 overflow-y-auto max-h-[70vh] custom-scroll">
              {/* SET */}
              <div className="bg-[#0e1825] border border-[#1a2d44] rounded-xl p-4 flex flex-col gap-2">
                <span className="font-bold text-white text-[13px] mb-1">SET</span>
                <label className="flex items-center gap-2.5 font-bold text-sky-400 border-b border-[#1a2d44] pb-2 mb-1 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={modalFilters.setAll}
                    onChange={(e) => setModalFilters({ ...modalFilters, setAll: e.target.checked, setTypes: e.target.checked ? SET_TYPES : [] })}
                    className="accent-sky-500 rounded-md w-3.5 h-3.5" 
                  />
                  Select ALL
                </label>
                <div className="space-y-2 max-h-56 overflow-y-auto custom-scroll pr-1">
                  {SET_TYPES.map(type => (
                    <label key={type} className="flex items-center gap-2.5 py-0.5 hover:text-white cursor-pointer transition">
                      <input 
                        type="checkbox" 
                        checked={modalFilters.setTypes.includes(type)}
                        onChange={() => {
                          const updated = modalFilters.setTypes.includes(type) ? modalFilters.setTypes.filter(t => t !== type) : [...modalFilters.setTypes, type];
                          setModalFilters({ ...modalFilters, setTypes: updated, setAll: updated.length === SET_TYPES.length });
                        }}
                        className="accent-sky-500 rounded-md w-3.5 h-3.5" 
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              {/* TFEX */}
              <div className="bg-[#0e1825] border border-[#1a2d44] rounded-xl p-4 flex flex-col gap-2">
                <span className="font-bold text-white text-[13px] mb-1">TFEX</span>
                <label className="flex items-center gap-2.5 font-bold text-sky-400 border-b border-[#1a2d44] pb-2 mb-1 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={modalFilters.tfexAll}
                    onChange={(e) => setModalFilters({ ...modalFilters, tfexAll: e.target.checked, tfexTypes: e.target.checked ? TFEX_TYPES : [] })}
                    className="accent-sky-500 rounded-md w-3.5 h-3.5" 
                  />
                  Select ALL
                </label>
                <div className="space-y-2 max-h-56 overflow-y-auto custom-scroll pr-1">
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mt-1">Futures</div>
                  {TFEX_TYPES.slice(0, 7).map(type => (
                    <label key={type} className="flex items-center gap-2.5 py-0.5 hover:text-white cursor-pointer transition">
                      <input 
                        type="checkbox" 
                        checked={modalFilters.tfexTypes.includes(type)}
                        onChange={() => {
                          const updated = modalFilters.tfexTypes.includes(type) ? modalFilters.tfexTypes.filter(t => t !== type) : [...modalFilters.tfexTypes, type];
                          setModalFilters({ ...modalFilters, tfexTypes: updated, tfexAll: updated.length === TFEX_TYPES.length });
                        }}
                        className="accent-sky-500 rounded-md w-3.5 h-3.5" 
                      />
                      {type}
                    </label>
                  ))}
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide mt-2 border-t border-[#1a2d44] pt-1">Options</div>
                  <label className="flex items-center gap-2.5 py-0.5 hover:text-white cursor-pointer transition">
                    <input 
                      type="checkbox" 
                      checked={modalFilters.tfexTypes.includes('ALL Counters Options')}
                      onChange={() => {
                        const updated = modalFilters.tfexTypes.includes('ALL Counters Options') ? modalFilters.tfexTypes.filter(t => t !== 'ALL Counters Options') : [...modalFilters.tfexTypes, 'ALL Counters Options'];
                        setModalFilters({ ...modalFilters, tfexTypes: updated, tfexAll: updated.length === TFEX_TYPES.length });
                      }}
                      className="accent-sky-500 rounded-md w-3.5 h-3.5" 
                    />
                    ALL Counters Options
                  </label>
                </div>
              </div>

              {/* FAVOURITE */}
              <div className="bg-[#0e1825] border border-[#1a2d44] rounded-xl p-4 flex flex-col gap-2">
                <span className="font-bold text-white text-[13px] mb-1">Favourite</span>
                <label className="flex items-center gap-2.5 font-bold text-sky-400 border-b border-[#1a2d44] pb-2 mb-1 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={modalFilters.favAll}
                    onChange={(e) => setModalFilters({ ...modalFilters, favAll: e.target.checked, favTypes: e.target.checked ? FAV_LIST : [] })}
                    className="accent-sky-500 rounded-md w-3.5 h-3.5" 
                  />
                  Select ALL
                </label>
                <div className="space-y-2 max-h-56 overflow-y-auto custom-scroll pr-1">
                  {FAV_LIST.map(fav => (
                    <label key={fav} className="flex items-center gap-2.5 py-0.5 hover:text-white cursor-pointer transition">
                      <input 
                        type="checkbox" 
                        checked={modalFilters.favTypes.includes(fav)}
                        onChange={() => {
                          const updated = modalFilters.favTypes.includes(fav) ? modalFilters.favTypes.filter(f => f !== fav) : [...modalFilters.favTypes, fav];
                          setModalFilters({ ...modalFilters, favTypes: updated, favAll: updated.length === FAV_LIST.length });
                        }}
                        className="accent-sky-500 rounded-md w-3.5 h-3.5" 
                      />
                      {fav}
                    </label>
                  ))}
                </div>
              </div>

              {/* ADVANCED VALUES */}
              <div className="flex flex-col gap-3">
                <div className="bg-[#0e1825] border border-[#1a2d44] rounded-xl p-3 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-200">Filter by Value</span>
                    <button 
                      onClick={() => setModalFilters({ ...modalFilters, filterValueOn1: !modalFilters.filterValueOn1 })}
                      className={`w-7 h-4 rounded-full p-0.5 transition-colors outline-none ${modalFilters.filterValueOn1 ? 'bg-sky-500' : 'bg-gray-700'}`}
                    >
                      <div className={`bg-[#080d14] w-3 h-3 rounded-full transform transition-transform ${modalFilters.filterValueOn1 ? 'translate-x-3' : 'translate-x-0'}`} />
                    </button>
                  </div>
                  <div className="flex gap-1.5 mt-0.5">
                    <select 
                      disabled={!modalFilters.filterValueOn1}
                      value={modalFilters.filterValueCondition1}
                      onChange={(e) => setModalFilters({ ...modalFilters, filterValueCondition1: e.target.value })}
                      className="bg-[#080d14] border border-[#1a2d44] text-white p-1 rounded-lg outline-none text-xs font-bold disabled:opacity-30"
                    >
                      <option>&gt;=</option>
                      <option>&lt;=</option>
                    </select>
                    <input 
                      type="text" 
                      placeholder="Value..."
                      disabled={!modalFilters.filterValueOn1}
                      value={modalFilters.filterValue1}
                      onChange={(e) => setModalFilters({ ...modalFilters, filterValue1: e.target.value })}
                      className="w-full bg-[#080d14] border border-[#1a2d44] text-white px-2.5 py-1 rounded-lg outline-none font-mono disabled:opacity-30"
                    />
                  </div>
                </div>

                <div className="bg-[#0e1825] border border-[#1a2d44] rounded-xl p-3 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-200">Filter by Value</span>
                    <button 
                      onClick={() => setModalFilters({ ...modalFilters, filterValueOn2: !modalFilters.filterValueOn2 })}
                      className={`w-7 h-4 rounded-full p-0.5 transition-colors outline-none ${modalFilters.filterValueOn2 ? 'bg-sky-500' : 'bg-gray-700'}`}
                    >
                      <div className={`bg-[#080d14] w-3 h-3 rounded-full transform transition-transform ${modalFilters.filterValueOn2 ? 'translate-x-3' : 'translate-x-0'}`} />
                    </button>
                  </div>
                  <div className="flex gap-1.5 mt-0.5">
                    <select 
                      disabled={!modalFilters.filterValueOn2}
                      value={modalFilters.filterValueCondition2}
                      onChange={(e) => setModalFilters({ ...modalFilters, filterValueCondition2: e.target.value })}
                      className="bg-[#080d14] border border-[#1a2d44] text-white p-1 rounded-lg outline-none text-xs font-bold disabled:opacity-30"
                    >
                      <option>&gt;=</option>
                      <option>&lt;=</option>
                    </select>
                    <input 
                      type="text" 
                      placeholder="Value..."
                      disabled={!modalFilters.filterValueOn2}
                      value={modalFilters.filterValue2}
                      onChange={(e) => setModalFilters({ ...modalFilters, filterValue2: e.target.value })}
                      className="w-full bg-[#080d14] border border-[#1a2d44] text-white px-2.5 py-1 rounded-lg outline-none font-mono disabled:opacity-30"
                    />
                  </div>
                </div>

                <div className="bg-[#0e1825] border border-[#1a2d44] rounded-xl p-3 flex flex-col gap-1.5">
                  <span className="font-bold text-gray-200">Order Side</span>
                  <select 
                    value={modalFilters.orderSide}
                    onChange={(e) => setModalFilters({ ...modalFilters, orderSide: e.target.value })}
                    className="w-full bg-[#080d14] border border-[#1a2d44] text-white p-2 rounded-lg outline-none cursor-pointer font-semibold"
                  >
                    <option>Buy & Sell</option>
                    <option>Buy</option>
                    <option>Sell</option>
                  </select>
                </div>

                <div className="bg-[#0e1825] border border-[#1a2d44] rounded-xl p-3 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-200">Sum Mode</span>
                    <button 
                      onClick={() => setModalFilters({ ...modalFilters, sumMode: !modalFilters.sumMode })}
                      className={`w-7 h-4 rounded-full p-0.5 transition-colors outline-none ${modalFilters.sumMode ? 'bg-sky-500' : 'bg-gray-700'}`}
                    >
                      <div className={`bg-[#080d14] w-3 h-3 rounded-full transform transition-transform ${modalFilters.sumMode ? 'translate-x-3' : 'translate-x-0'}`} />
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-500 leading-relaxed mt-1">
                    Volume of Tickers with the same symbol, side and price will be summed.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#0b1420] px-6 py-4 flex items-center justify-between border-t border-[#1a2d44]">
              <div className="flex gap-2">
                <button 
                  onClick={() => setModalFilters({
                    setAll: true, setTypes: SET_TYPES, tfexAll: true, tfexTypes: TFEX_TYPES, favAll: true, favTypes: FAV_LIST,
                    filterValueOn1: false, filterValueCondition1: '>=', filterValue1: '', filterValueOn2: false, filterValueCondition2: '>=', filterValue2: '', orderSide: 'Buy & Sell', sumMode: false
                  })}
                  className="px-3.5 py-2 bg-[#122035] border border-[#1f3556] rounded-lg font-bold text-white transition text-xs flex items-center gap-1"
                >
                  <RotateCw size={12} /> Reset
                </button>
                <button 
                  onClick={() => setModalFilters({ ...modalFilters, setTypes: [], tfexTypes: [], favTypes: [], setAll: false, tfexAll: false, favAll: false })}
                  className="px-3.5 py-2 bg-[#122035] border border-[#1f3556] text-gray-300 rounded-lg font-bold transition text-xs"
                >
                  Clear
                </button>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsFilterModalOpen(false)} 
                  className="px-4 py-2 bg-[#122035] border border-[#1f3556] text-white rounded-lg font-semibold transition text-xs"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveChanges}
                  className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-extrabold rounded-lg shadow-lg transition text-xs"
                >
                  Save
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Internal Custom Style Track */}
      <style>{`
        .custom-scroll::-webkit-scrollbar { width: 5px; height: 5px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #162942; border-radius: 10px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: #38bdf8; }
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.88; }
        }
        .animate-pulse-subtle { animation: pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
      `}</style>
    </div>
  );
}

export default TickerTerminal;