import React, { useState } from 'react';

const OrderTerminal = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    symbol: '',
    volume: '',
    price: '',
    side: 'BUY'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value.toUpperCase() }));
  };

  const handleSubmit = () => {
    if (!formData.symbol || !formData.volume || !formData.price) {
      alert('Please fill all fields');
      return;
    }
    onSubmit(formData); // ส่งข้อมูลไปที่ App.jsx
    handleClear();
  };

  const handleClear = () => {
    setFormData({ symbol: '', volume: '', price: '', side: 'BUY' });
  };

  return (
    <div className="bg-[#0b141e] border border-[#1e2d3d]">
      {/* Line Available Bar */}
      <div className="bg-[#1a2b3c] border-y border-[#3075c5] flex gap-10 p-1 text-[10px] text-yellow-500 px-4 font-bold">
        <span>A/C TYPE: CASH BALANCE</span>
        <span>CREDIT LIMIT: 100,000.00</span>
        <span>LINE AVAILABLE: 0.00</span>
        <span>CASH BALANCE: 0.00</span>
      </div>

      {/* Tabs */}
      <div className="flex bg-[#070b10] border-b border-[#1e2d3d]">
        <button className="bg-[#3075c5] text-white px-4 py-1 text-[11px] font-bold">Place Order</button>
        <button className="text-gray-500 px-4 py-1 text-[11px]">Stop Order</button>
        <button className="text-gray-500 px-4 py-1 text-[11px]">Trailing Stop</button>
      </div>

      {/* Form Input */}
      <div className="p-3 flex items-center gap-3">
        <div className="flex border border-gray-700 rounded overflow-hidden">
          <button 
            onClick={() => setFormData(p => ({...p, side: 'BUY'}))}
            className={`px-4 py-1 text-[11px] font-bold transition ${formData.side === 'BUY' ? 'bg-green-600 text-white' : 'bg-transparent text-gray-500'}`}
          >Buy</button>
          <button 
            onClick={() => setFormData(p => ({...p, side: 'SELL'}))}
            className={`px-4 py-1 text-[11px] font-bold transition ${formData.side === 'SELL' ? 'bg-red-600 text-white' : 'bg-transparent text-gray-500'}`}
          >Sell</button>
        </div>

        <input 
          name="symbol"
          value={formData.symbol}
          onChange={handleInputChange}
          placeholder="Symbol" 
          className="bg-[#1a2b3c] border border-gray-600 text-xs px-2 py-1.5 w-24 text-yellow-500 outline-none focus:border-blue-500"
        />
        
        <input 
          name="volume"
          type="number"
          value={formData.volume}
          onChange={handleInputChange}
          placeholder="Volume" 
          className="bg-[#1a2b3c] border border-gray-600 text-xs px-2 py-1.5 w-24 text-white outline-none"
        />

        <input 
          name="price"
          type="number"
          value={formData.price}
          onChange={handleInputChange}
          placeholder="Price" 
          className="bg-[#1a2b3c] border border-gray-600 text-xs px-2 py-1.5 w-24 text-white outline-none"
        />

        <select className="bg-[#1a2b3c] border border-gray-600 text-[11px] px-2 py-1.5 text-white outline-none">
          <option>Limit</option>
          <option>ATO/ATC</option>
          <option>MP</option>
        </select>

        <div className="ml-auto flex gap-1">
          <button onClick={handleSubmit} className="bg-[#3075c5] hover:bg-blue-500 text-white px-8 py-1.5 rounded font-bold text-[11px]">Submit</button>
          <button onClick={handleClear} className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-1.5 rounded font-bold text-[11px]">Clear</button>
        </div>
      </div>
    </div>
  );
};

export default OrderTerminal;