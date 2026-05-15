import React, { useState } from 'react';
import { Star } from 'lucide-react';

const mockStocksData = {
  'Most Active': [
    { symbol: 'DELTA', price: '102.50', change: '+3.00', pChg: '+3.02%', vol: '25.6M', isFav: true, dir: 'up', desc: 'DELTA ELECTRONICS (THAILAND) PCL. - SET', sector: 'Technology | Electronic Components', h: '103.00', l: '99.00', val: '2.61B', avgVol: '15.2M', pe: '58.45', mktCap: '1.28T', yield: '0.78%', open: '99.50' },
    { symbol: 'AOT', price: '60.25', change: '+1.25', pChg: '+2.12%', vol: '18.3M', isFav: false, dir: 'up', desc: 'AIRPORTS OF THAILAND PCL. - SET', sector: 'Services | Transportation', h: '61.00', l: '59.00', val: '1.1B', avgVol: '12M', pe: '30.1', mktCap: '860B', yield: '1.2%', open: '59.50' },
    { symbol: 'ADVANC', price: '287.00', change: '+4.00', pChg: '+1.42%', vol: '9.4M', isFav: false, dir: 'up', desc: 'ADVANCED INFO SERVICE PCL. - SET', sector: 'Technology | ICT', h: '288.00', l: '283.00', val: '2.7B', avgVol: '8M', pe: '15.4', mktCap: '850B', yield: '3.5%', open: '284.00' },
    { symbol: 'CPALL', price: '56.25', change: '-0.50', pChg: '-0.88%', vol: '7.8M', isFav: false, dir: 'down', desc: 'CP ALL PCL. - SET', sector: 'Services | Commerce', h: '57.00', l: '56.00', val: '438M', avgVol: '10M', pe: '22.3', mktCap: '505B', yield: '2.1%', open: '56.75' },
    { symbol: 'SCB', price: '108.00', change: '+1.50', pChg: '+1.41%', vol: '7.1M', isFav: false, dir: 'up', desc: 'SCB X PCL. - SET', sector: 'Financials | Banking', h: '109.00', l: '106.50', val: '766M', avgVol: '9M', pe: '8.2', mktCap: '360B', yield: '5.4%', open: '107.00' },
    { symbol: 'KBANK', price: '136.50', change: '-1.50', pChg: '-1.09%', vol: '15.2M', isFav: true, dir: 'down', desc: 'KASIKORNBANK PCL. - SET', sector: 'Financials | Banking', h: '138.00', l: '135.00', val: '2.07B', avgVol: '12M', pe: '7.8', mktCap: '320B', yield: '6.1%', open: '138.00' },
    { symbol: 'PTT', price: '34.75', change: '+0.75', pChg: '+2.21%', vol: '14.8M', isFav: true, dir: 'up', desc: 'PTT PCL. - SET', sector: 'Resources | Energy', h: '35.00', l: '34.25', val: '514M', avgVol: '20M', pe: '9.1', mktCap: '990B', yield: '4.8%', open: '34.50' },
    { symbol: 'BDMS', price: '28.75', change: '-0.25', pChg: '-0.86%', vol: '50M', isFav: false, dir: 'down', desc: 'BANGKOK DUSIT MEDICAL PCL. - SET', sector: 'Services | Health', h: '29.25', l: '28.50', val: '1.4B', avgVol: '45M', pe: '31.2', mktCap: '450B', yield: '1.8%', open: '29.00' },
    { symbol: 'GULF', price: '45.25', change: '+0.50', pChg: '+1.12%', vol: '22M', isFav: false, dir: 'up', desc: 'GULF ENERGY DEVELOPMENT PCL.', sector: 'Resources | Energy', h: '45.50', l: '44.75', val: '980M', avgVol: '25M', pe: '42.3', mktCap: '530B', yield: '1.4%', open: '44.75' },
    { symbol: 'CRC', price: '36.50', change: '-0.50', pChg: '-1.35%', vol: '8.4M', isFav: false, dir: 'down', desc: 'CENTRAL RETAIL CORPORATION PCL.', sector: 'Services | Commerce', h: '37.00', l: '36.25', val: '310M', avgVol: '10M', pe: '28.5', mktCap: '220B', yield: '1.5%', open: '37.00' },
    { symbol: 'EA', price: '38.00', change: '-1.00', pChg: '-2.56%', vol: '15.6M', isFav: true, dir: 'down', desc: 'ENERGY ABSOLUTE PCL.', sector: 'Resources | Energy', h: '39.25', l: '37.75', val: '600M', avgVol: '18M', pe: '26.8', mktCap: '140B', yield: '0.8%', open: '39.00' },
    { symbol: 'TOP', price: '52.50', change: '+1.50', pChg: '+2.94%', vol: '11.2M', isFav: false, dir: 'up', desc: 'THAI OIL PCL.', sector: 'Resources | Energy', h: '53.00', l: '51.00', val: '580M', avgVol: '12M', pe: '5.4', mktCap: '107B', yield: '6.2%', open: '51.25' },
    { symbol: 'MINT', price: '30.25', change: '+0.25', pChg: '+0.83%', vol: '16.5M', isFav: false, dir: 'up', desc: 'MINOR INTERNATIONAL PCL.', sector: 'Services | Tourism', h: '30.50', l: '29.75', val: '495M', avgVol: '14M', pe: '45.2', mktCap: '160B', yield: '0.5%', open: '30.00' },
    { symbol: 'KTB', price: '20.30', change: '+0.10', pChg: '+0.50%', vol: '75M', isFav: true, dir: 'up', desc: 'KRUNG THAI BANK PCL.', sector: 'Financials | Banking', h: '20.50', l: '20.10', val: '1.5B', avgVol: '60M', pe: '6.5', mktCap: '280B', yield: '4.1%', open: '20.20' },
    { symbol: 'TRUE', price: '7.10', change: '-0.20', pChg: '-2.74%', vol: '110M', isFav: false, dir: 'down', desc: 'TRUE CORPORATION PCL.', sector: 'Technology | ICT', h: '7.40', l: '7.05', val: '781M', avgVol: '150M', pe: 'N/A', mktCap: '245B', yield: '0%', open: '7.30' },
    { symbol: 'BBL', price: '150.00', change: '+1.00', pChg: '+0.67%', vol: '9.8M', isFav: false, dir: 'up', desc: 'BANGKOK BANK PCL.', sector: 'Financials | Banking', h: '151.00', l: '149.00', val: '1.4B', avgVol: '8M', pe: '7.2', mktCap: '286B', yield: '4.5%', open: '149.50' },
  ],
  'Top Gainers': [
    { symbol: 'JTS', price: '72.50', change: '+5.50', pChg: '+8.20%', vol: '4.2M', isFav: false, dir: 'up', desc: 'JASMINE TECHNOLOGY SOLUTION PCL.', sector: 'Technology', h: '73.00', l: '67.00', val: '304M', avgVol: '2.1M', pe: '110', mktCap: '51B', yield: '0%', open: '68.00' },
    { symbol: 'SABUY', price: '4.88', change: '+0.36', pChg: '+7.96%', vol: '112M', isFav: false, dir: 'up', desc: 'SABUY TECHNOLOGY PCL.', sector: 'Technology', h: '4.95', l: '4.50', val: '546M', avgVol: '150M', pe: 'N/A', mktCap: '4B', yield: '0%', open: '4.54' },
    { symbol: 'BEAUTY', price: '0.62', change: '+0.04', pChg: '+6.89%', vol: '540M', isFav: true, dir: 'up', desc: 'BEAUTY COMMUNITY PCL.', sector: 'Services', h: '0.65', l: '0.58', val: '334M', avgVol: '400M', pe: 'N/A', mktCap: '1.8B', yield: '0%', open: '0.59' },
    { symbol: 'NEX', price: '11.50', change: '+0.70', pChg: '+6.48%', vol: '18M', isFav: false, dir: 'up', desc: 'NEX POINT PCL.', sector: 'Industrials', h: '11.60', l: '10.80', val: '202M', avgVol: '12M', pe: '25.4', mktCap: '23B', yield: '0%', open: '10.90' },
    { symbol: 'DITTO', price: '28.50', change: '+1.50', pChg: '+5.55%', vol: '5.2M', isFav: false, dir: 'up', desc: 'DITTO (THAILAND) PCL.', sector: 'Technology', h: '29.00', l: '27.25', val: '145M', avgVol: '3M', pe: '42.1', mktCap: '15B', yield: '1.2%', open: '27.50' },
  ],
  'Top Losers': [
    { symbol: 'STARK', price: '0.02', change: '-0.01', pChg: '-33.3%', vol: '1.2B', isFav: false, dir: 'down', desc: 'STARK CORPORATION PCL.', sector: 'Industrials', h: '0.03', l: '0.01', val: '24M', avgVol: '1B', pe: 'N/A', mktCap: '200M', yield: '0%', open: '0.03' },
    { symbol: 'NUSA', price: '0.35', change: '-0.05', pChg: '-12.5%', vol: '24M', isFav: false, dir: 'down', desc: 'NUSASIRI PCL.', sector: 'Property', h: '0.40', l: '0.34', val: '8.4M', avgVol: '10M', pe: 'N/A', mktCap: '4B', yield: '0%', open: '0.39' },
    { symbol: 'CHO', price: '0.15', change: '-0.02', pChg: '-11.7%', vol: '35M', isFav: false, dir: 'down', desc: 'CHOTIwat Manufacturing PCL.', sector: 'Industrials', h: '0.17', l: '0.14', val: '5.2M', avgVol: '20M', pe: 'N/A', mktCap: '600M', yield: '0%', open: '0.17' },
    { symbol: 'TRC', price: '0.21', change: '-0.02', pChg: '-8.69%', vol: '12M', isFav: false, dir: 'down', desc: 'TRC CONSTRUCTION PCL.', sector: 'Property', h: '0.23', l: '0.20', val: '2.5M', avgVol: '8M', pe: 'N/A', mktCap: '1.2B', yield: '0%', open: '0.23' },
  ],
  'High Volume': [
    { symbol: 'TRUE', price: '7.10', change: '-0.20', pChg: '-2.74%', vol: '110M', isFav: false, dir: 'down', desc: 'TRUE CORPORATION PCL.', sector: 'Technology', h: '7.40', l: '7.05', val: '781M', avgVol: '150M', pe: 'N/A', mktCap: '245B', yield: '0%', open: '7.30' },
    { symbol: 'BTS', price: '6.80', change: '-0.10', pChg: '-1.45%', vol: '90M', isFav: true, dir: 'down', desc: 'BTS GROUP HOLDINGS PCL.', sector: 'Services', h: '6.95', l: '6.75', val: '612M', avgVol: '85M', pe: '14.2', mktCap: '89B', yield: '4.5%', open: '6.90' },
    { symbol: 'KTB', price: '20.30', change: '+0.10', pChg: '+0.50%', vol: '75M', isFav: true, dir: 'up', desc: 'KRUNG THAI BANK PCL.', sector: 'Financials | Banking', h: '20.50', l: '20.10', val: '1.5B', avgVol: '60M', pe: '6.5', mktCap: '280B', yield: '4.1%', open: '20.20' },
    { symbol: 'TTB', price: '1.85', change: '+0.03', pChg: '+1.65%', vol: '68M', isFav: false, dir: 'up', desc: 'TMBTHANACHART BANK PCL.', sector: 'Financials', h: '1.87', l: '1.82', val: '125M', avgVol: '50M', pe: '10.2', mktCap: '178B', yield: '5.2%', open: '1.83' },
    { symbol: 'BDMS', price: '28.75', change: '-0.25', pChg: '-0.86%', vol: '50M', isFav: false, dir: 'down', desc: 'BANGKOK DUSIT MEDICAL PCL. - SET', sector: 'Services | Health', h: '29.25', l: '28.50', val: '1.4B', avgVol: '45M', pe: '31.2', mktCap: '450B', yield: '1.8%', open: '29.00' },
  ]
};

const StockTable = ({ onSelectStock }) => {
  const tabs = ['Most Active', 'Top Gainers', 'Top Losers', 'High Volume'];
  const [activeTab, setActiveTab] = useState('Most Active');
  
  // Create a reactive state for favorite statuses based on symbol
  const [favorites, setFavorites] = useState(
    Object.values(mockStocksData).flat().reduce((acc, stock) => {
      acc[stock.symbol] = stock.isFav;
      return acc;
    }, {})
  );

  const handleToggleFav = (e, symbol) => {
    e.stopPropagation(); // prevent row click from triggering
    setFavorites(prev => ({ ...prev, [symbol]: !prev[symbol] }));
  };

  const currentStocks = mockStocksData[activeTab] || [];

  return (
    <div className="flex flex-col bg-[#101c2c] border border-[#193254] rounded-[8px] h-full font-sans select-none pb-2">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <h2 className="text-[#ffffff] font-medium text-[14px]">Market Overview</h2>
        <button className="text-[#1479dd] text-[12px] hover:text-[#4b7cff] font-medium transition-colors">View All &gt;</button>
      </div>

      {/* Tabs */}
      <div className="flex px-4 gap-2 border-b border-[#193254] pb-3 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-[6px] rounded-[4px] text-[12px] whitespace-nowrap transition-colors border ${
              activeTab === tab 
              ? 'bg-[#1479dd] text-white border-[#1479dd] font-medium' 
              : 'bg-transparent text-[#757575] border-[#193254] hover:bg-[#193254] hover:text-[#ffffff]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[2.5fr_1.5fr_1.5fr_1.5fr_1.5fr] px-4 py-[10px] text-[11px] text-[#757575] font-medium border-b border-[#193254]">
        <div>Symbol</div>
        <div className="text-right">Price</div>
        <div className="text-right">Change</div>
        <div className="text-right">%Chg</div>
        <div className="text-right">Volume</div>
      </div>

      {/* Table Body */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {currentStocks.map((stock, i) => (
          <div 
            key={stock.symbol}
            onClick={() => onSelectStock(stock)}
            className={`grid grid-cols-[2.5fr_1.5fr_1.5fr_1.5fr_1.5fr] px-4 py-[8px] text-[12px] items-center hover:bg-[#193254] transition-colors cursor-pointer ${
              i % 2 !== 0 ? 'bg-transparent' : 'bg-[#0e2c49]'
            }`}
          >
            <div className="flex items-center gap-[6px]">
              <div onClick={(e) => handleToggleFav(e, stock.symbol)}>
                <Star 
                  size={13} 
                  className={favorites[stock.symbol] ? 'fill-[#f5b041] text-[#f5b041]' : 'text-[#474d57] hover:text-[#f5b041] transition'} 
                />
              </div>
              <span className="text-[#ffffff] font-medium">{stock.symbol}</span>
            </div>
            <div className="text-right text-[#ffffff] font-medium">{stock.price}</div>
            <div className={`text-right font-medium ${stock.dir === 'up' ? 'text-[#23df68]' : 'text-[#ff0000]'}`}>
              {stock.change}
            </div>
            <div className={`text-right font-medium ${stock.dir === 'up' ? 'text-[#23df68]' : 'text-[#ff0000]'}`}>
              {stock.pChg}
            </div>
            <div className="text-right text-[#ffffff] font-medium">{stock.vol}</div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default StockTable;
