// 🛒 คอมโพเนนต์แผงส่งคำสั่งซื้อขายด้านล่างสุด คำนวณราคาสุทธิเงินทุนแบบ Realtime พร้อมปุ่มส่งออเดอร์สีเขียวนีออนขนาดใหญ่
import React, { useState, useEffect } from 'react';

function StreamingOrderPanel({ currentStock, onNewOrder }) {
  const targetStock = currentStock || { symbol: 'DELTA', price: 102.50 };
  
  // สเตตฟอร์มรับอินพุตตัวเลขราคาและปริมาณที่จะทำการเคาะส่งคำสั่งซื้อหุ้น
  const [tradePrice, setTradePrice] = useState(targetStock.price);
  const [tradeVolume, setTradeVolume] = useState(1000);

  // ตรวจจับสัญญาณการกดเลือกสลับหุ้นด้านบน เพื่ออัปเดตราคาฐานเข้าช่องอินพุตอัตโนมัติ
  useEffect(() => {
    setTradePrice(targetStock.price);
  }, [currentStock]);

  // สมการคำนวณราคาสุทธิรวมของคำสั่งเทรดหุ้น (Volume x Price)
  const calculatedCost = (parseFloat(tradePrice) || 0) * (parseInt(tradeVolume) || 0);

  // ฟังก์ชันรองรับการกดยืนยันปุ่มซื้อขายหลัก
  const handleFormSubmission = (e) => {
    e.preventDefault();
    if (!tradePrice || tradeVolume <= 0) return;

    const currentClockTime = new Date().toLocaleTimeString('en-US', { hour12: false });
    
    // ยิงล็อกคำสั่งบันทึกใหม่สะท้อนเข้ากระดานฟีดขวาล่างผ่านทาง Callback
    if (onNewOrder) {
      onNewOrder({
        time: currentClockTime,
        side: 'Buy',
        volume: parseInt(tradeVolume).toLocaleString(),
        price: parseFloat(tradePrice).toFixed(2)
      });
    }

    alert(`[ระบบ] ทำรายการ BUY ${targetStock.symbol} จำนวน ${parseInt(tradeVolume).toLocaleString()} หุ้น ที่ราคา ${tradePrice} THB สำเร็จ!`);
  };

  return (
    <form onSubmit={handleFormSubmission} className="flex flex-wrap items-end justify-between gap-4 bg-[#0b1623] p-3 rounded-sm border border-[#182a3d] text-[11px] font-sans w-full">
      
      {/* 🔴 ฝั่งซ้าย: กลุ่มอินพุตจัดแจงราคาและจำนวนโวลลุ่มเทรดหุ้น */}
      <div className="flex flex-wrap items-center gap-4">
        
        {/* เลือกชนิดคำสั่ง */}
        <div className="flex flex-col gap-1">
          <label className="text-slate-500 text-[10px] font-medium uppercase font-sans">Order Type</label>
          <select className="bg-[#050a12] border border-[#182c44] text-white rounded px-2 py-1 text-xs focus:outline-none focus:border-[#3c82f6] cursor-pointer font-mono">
            <option>Limit</option>
            <option>Market</option>
          </select>
        </div>

        {/* ช่องป้อนค่าราคาพร้อมชุดปุ่ม Stepper ขึ้นลงทีละช่วงราคากระดาน (0.25) */}
        <div className="flex flex-col gap-1">
          <label className="text-slate-500 text-[10px] font-medium uppercase font-sans">Price (THB)</label>
          <div className="flex items-center bg-[#050a12] border border-[#182c44] rounded px-1.5 py-0.5">
            <input
              type="number"
              step="0.25"
              value={tradePrice}
              onChange={(e) => setTradePrice(parseFloat(e.target.value) || 0)}
              className="bg-transparent text-white font-mono w-24 py-0.5 text-xs text-right focus:outline-none"
            />
            <div className="flex flex-col text-[8px] text-slate-500 pl-1.5 border-l border-[#132439] ml-1.5">
              <button type="button" onClick={() => setTradePrice(p => (parseFloat(p) + 0.25).toFixed(2))} className="hover:text-white cursor-pointer">▲</button>
              <button type="button" onClick={() => setTradePrice(p => Math.max(0, parseFloat(p) - 0.25).toFixed(2))} className="hover:text-white cursor-pointer">▼</button>
            </div>
          </div>
        </div>

        {/* ช่องอินพุตปริมาณหุ้นพร้อมปุ่มสเต็ปขยับปรับเพิ่มลดคำสั่งทีละ 100 หุ้น */}
        <div className="flex flex-col gap-1">
          <label className="text-slate-500 text-[10px] font-medium uppercase font-sans">Volume</label>
          <div className="flex items-center bg-[#050a12] border border-[#182c44] rounded px-1.5 py-0.5">
            <input
              type="number"
              step="100"
              value={tradeVolume}
              onChange={(e) => setTradeVolume(parseInt(e.target.value) || 0)}
              className="bg-transparent text-white font-mono w-28 py-0.5 text-xs text-right focus:outline-none"
            />
            <div className="flex flex-col text-[8px] text-slate-500 pl-1.5 border-l border-[#132439] ml-1.5">
              <button type="button" onClick={() => setTradeVolume(v => parseInt(v) + 100)} className="hover:text-white cursor-pointer">▲</button>
              <button type="button" onClick={() => setTradeVolume(v => Math.max(0, parseInt(v) - 100))} className="hover:text-white cursor-pointer">▼</button>
            </div>
          </div>
        </div>

      </div>

      {/* 🔴 ฝั่งขวา: แสดงผลคำนวณเงินและปุ่ม BUY ขนาดใหญ่สะดุดตาสีเขียวนีออน */}
      <div className="flex items-center gap-5">
        <div className="text-right font-mono text-[11px] text-slate-400 leading-tight">
          <div>Total Cost: <span className="text-white font-black">{calculatedCost.toLocaleString()} THB</span></div>
          <div className="text-[10px] mt-0.5 text-slate-500 font-sans">Available: <span className="text-[#00e676] font-semibold">1,245,678.00 THB</span></div>
        </div>
        
        <button
          type="submit"
          className="bg-[#00e676] hover:bg-[#00c853] text-black font-black px-8 py-2.5 rounded text-xs uppercase tracking-widest transition-all transform active:scale-95 shadow-md shadow-green-950/40 cursor-pointer font-sans"
        >
          BUY {targetStock.symbol}
        </button>
      </div>

    </form>
  );
}

export default StreamingOrderPanel;