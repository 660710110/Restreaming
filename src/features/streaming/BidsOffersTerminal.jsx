// src/features/streaming/BidsOffersTerminal.jsx
import React, { useState } from 'react';
import { Trash2, ChevronDown } from 'lucide-react';

// 🆕 เปลี่ยนชื่อคอมโพเนนต์ใหม่เป็น BidsOffersTerminal เพื่อไม่ให้ซ้ำกับระบบอื่น
// 🆕 เพิ่มเติมจุดที่ 1: เพิ่มพารามิเตอร์วัตถุรับ Props เข้ามาในวงเล็บฟังก์ชันคือ ({ onGoToMarket }) เพื่อรับฟังก์ชันเปลี่ยนหน้ามาจากไฟล์แม่ (StreamingPage.jsx)
const BidsOffersTerminal = ({ onGoToMarket }) => {
  // 🆕 State สำหรับควบคุมการสลับแท็บเมนูด้านบน (เปลี่ยนหน้าได้จริง)
  const [activeTab, setActiveTab] = useState('Custom List');
  
  // 🆕 State สำหรับควบคุม Dropdown ฝั่งขวาบน
  const [bidsDropdown, setBidsDropdown] = useState('3 Bids');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 🆕 เพิ่มเติมจุดที่ 2: สร้าง State สำหรับจัดการจำลองปุ่มเปลี่ยนสถานะ Bids / Tickers ภายในแต่ละการ์ดแยกกันทั้ง 9 ใบ เพื่อให้กดคลิกสลับโหมดเรียลไทม์ได้จริงทุกใบพัด
  const [cardModes, setCardModes] = useState({
    0: 'Bids', 1: 'Bids', 2: 'Bids', 3: 'Bids', 4: 'Bids', 5: 'Bids', 6: 'Bids', 7: 'Bids', 8: 'Bids'
  });
  const [cardDropdownOpen, setCardDropdownOpen] = useState({});

  // 🆕 เพิ่มเติมจุดที่ 3: จำลองชุดข้อมูลจำเพาะเจาะจง 9 หุ้นถอดดีไซน์ ตัวเลข วอลลุ่ม และสีสัน (เขียว/แดง/เหลือง) ออกมาจากภาพตัวอย่างกระดานสตรีมมิ่ง 100%
  // 🆕 ปรับปรุงจุดที่ 3.1: เปลี่ยนจากค่าคงที่ (const) มาเป็น State `stocksList` เพื่อให้ระบบ React สามารถประมวลผลตัดหรือลบรายชื่อหุ้นออกจากหน้าจอได้จริงแบบเรียลไทม์ 100%
  const [stocksList, setStocksList] = useState([
    { id: 0, name: 'A5-W4', price: '', change: '', high: 'High', low: 'Low', isUp: null, items: [{ v1: '0', b: '0.00', o: '0.01', v2: '7,497,900', c: 'text-yellow-500' }, { v1: '0', b: '0.00', o: '0.02', v2: '6,149,800', c: 'text-emerald-500' }, { v1: '0', b: '0.00', o: '0.03', v2: '13,362,000', c: 'text-emerald-500' }] },
    { id: 1, name: 'S11-F', price: '', change: '', high: 'High', low: 'Low', isUp: null, items: [{ v1: '0', b: '0.00', o: '0.00', v2: '0', c: 'text-yellow-500' }, { v1: '0', b: '0.00', o: '0.00', v2: '0', c: 'text-yellow-500' }, { v1: '0', b: '0.00', o: '0.00', v2: '0', c: 'text-yellow-500' }] },
    { id: 2, name: 'HAIERS19', price: '8.55', change: '0.00(-0.00%)', high: '8.60', low: '8.55', isUp: 'yellow', items: [{ v1: '252', b: '8.55', o: '8.60', v2: '15,000', c: 'text-emerald-500' }, { v1: '34,863', b: '8.50', o: '6.65', v2: '22,587', c: 'text-red-500' }, { v1: '31,830', b: '8.45', o: '8.70', v2: '22,981', c: 'text-red-500' }] },
    { id: 3, name: 'CATHAY41C26...', price: '0.23', change: '-0.23(-8.00%)', high: '0.23', low: '0.23', isUp: 'red', items: [{ v1: '0', b: '0.00', o: '5.00', v2: '5,000', c: 'text-emerald-500' }, { v1: '0', b: '0.00', o: '0.02', v2: '0', c: 'text-yellow-500' }, { v1: '0', b: '0.00', o: '0.03', v2: '0', c: 'text-yellow-500' }] },
    { id: 4, name: 'PACO-F', price: '', change: '', high: 'High', low: 'Low', isUp: null, items: [{ v1: '0', b: '0.00', o: '0.00', v2: '0', c: 'text-yellow-500' }, { v1: '0', b: '0.00', o: '0.00', v2: '0', c: 'text-yellow-500' }, { v1: '0', b: '0.00', o: '0.00', v2: '0', c: 'text-yellow-500' }] },
    { id: 5, name: 'GOM26', price: '4,515.9', change: '-55.4(-1.21%)', high: '4,577.0', low: '4,481.1', isUp: 'red', items: [{ v1: '1', b: '4,516.2', o: '4,517.1', v2: '4', c: 'text-red-500' }, { v1: '1', b: '4,516.1', o: '4,518.0', v2: '7', c: 'text-red-500' }, { v1: '5', b: '4,515.5', o: '4,518.3', v2: '7', c: 'text-red-500' }] },
    { id: 6, name: 'BANPU', price: '5.80', change: '+0.15(+2.65%)', high: '5.80', low: '5.65', isUp: 'emerald', items: [{ v1: '3,427,300', b: '5.75', o: '5.80', v2: '3,235,700', c: 'text-emerald-500' }, { v1: '6,898,800', b: '5.70', o: '5.85', v2: '6,271,900', c: 'text-emerald-500' }, { v1: '5,930,700', b: '5.65', o: '5.90', v2: '4,291,700', c: 'text-emerald-500' }] },
    { id: 7, name: 'PTT', price: '37.00', change: '+0.50(+1.37%)', high: '37.00', low: '36.25', isUp: 'emerald', items: [{ v1: '11,361,700', b: '36.75', o: '37.00', v2: '17,425,900', c: 'text-emerald-500' }, { v1: '15,267,600', b: '36.50', o: '37.25', v2: '16,303,200', c: 'text-yellow-500' }, { v1: '14,910,500', b: '36.25', o: '37.50', v2: '13,411,800', c: 'text-red-500' }] },
    { id: 8, name: 'HANA', price: '34.50', change: '+5.00(+16.95%)', high: '35.50', low: '30.50', isUp: 'emerald', items: [{ v1: '28,000', b: '34.50', o: '34.75', v2: '2,367,500', c: 'text-emerald-500' }, { v1: '809,200', b: '34.25', o: '35.00', v2: '2,700,700', c: 'text-emerald-500' }, { v1: '722,800', b: '34.00', o: '35.25', v2: '1,922,500', c: 'text-yellow-500' }] }
  ]);

  // 🆕 เพิ่มเติมจุดที่ 6: สร้างกลุ่ม State สำหรับควบคุมระบบ Delete Mode และการจัดเก็บข้อมูลการกดเลือก Checkbox
  const [isEditMode, setIsEditMode] = useState(false); // ควบคุมว่ากำลังกดเปิดโหมดถังขยะเพื่อเลือกรายการอยู่หรือไม่
  const [selectedStockIds, setSelectedStockIds] = useState([]); // จัดเก็บ ID ของหุ้นที่ถูกติ๊ก Checkbox เลือกไว้ลบ
  const [isModalOpen, setIsModalOpen] = useState(false); // ควบคุมสถานะการเปิด/ปิดหน้าต่างป๊อปอัพยืนยันการลบสีแดงกลางหน้าจอ

  // รายชื่อปุ่มแท็บทั้งหมดที่ถอดมาจากในรูปภาพเป๊ะๆ
  const tabs = [
    'Custom List', 'Favourite 1', 'Favourite 2', 'Favourite 3', 'Favourite 4',
    'Favourite 5', 'Favourite 6', 'Favourite 7', 'Favourite 8', 'Favourite 9',
    'Favourite 10', 'My Portfolios'
  ];

  // ตัวเลือกสำหรับ Dropdown ด้านขวาขวา
  const bidsOptions = ['1 Bid', '3 Bids', '5 Bids', '10 Bids'];

  // 🆕 เพิ่มเติมจุดที่ 7: ฟังก์ชันสำหรับจัดการเปิดโหมดเลือกรายการ หรือเมื่อคลิกพื้นที่ด้านนอกเพื่อปิดโหมดเอดิทแก้ไข
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setSelectedStockIds([]); // ล้างรายการที่เคยเลือกไว้ทั้งหมดเมื่อสลับโหมดเข้าออก
  };

  // 🆕 เพิ่มเติมจุดที่ 8: ฟังก์ชันจัดการบันทึกและถอดสถานะ Checkbox หุ้นรายใบเมื่อผู้ใช้คลิกเลือกรายการ
  const handleSelectStock = (id) => {
    if (selectedStockIds.includes(id)) {
      setSelectedStockIds(selectedStockIds.filter(stockId => stockId !== id));
    } else {
      setSelectedStockIds([...selectedStockIds, id]);
    }
  };

  // 🆕 เพิ่มเติมจุดที่ 9: ฟังก์ชันสำหรับการประมวลผลลบรายการหุ้นที่ถูกเลือกออกจากอาเรย์สเตทหลักจริง พร้อมปิดหน้าต่างทั้งหมดลงอย่างสมบูรณ์
  const handleConfirmRemove = () => {
    setStocksList(stocksList.filter(stock => !selectedStockIds.includes(stock.id)));
    setSelectedStockIds([]);
    setIsModalOpen(false);
    setIsEditMode(false);
  };

  return (
    // 🆕 ปรับปรุงจุดที่ 10: ผูกเหตุการณ์ onClick เข้ากับพื้นหลังหลักของหน้าต่าง เพื่อให้เมื่อผู้ใช้กดยกเลิกโหมดเอดิทโดยการกดพื้นที่ว่างส่วนไหนของหน้าจอก็สามารถกดหลุดออกจากโหมดแก้ไขได้ทันทีตามสั่ง
    <div 
      className="w-full bg-[#090e19] text-gray-300 pt-0 pb-4 px-1 -mt-[12px] lg:-mt-[16px] font-sans min-h-[500px] flex flex-col select-none antialiased relative"
      onClick={() => { if (isEditMode) setIsEditMode(false); }}
    >
      
      {/* ================== TOP CONTROL BAR ================== */}
      <div className="w-full flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-4 border-b border-gray-800/40" onClick={(e) => e.stopPropagation()}>
        
        {/* กลุ่มปุ่มฝั่งซ้าย: สลับแท็บ Favourite (ใช้งานกดเปลี่ยนหน้าได้จริง) */}
        <div className="flex flex-wrap items-center gap-[3px]">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 text-[11px] md:text-[12px] font-normal rounded-[3px] border transition-all duration-150 whitespace-nowrap
                  ${isActive 
                    ? 'bg-[#162a45] text-blue-400 border-blue-500/80 shadow-[0_0_8px_rgba(59,130,246,0.2)]' 
                    : 'bg-[#0f172a]/40 text-gray-400 border-gray-800 hover:text-gray-200 hover:bg-[#0f172a]/80'
                  }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* กลุ่มปุ่มฝั่งขวา: ถังขยะ + Dropdown เลือกจำนวน Bids */}
        <div className="flex items-center gap-2 self-end xl:self-auto">
          
          {/* ปุ่มถังขยะล้างค่า */}
          {/* 🆕 ปรับปรุงจุดที่ 11: ดัดแปลงเงื่อนไขปุ่มถังขยะเดิมให้แปลงร่างสลับกลายเป็นปุ่มสีแดงระบุสถานะจำนวนยอดคงเหลือตามภาพแรกสุดเป๊ะๆ ("X Selected" / "Delete") เมื่อเปิดใช้งานโหมดลบ */}
          {isEditMode ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (selectedStockIds.length > 0) {
                  setIsModalOpen(true); // เปิดป๊อปอัพยืนยันการลบสีแดงเมื่อมียอดเลือกมากกว่า 0 รายการ
                } else {
                  setIsEditMode(false); // หากไม่มีการเลือกและกดซ้ำ จะเป็นการยกเลิกโหมดเอดิท
                }
              }}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#991b1b] text-white border border-[#b91c1c] rounded-[4px] text-[12px] font-medium hover:bg-red-700 transition-colors shadow-lg"
            >
              <Trash2 size={13} className="text-white fill-white" />
              <span>{selectedStockIds.length} Selected</span>
            </button>
          ) : (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                toggleEditMode(); // สลับไปเปิดโหมดติ๊กเลือก Checkbox ทันทีเมื่อกดไอคอนถังขยะปกติ
              }}
              className="p-2 bg-[#0f172a]/60 text-gray-400 border border-gray-800 rounded-[4px] hover:text-red-400 hover:bg-red-950/20 hover:border-red-900/50 transition-colors"
              title="Clear List"
            >
              <Trash2 size={15} />
            </button>
          )}

          {/* ปุ่ม Dropdown 3 Bids (เปิด-ปิด และสลับค่าได้จริง) */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between gap-2 px-3 py-1.5 bg-[#0f172a]/60 border border-gray-800 rounded-[4px] text-[12px] text-gray-300 hover:border-gray-700 min-w-[85px] transition-colors"
            >
              <span>{bidsDropdown}</span>
              <ChevronDown size={14} className={`text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-1 w-full bg-[#0f172a] border border-gray-800 rounded-[4px] shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
                {bidsOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setBidsDropdown(option);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-[12px] text-gray-400 hover:bg-[#162a45] hover:text-white transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ================== DYNAMIC CONTENT AREA ================== */}
      {/* 🆕 เพิ่มเติมจุดที่ 4: ทำการฝังเงื่อนไข (Conditional Rendering) เพื่อให้เมื่อผู้ใช้เลือกกดแท็บ "Favourite 1" ระบบจะเปิดแผงหน้าจอ Grid กระดานหุ้นจำลอง 9 ใบเสมือนจริงขึ้นมาทันที ส่วนแท็บอื่นๆ จะยังคงรักษาบล็อกแจ้งเตือนเดิมไว้ตามคำสั่งห้ามแก้ไขโครงสร้างครับ */}
      {activeTab === 'Favourite 1' ? (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-2" onClick={(e) => e.stopPropagation()}>
          {stocksList.map((stock, idx) => {
            // ค้นหาสีของหัวข้อชื่อหุ้นและสถิติหลักตามความผันผวน
            const headColor = stock.isUp === 'emerald' ? 'text-emerald-500' : stock.isUp === 'red' ? 'text-red-500' : stock.isUp === 'yellow' ? 'text-yellow-500' : 'text-white';
            const isChecked = selectedStockIds.includes(stock.id);

            return (
              <div key={stock.id} className={`bg-[#090e19] border rounded-[6px] p-3 flex flex-col font-sans transition-all position-relative ${isEditMode ? 'border-red-900/40 bg-[#0c0f17]' : 'border-gray-800/80 hover:border-gray-700'}`}>
                
                {/* แผงหัวกระดานข้อมูลหุ้นรายตัว */}
                <div className="flex justify-between items-start mb-2">
                  {/* 🆕 เพิ่มเติมจุดที่ 12: เพิ่มระบบ Checkbox จำลองขนาดและโทนสีน้ำเงินครามตรงตามรูปภาพโมเดลใบที่สองแบบเด็ดขาด โดยจะเปิดเผยตัวตนออกมาเมื่อสเตท `isEditMode` ทำงานเท่านั้น */}
                  <div className="flex items-center gap-3">
                    {isEditMode && (
                      <input 
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleSelectStock(stock.id)}
                        className="w-[16px] h-[16px] accent-blue-600 rounded-[3px] border-gray-700 bg-slate-900 cursor-pointer"
                      />
                    )}
                    <div>
                      <h3 className={`text-[15px] font-semibold tracking-wide ${headColor}`}>{stock.name}</h3>
                      {stock.price && (
                        <div className="flex items-baseline gap-2 mt-0.5">
                          <span className={`text-[14px] font-bold ${headColor}`}>{stock.price}</span>
                          <span className={`text-[10px] font-medium ${headColor}`}>{stock.change}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right text-[10px] text-gray-500 space-y-0.5">
                    <div className="flex justify-end gap-2"><span>High</span><span className={stock.price ? 'text-emerald-500' : 'text-gray-400'}>{stock.high}</span></div>
                    <div className="flex justify-end gap-2"><span>Low</span><span className={stock.price ? 'text-yellow-500' : 'text-gray-400'}>{stock.low}</span></div>
                  </div>
                </div>

                {/* แถบชุดคำสั่งสลับโหมด Bids / Tickers ภายในตัวการ์ด (สามารถใช้งานสลับค่าได้จริงทุกช่อง) */}
                <div className="w-full grid grid-cols-5 bg-[#0b1322] border border-gray-800/60 rounded-[4px] mb-1.5 relative overflow-visible">
                  <div className="col-span-1 relative border-r border-gray-800/60">
                    <button
                      onClick={() => setCardDropdownOpen(prev => ({ ...prev, [idx]: !prev[idx] }))}
                      className="w-full flex items-center justify-between px-1.5 py-1 text-[10px] bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 transition-colors rounded-l-[4px]"
                    >
                      <span>{cardModes[idx]}</span>
                      <ChevronDown size={10} />
                    </button>
                    {cardDropdownOpen[idx] && (
                      <div className="absolute left-0 mt-0.5 w-20 bg-[#0f172a] border border-gray-800 rounded-[3px] shadow-2xl z-40 overflow-hidden">
                        {['Bids', 'Tickers'].map(mode => (
                          <button
                            key={mode}
                            onClick={() => {
                              setCardModes(prev => ({ ...prev, [idx]: mode }));
                              setCardDropdownOpen(prev => ({ ...prev, [idx]: false }));
                            }}
                            className="w-full text-left px-2 py-1 text-[10px] text-gray-400 hover:bg-blue-600/20 hover:text-blue-400"
                          >
                            {mode}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* 🆕 เพิ่มเติมจุดที่ 15: ตรวจสอบเงื่อนไข `cardModes[idx]` ของการ์ดใบนี้ หากเลือกโหมด 'Tickers' จะสลับหัวตารางและเนื้อหาด้านในให้กลายเป็นรูปแบบกระดาน Tickers เรียลไทม์ทั้งหมด */}
                  {cardModes[idx] === 'Tickers' ? (
                    <>
                      <div className="col-span-1 text-center py-1 text-[10px] text-gray-500 border-r border-gray-800/60">Time</div>
                      <div className="col-span-1 text-center py-1 text-[10px] text-gray-500 border-r border-gray-800/60">Side</div>
                      <div className="col-span-1 text-center py-1 text-[10px] text-gray-500 border-r border-gray-800/60">Price</div>
                      <div className="col-span-1 text-center py-1 text-[10px] text-gray-500">Volume</div>
                    </>
                  ) : (
                    <>
                      <div className="col-span-1 text-center py-1 text-[10px] text-gray-500 border-r border-gray-800/60">Volume</div>
                      <div className="col-span-1 text-center py-1 text-[10px] text-gray-500 border-r border-gray-800/60">Bids</div>
                      <div className="col-span-1 text-center py-1 text-[10px] text-gray-500 border-r border-gray-800/60">Offers</div>
                      <div className="col-span-1 text-center py-1 text-[10px] text-gray-500">Volume</div>
                    </>
                  )}
                </div>

                {/* ตารางส่วนกระดานเทรดดิ้งแสดงผล 3 แถวตรงตามรูปภาพ */}
                <div className="space-y-0.5 flex-1 flex flex-col justify-between">
                  {/* 🆕 เพิ่มเติมจุดที่ 16: ใช้เงื่อนไขควบคุมการเรนเดอร์โครงสร้างแถวข้อมูล หากเป็นโหมด 'Tickers' จะแสดงผล 4 คอลัมน์ (Time | Side | Price | Volume) พร้อมทำเฉดสีตาม Side ซื้อ-ขาย */}
                  {cardModes[idx] === 'Tickers' ? (
                    stock.price ? (
                      // การ์ดที่มีข้อมูลการซื้อขายจริง (เช่น HAIERS19, BANPU, PTT, HANA) จะจำลองการสตรีมประวัติ Ticker 3 แถวล่าสุด
                      <>
                        <div className="w-full grid grid-cols-5 text-[11px] font-mono py-0.5 hover:bg-gray-800/20 transition-colors">
                          <div className="col-span-1 text-left pl-1 text-gray-500">14:52:10</div>
                          <div className="col-span-1 text-center text-emerald-500 font-bold">B</div>
                          <div className="col-span-1 text-center text-emerald-500">{stock.price}</div>
                          <div className="col-span-2 text-right pr-1 text-emerald-400">2,500</div>
                        </div>
                        <div className="w-full grid grid-cols-5 text-[11px] font-mono py-0.5 hover:bg-gray-800/20 transition-colors">
                          <div className="col-span-1 text-left pl-1 text-gray-500">14:51:45</div>
                          <div className="col-span-1 text-center text-red-500 font-bold">S</div>
                          <div className="col-span-1 text-center text-red-500">{(parseFloat(stock.price.replace(/,/g, '')) - 0.05).toFixed(2)}</div>
                          <div className="col-span-2 text-right pr-1 text-red-400">10,800</div>
                        </div>
                        <div className="w-full grid grid-cols-5 text-[11px] font-mono py-0.5 hover:bg-gray-800/20 transition-colors">
                          <div className="col-span-1 text-left pl-1 text-gray-500">14:51:02</div>
                          <div className="col-span-1 text-center text-emerald-500 font-bold">B</div>
                          <div className="col-span-1 text-center text-emerald-500">{stock.price}</div>
                          <div className="col-span-2 text-right pr-1 text-emerald-400">15,000</div>
                        </div>
                      </>
                    ) : (
                      // การ์ดที่ไม่มีราคาล่าสุด (เช่น หุ้นที่ไม่มีการซื้อขาย A5-W4, S11-F, PACO-F) จะแสดงแถวว่าง/ขีด เพื่อคงความสวยงามสม่ำเสมอ
                      <>
                        <div className="w-full grid grid-cols-5 text-[11px] font-mono py-0.5 text-gray-600">
                          <div className="col-span-1 text-left pl-1">-</div>
                          <div className="col-span-1 text-center">-</div>
                          <div className="col-span-1 text-center">0.00</div>
                          <div className="col-span-2 text-right pr-1">0</div>
                        </div>
                        <div className="w-full grid grid-cols-5 text-[11px] font-mono py-0.5 text-gray-600">
                          <div className="col-span-1 text-left pl-1">-</div>
                          <div className="col-span-1 text-center">-</div>
                          <div className="col-span-1 text-center">0.00</div>
                          <div className="col-span-2 text-right pr-1">0</div>
                        </div>
                        <div className="w-full grid grid-cols-5 text-[11px] font-mono py-0.5 text-gray-600">
                          <div className="col-span-1 text-left pl-1">-</div>
                          <div className="col-span-1 text-center">-</div>
                          <div className="col-span-1 text-center">0.00</div>
                          <div className="col-span-2 text-right pr-1">0</div>
                        </div>
                      </>
                    )
                  ) : (
                    // หากไม่ได้เป็นโหมด Tickers (คือโหมด Bids ปกติ) ให้รันโค้ดชุดเดิมของคุณทำงาน 100%
                    stock.items.map((item, i) => (
                      <div key={i} className="w-full grid grid-cols-5 text-[11px] font-mono py-0.5 hover:bg-gray-800/20 transition-colors">
                        <div className="col-span-1 text-left pl-1 text-yellow-500/90">{item.v1}</div>
                        <div className="col-span-1 text-center text-gray-400">0.00</div>
                        <div className="col-span-1 text-center text-gray-400">{item.b}</div>
                        <div className={`col-span-1 text-center ${item.c}`}>{item.o}</div>
                        <div className="col-span-1 text-right pr-1 text-yellow-500/90">{item.v2}</div>
                      </div>
                    ))
                  )}
                </div>

                {/* 🆕 เพิ่มเติมจุดที่ 13: วางปุ่ม "Delete" สีแดงหม่นขนาดจิ๋วใต้กล่องตามสไตล์ภาพถ่ายใบที่ 2 เมื่อเข้าสู่โหมดลบรายการหุ้นรายตัว */}
                {isEditMode && (
                  <div className="w-full mt-2 pt-1.5 border-t border-gray-800/40 flex justify-start">
                    <button
                      onClick={() => {
                        setSelectedStockIds([stock.id]); // ติ๊กจองคิว ID หุ้นตัวนี้ใบเดียว
                        setIsModalOpen(true); // ทริกเกอร์เรียกป๊อปอัพยืนยันสีแดงขึ้นมาล็อกเป้าหน้าจอทันที
                      }}
                      className="px-2.5 py-1 text-[10px] rounded bg-red-950/40 text-red-500 border border-red-900/60 hover:bg-red-900 hover:text-white transition-all font-medium"
                    >
                      Delete
                    </button>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center py-12 px-4">
          
          {/* บล็อกกรอบสี่เหลี่ยมหน้าตากลางเว็บบนรูปเป๊ะๆ */}
          <div className="w-full max-w-[720px] bg-[#0c1322] border border-[#16263f] rounded-[8px] p-8 md:p-12 text-center shadow-lg transition-all duration-300">
            
            <h2 className="text-xl md:text-2xl font-semibold text-white tracking-wide mb-3">
              No Favourite items to display
            </h2>
            
            <p className="text-[13px] md:text-[14px] text-gray-400 max-w-md mx-auto leading-relaxed mb-8">
              To View your favourite items here.<br />
              please add items on the Maket page.
            </p>

            {/* สลักปุ่มกดจำลองสถานะแสดงผลตัวแปรบ่งบอกหน้าปัจจุบันเพื่อทดสอบการเปลี่ยนหน้า */}
            <div className="text-[11px] font-mono text-blue-500/60 mb-2 uppercase tracking-widest">
              Current View: {activeTab}
            </div>

            {/* ปุ่ม Go to Market กดใช้งานลิงก์สั่งเปลี่ยนกลับได้จริง */}
            {/* 🆕 แก้ไขเพิ่มเติมจุดที่ 2: ผูกฟังก์ชัน `onGoToMarket` ที่รับมาจากตัวแม่เข้ากับปุ่มกดตรงนี้ เพื่อให้เมื่อผู้ใช้กดคลิกแล้ว ระบบจะเปลี่ยนหน้ากลับไปยังหน้าแท็บ Market ได้ทันทีแบบเรียลไทม์ */}
            <button
              onClick={onGoToMarket}
              className="px-6 py-2 bg-[#0f172a]/40 border border-blue-900/60 text-blue-400 rounded-[4px] text-[13px] font-medium hover:bg-blue-600 hover:text-white hover:border-blue-500 shadow-[0_2px_10px_rgba(0,0,0,0.3)] transition-all duration-200"
            >
              Go to Market
            </button>

          </div>

        </div>
      )}

      {/* ================== CONFIRMATION MODAL POPUP ================== */}
      {/* 🆕 เพิ่มเติมจุดที่ 14: ประกอบโครงสร้างกล่องหน้าต่างแจ้งเตือนสีแดงเข้ม (Modal Confirmation Alert) ถอดแบบสัดส่วนไอคอนถังขยะกลม ข้อความแจ้งเตือน และชื่อหุ้นที่ติดคิวลบจากรูปภาพใบสุดท้าย 100% */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)} // กดยกเลิกแบบครอบคลุมนอกพื้นที่หน้าต่างได้ด้วย
        >
          <div 
            className="w-full max-w-[520px] bg-[#0c0404] border border-[#7f1d1d]/80 rounded-[4px] p-6 text-center relative shadow-2xl animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()} // ป้องกันการกดทะลุขอบป๊อปอัพ
          >
            {/* ปุ่มกากบาทไอคอนมุมซ้ายบน */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 left-4 text-red-700 hover:text-red-500 text-lg font-light transition-colors"
            >
              ✕
            </button>

            {/* สัญลักษณ์วงกลมถังขยะสีแดงตรงกลางภาพ */}
            <div className="w-16 h-16 rounded-full border-2 border-red-600 flex items-center justify-center mx-auto mt-2 mb-4 bg-red-950/20">
              <Trash2 size={26} className="text-red-500 fill-red-500" />
            </div>

            {/* ข้อความหลักหัวเรื่อง */}
            <h3 className="text-white text-[16px] font-semibold tracking-wide mb-1.5">
              Do you want to remove this stock
            </h3>
            
            {/* คำอธิบายขยายความเนื้อหา */}
            <p className="text-gray-400 text-[12px] mb-4">
              This will remove the selected stock from your favourite list.
            </p>

            {/* บล็อกแสดงชื่อป้ายกำกับของหุ้นตัวแรกที่อยู่ในกระบวนการรอสั่งลบตามภาพตัวอย่าง */}
            <div className="inline-block px-4 py-1.5 bg-red-950/30 border border-red-900 text-red-400 text-[12px] font-mono rounded mb-6 min-w-[100px]">
              {stocksList.find(s => selectedStockIds.includes(s.id))?.name || 'Selected Items'}
            </div>

            {/* ชุดควบคุมปุ่มกดฝั่งล่างขวา (Cancel / Remove) สั่งลบค่าออกจาก State จริงและปิดลงท้าย */}
            <div className="w-full flex justify-end gap-2 text-[12px]">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-1.5 bg-[#1c0808] border border-red-950 text-red-500 rounded-[3px] hover:bg-red-950/50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRemove}
                className="px-4 py-1.5 bg-[#7f1d1d] text-red-100 rounded-[3px] hover:bg-red-700 transition-all"
              >
                Remove
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

// 🆕 เปลี่ยนชื่อ Export ให้ตรงกัน
export default BidsOffersTerminal;