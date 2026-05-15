import React, { useState } from 'react';
import { ChevronDown, Plus, Minus, Calendar, Bell, PlusCircle } from 'lucide-react';

const OrderPanel = ({ selectedStock }) => {
  const tabs = ['Place Order', 'Stop Order', 'Trailing Order', 'Bracket Order', 'DCA', 'Multi Orders', 'History'];
  const [activeTab, setActiveTab] = useState('Place Order');
  const [side, setSide] = useState('Buy'); // 'Buy' or 'Sell'
  
  const [price, setPrice] = useState(102.5);
  const [volume, setVolume] = useState(1000);
  const [orderType, setOrderType] = useState('Limit');
  const [timeInForce, setTimeInForce] = useState('Day');
  
  const [showBell, setShowBell] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [conditionsCount, setConditionsCount] = useState(0);

  // Sync initial stock price to input? The instructions didn't explicitly ask for this, but asked to use selectedStock if needed.
  // Formula calculation based on current input state
  const totalPrice = price * volume;

  const handlePriceDec = () => setPrice(prev => Math.max(0, prev - 0.5));
  const handlePriceInc = () => setPrice(prev => prev + 0.5);
  const handleVolDec = () => setVolume(prev => Math.max(100, prev - 100));
  const handleVolInc = () => setVolume(prev => prev + 100);

  return (
    <div className="flex flex-col bg-[#090e19] font-sans border border-[#193254] rounded-t-xl select-none relative z-10 w-full overflow-hidden min-h-[300px]">
      
      {/* Tabs */}
      <div className="flex overflow-x-auto no-scrollbar border-b border-[#193254]">
        {tabs.map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-3 text-[14px] whitespace-nowrap transition-colors ${
              activeTab === tab 
              ? 'bg-[#1479dd] text-white font-medium' 
              : 'bg-transparent text-[#a9b2bf] hover:text-[#ffffff] hover:bg-[#0e2c49]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-[#101c2c] flex flex-col p-6 w-full flex-1">
        {activeTab !== 'Place Order' ? (
          <div className="flex-1 flex items-center justify-center text-[#a9b2bf] text-lg py-12">
            Selected: {activeTab} (Coming soon...)
          </div>
        ) : (
          <>
            {/* Main Content Row */}
            <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between w-full">
              
              {/* Order Details Set */}
              <div className="flex flex-row flex-wrap items-end gap-x-6 gap-y-4 w-full xl:w-auto">
                 
                 {/* Buy / Sell Toggles  */}
                 <div className="flex bg-[#131722] rounded-[4px] p-1 border border-[#193254]">
                   <button 
                     onClick={() => setSide('Buy')}
                     className={`px-[22px] py-[6px] text-[13px] rounded-[3px] font-bold transition-all ${side === 'Buy' ? 'bg-[#00A359] text-white shadow-[0_0_10px_rgba(0,163,89,0.3)]' : 'bg-transparent text-[#a9b2bf] hover:text-[#ffffff]'}`}
                   >Buy</button>
                   <button 
                     onClick={() => setSide('Sell')}
                     className={`px-[22px] py-[6px] text-[13px] rounded-[3px] font-bold transition-all ml-1 ${side === 'Sell' ? 'bg-[#f6465d] text-white shadow-[0_0_10px_rgba(255,0,0,0.3)]' : 'bg-white text-black'}`}
                   >Sell</button>
                 </div>

                 {/* Order Type */}
                 <div className="flex flex-col gap-1">
                   <label className="text-[12px] text-[#a9b2bf] font-sans font-medium">Order Type</label>
                   <div className="relative">
                     <select 
                       value={orderType}
                       onChange={(e) => setOrderType(e.target.value)}
                       className="w-[125px] bg-[#090e19] border border-[#193254] text-[#ffffff] text-[13px] rounded-[4px] px-3 py-[8px] appearance-none outline-none hover:border-[#1479dd] transition-colors cursor-pointer"
                     >
                       <option>Limit</option>
                       <option>Market</option>
                       <option>ATO</option>
                       <option>ATC</option>
                     </select>
                     <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a9b2bf] pointer-events-none" />
                   </div>
                 </div>

                 {/* Price */}
                 <div className="flex flex-col gap-1">
                   <label className="text-[12px] text-[#a9b2bf] font-sans font-medium">Price (THB)</label>
                   <div className="flex bg-[#090e19] border border-[#193254] rounded-[4px] overflow-hidden hover:border-[#1479dd] transition-colors focus-within:border-[#1479dd]">
                     <input 
                       type="number" 
                       value={price}
                       onChange={(e) => setPrice(Number(e.target.value))}
                       className="w-[105px] bg-transparent text-[#ffffff] text-[13px] px-3 py-[8px] outline-none font-sans font-medium appearance-none"
                       style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
                     />
                     <div className="flex flex-col border-l border-[#193254] bg-[#101c2c]">
                       <button onClick={handlePriceInc} className="px-[6px] py-[2px] border-b border-[#193254] hover:bg-[#193254] text-[#a9b2bf] hover:text-[#ffffff] transition-colors"><Plus size={10} strokeWidth={3} /></button>
                       <button onClick={handlePriceDec} className="px-[6px] py-[2px] hover:bg-[#193254] text-[#a9b2bf] hover:text-[#ffffff] transition-colors"><Minus size={10} strokeWidth={3} /></button>
                     </div>
                   </div>
                 </div>

                 {/* Volume */}
                 <div className="flex flex-col gap-1">
                   <label className="text-[12px] text-[#a9b2bf] font-sans font-medium">Volume</label>
                   <div className="flex bg-[#090e19] border border-[#193254] rounded-[4px] overflow-hidden hover:border-[#1479dd] transition-colors focus-within:border-[#1479dd]">
                     <input 
                       type="number" 
                       value={volume}
                       onChange={(e) => setVolume(Number(e.target.value))}
                       className="w-[130px] bg-transparent text-[#ffffff] text-[13px] px-3 py-[8px] outline-none font-sans font-medium"
                       style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
                     />
                     <div className="flex flex-col border-l border-[#193254] bg-[#101c2c]">
                       <button onClick={handleVolInc} className="px-[6px] py-[2px] border-b border-[#193254] hover:bg-[#193254] text-[#a9b2bf] hover:text-[#ffffff] transition-colors"><Plus size={10} strokeWidth={3} /></button>
                       <button onClick={handleVolDec} className="px-[6px] py-[2px] hover:bg-[#193254] text-[#a9b2bf] hover:text-[#ffffff] transition-colors"><Minus size={10} strokeWidth={3} /></button>
                     </div>
                     <button className="px-3 border-l border-[#193254] bg-[#101c2c] hover:bg-[#193254] text-[#a9b2bf] hover:text-[#ffffff] transition-colors flex items-center justify-center">
                       <Calendar size={14} />
                     </button>
                   </div>
                 </div>

                 {/* Time in Force */}
                 <div className="flex flex-col gap-1">
                   <label className="text-[12px] text-[#a9b2bf] font-sans font-medium">Time in Force</label>
                   <div className="relative">
                     <select 
                       value={timeInForce}
                       onChange={(e) => setTimeInForce(e.target.value)}
                       className="w-[110px] bg-[#090e19] border border-[#193254] text-[#ffffff] text-[13px] rounded-[4px] px-3 py-[8px] appearance-none outline-none hover:border-[#1479dd] transition-colors cursor-pointer"
                     >
                       <option>Day</option>
                       <option>FOK</option>
                       <option>IOC</option>
                     </select>
                     <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a9b2bf] pointer-events-none" />
                   </div>
                 </div>
                 
                 {/* Condition & Notification */}
                 <div className="flex flex-col gap-1">
                   <div className="flex items-center gap-[6px]">
                     <label className="text-[12px] text-[#a9b2bf] font-sans font-medium">Condition</label>
                     <div className="bg-[#1479dd] text-white rounded-full w-[14px] h-[14px] flex items-center justify-center font-bold text-[10px] cursor-pointer hover:bg-[#4b7cff]">i</div>
                   </div>
                   <div className="flex items-center mt-2.5 ml-2 cursor-pointer group" onClick={() => setShowBell(!showBell)}>
                      <Bell size={18} className={`transition-colors ${showBell ? 'text-[#23df68]' : 'text-[#a9b2bf] group-hover:text-[#ffffff]'}`} />
                   </div>
                 </div>

              </div>
            </div>

            {/* Sub-conditions Rows dynamically added */}
            {Array.from({ length: conditionsCount }).map((_, i) => (
              <div key={i} className="flex items-center mt-4">
                <select className="w-[150px] bg-[#090e19] border border-[#193254] text-[#ffffff] text-[13px] rounded-[4px] px-3 py-[8px] outline-none">
                  <option>Select Condition</option>
                  <option>Price &ge;</option>
                  <option>Price &le;</option>
                </select>
              </div>
            ))}

            {/* Bottom Row: Values & Actions */}
            <div className="flex flex-col lg:flex-row items-center justify-between mt-8 md:mt-10 mb-2 gap-4 w-full">
              
              {/* Values Row */}
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <div className="border border-[#193254] bg-[#090e19] rounded-[4px] px-4 py-[10px] flex items-center justify-between sm:w-[280px]">
                   <span className="text-[12px] text-[#a9b2bf] font-sans font-medium">Available Balance</span>
                   <span className="text-[14px] text-[#ffffff] font-sans tracking-tight font-medium">1,245,678.00 THB</span>
                </div>
                <div className="border border-[#193254] bg-[#090e19] rounded-[4px] px-4 py-[10px] flex items-center justify-between sm:w-[350px]">
                   <span className="text-[12px] text-[#a9b2bf] font-sans font-medium">Volume x Price</span>
                   <span className="text-[14px] text-[#1479dd] font-sans tracking-tight font-medium">
                     = {volume.toLocaleString()} x {price.toFixed(2)} = {totalPrice.toLocaleString(undefined, {minimumFractionDigits: 2})} THB
                   </span>
                </div>
              </div>

              {/* Buttons Row */}
              <div className="flex flex-row items-center gap-4 w-full lg:w-auto justify-end">
                <button 
                  onClick={() => setShowConfirmModal(true)}
                  className={`${side === 'Buy' ? 'bg-[#00A359] hover:bg-[#008f4d]' : 'bg-[#f6465d] hover:bg-[#cc0000]'} text-white font-bold text-[15px] px-12 py-[11px] rounded-[4px] outline-none transition-all uppercase tracking-wide shadow-lg`}
                >
                  {side} {selectedStock?.symbol || 'DELTA'}
                </button>

                <button 
                  onClick={() => setConditionsCount(prev => prev + 1)}
                  className="border border-[#1479dd] text-[#1479dd] hover:bg-[#1479dd]/10 font-bold text-[13px] px-5 py-[11px] rounded-[4px] transition-colors flex items-center gap-[6px]"
                >
                   <PlusCircle size={14} /> Add Condition
                </button>
              </div>

            </div>
          </>
        )}
      </div>

      {/* Confirmation Modal Placeholder */}
      {showConfirmModal && (
        <div className="absolute inset-0 bg-[#090e19]/80 flex flex-col items-center justify-center z-50 rounded-t-xl backdrop-blur-sm">
           <div className="bg-[#101c2c] border border-[#193254] p-8 rounded-[8px] text-center max-w-sm">
              <h3 className="text-white text-xl font-bold mb-4">Confirm Order</h3>
              <p className="text-[#a9b2bf] mb-6">Are you sure you want to {side.toUpperCase()} {volume.toLocaleString()} {selectedStock?.symbol || 'DELTA'} at {price.toFixed(2)} THB? The total is {totalPrice.toLocaleString()} THB.</p>
              <div className="flex justify-center gap-4">
                 <button onClick={() => setShowConfirmModal(false)} className="px-6 py-2 border border-[#193254] text-[#a9b2bf] hover:text-white transition rounded-[4px]">Cancel</button>
                 <button onClick={() => { setShowConfirmModal(false); alert('Order Submitted successfully!'); }} className={`px-6 py-2 text-white rounded-[4px] ${side === 'Buy' ? 'bg-[#23df68]' : 'bg-[#f6465d]'}`}>Confirm {side}</button>
              </div>
           </div>
        </div>
      )}

    </div>
  );
};

export default OrderPanel;
