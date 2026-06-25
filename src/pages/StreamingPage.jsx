import React, { useState } from 'react';
import { Scan, Eye } from 'lucide-react';
import TopNav from '../features/streaming/TopNav';
import StockTable from '../features/streaming/StockTable';
import StockDetail from '../features/streaming/StockDetail';
import PriceChart from '../features/streaming/PriceChart';
import PriceChartMarket from '../features/streaming/PriceChartMarket';
import MyWatchlist from '../features/streaming/MyWatchlist';
import LiveTrades from '../features/streaming/LiveTrades';
import OrderPanel from '../features/streaming/OrderPanel';
import SetIndexPanel from '../features/streaming/SetIndexPanel';
import SetIndexPanelMarket from '../features/streaming/SetIndexPanelMarket';
import UserCard from '../features/streaming/UserCard';
import PortfolioApp from '../features/streaming/PortfolioApp';
import OrderTerminal from '../features/streaming/OrderTerminal';
import BidsOffersTerminal from '../features/streaming/BidsOffersTerminal';
import TickerTerminal from '../features/streaming/TickerTerminal';

const StreamingPage = ({ isDarkMode, setIsDarkMode, onLogout }) => {
  const [activeTab, setActiveTab] = useState('Market');
  const [selectedStock, setSelectedStock] = useState({
    symbol: 'DELTA',
    price: '102.50',
    change: '+3.00',
    pChg: '+3.02%',
    desc: 'DELTA ELECTRONICS (THAILAND) PCL. - SET',
    sector: 'Technology | Electronic Components',
    vol: '25.6M',
    isFav: true,
    h: '103.00',
    l: '99.00',
    val: '2.61B',
    avgVol: '15.2M',
    pe: '58.45',
    mktCap: '1.28T',
    yield: '0.78%',
    open: '99.50',
    dir: 'up'
  });
  
  const [selectedTimeRange, setSelectedTimeRange] = useState('1D');
  const [showWatchlist, setShowWatchlist] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-[#090e19] text-white transition-colors duration-300 font-sans overflow-hidden">
      
      {/* Top Navigation - Full Width */}
      <TopNav onLogout={onLogout} activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* ========== MARKET TAB ========== */}
      {activeTab === 'Market' && (
      <main className="flex-1 flex flex-col lg:flex-row p-3 lg:p-4 gap-4 overflow-hidden w-full max-w-[1920px] mx-auto h-[calc(100vh-52px)]">

        {/* Left & Center Main Block (75%) */}
        <div className="flex flex-col flex-1 gap-4 overflow-hidden min-w-[700px]">

          {/* Top Row: Market Overview + Center Detail */}
          <div className="flex flex-row gap-4 flex-1 overflow-hidden min-h-[400px]">

            {/* Left Column: Market Overview */}
            <div className="w-[32%] xl:w-[28%] flex-shrink-0 flex flex-col min-w-[300px]">
              <StockTable onSelectStock={setSelectedStock} />
            </div>

            {/* Center Column: SET Index + DELTA Info & Chart */}
            <div className="flex-1 flex flex-col overflow-hidden min-w-[400px]">
              <div className="flex-shrink-0">
                <SetIndexPanelMarket />
              </div>
              <div className="flex-1 flex flex-col bg-[#101c2c] border border-[#193254] rounded-[8px] overflow-hidden">
                <StockDetail
                  stock={selectedStock}
                  selectedTimeRange={selectedTimeRange}
                  setSelectedTimeRange={setSelectedTimeRange}
                />
                <PriceChartMarket
                  stock={selectedStock}
                  selectedTimeRange={selectedTimeRange}
                />
              </div>
            </div>

          </div>

          {/* Bottom Row: Order Panel (Spans Left & Center only) */}
          <div className="w-full flex-shrink-0">
            <OrderPanel selectedStock={selectedStock} />
          </div>

        </div>

        {/* Right Column: Watchlist & Live Trades (25%) */}
        <div className="w-[320px] xl:w-[350px] flex-shrink-0 flex flex-col gap-4 h-full">
           {/* User Card */}
           <div className="flex-shrink-0">
             <UserCard />
           </div>

           {/* My Watchlist (Takes up part of the space) */}
           <div className="flex flex-col flex-shrink-0" style={{ height: '42%' }}>
             <MyWatchlist onSelectStock={setSelectedStock} />
           </div>

           {/* Live Trades (Stretches all the way clearly to the bottom right) */}
           <div className="flex flex-col flex-1 overflow-hidden">
             <LiveTrades />
           </div>
        </div>

      </main>
      )}

      {/* ========== TECHNICAL TAB ========== */}
      {activeTab === 'Technical' && (
      <main className="flex-1 flex flex-col p-3 lg:p-4 gap-3 overflow-hidden w-full max-w-[1920px] mx-auto h-[calc(100vh-52px)]">

        {/* Top: SET Index Panel */}
        <div className="flex-shrink-0">
          <SetIndexPanel />
        </div>

        {/* Main row: Watchlist + Chart */}
        <div className="flex flex-1 gap-4 min-h-0">

          {/* Left: My Watchlist Toggle */}
          {showWatchlist ? (
            <div className="w-[320px] flex-shrink-0 flex flex-col transition-all duration-300">
              <MyWatchlist onSelectStock={setSelectedStock} onToggleWatchlist={() => setShowWatchlist(false)} />
            </div>
          ) : (
            <div className="w-[40px] h-[40px] flex-shrink-0 flex items-center justify-center border border-[#193254] rounded-[8px] bg-[#090e19] mt-0">
               <button 
                 onClick={() => setShowWatchlist(true)}
                 className="text-[#a9b2bf] hover:text-[#ffffff] transition-colors relative flex items-center justify-center w-full h-full"
               >
                 <Scan size={18} />
                 <Eye size={10} strokeWidth={2.5} className="absolute" />
               </button>
            </div>
          )}

          {/* Center: Price Chart */}
          <div className="flex-1 flex flex-col min-h-0 rounded-[8px] overflow-hidden border border-[#193254]">
            <PriceChart stock={selectedStock} selectedTimeRange={selectedTimeRange} />
          </div>

        </div>

      </main>
      )}




      {/* ========== PORTFOLIO TAB ==========  พี่เฟิร์นทำแล้ว */}
      {activeTab === 'Portfolio' && (
      <main className="flex-1 flex flex-col p-3 lg:p-4 gap-3 overflow-hidden w-full max-w-[1920px] mx-auto h-[calc(100vh-52px)]">

        {/* Top: Header Market Stats */}
        <div className="flex-shrink-0">
          <SetIndexPanel />
        </div>


        {/* Main: Details */}
        <div className="flex-shrink-0">
          <PortfolioApp />
        </div>
        

      </main>
      )}


      {/* ========== BIDS OFFERS TAB ========== */}
      {activeTab === 'Bids Offers' && (
      <main className="flex-1 flex flex-col p-3 lg:p-4 gap-3 overflow-hidden w-full max-w-[1920px] mx-auto h-[calc(100vh-52px)]">

        {/* Top: Header Market Stats */}
        <div className="flex-shrink-0">
          <SetIndexPanel />
        </div>


        {/* Main row: Order Terminal */}
        <div className="w-full flex-shrink-0">
          <BidsOffersTerminal onGoToMarket={() => setActiveTab('Market')} />
        </div>

        {/* Main: Order Terminal ใช้ส่วนเดียวกับหน้า Portfolio อันล่างสุด */}
        <div className="flex-shrink-0">
          <OrderTerminal />
        </div>
        

      </main>
      )}



      {/* ========== TICKER TAB ========== */}
      {activeTab === 'Ticker' && (
      <main className="flex-1 flex flex-col p-3 lg:p-4 gap-3 overflow-hidden w-full max-w-[1920px] mx-auto h-[calc(100vh-52px)]">

        {/* Top: Header Market Stats */}
        <div className="flex-shrink-0">
          <SetIndexPanel />
        </div>


        {/* Main row: Order Terminal */}
        <div className="h-[45%] bg-[#0a1628] border border-[#1a3050] rounded flex flex-col overflow-hidden">
          <TickerTerminal onGoToMarket={() => setActiveTab('Market')} />
        </div>

        {/* Main: Order Terminal ใช้ส่วนเดียวกับหน้า Portfolio อันล่างสุด */}
        <div className="flex-shrink-0">
          <OrderTerminal />
        </div>
        

      </main>
      )}






      {/* ========== OTHER TABS (Coming Soon) ========== */}
      {activeTab !== 'Market' && activeTab !== 'Technical' && activeTab !== 'Portfolio' && activeTab !== 'Bids Offers' && activeTab !== 'Ticker' && (
        <div className="flex-1 flex items-center justify-center text-gray-500 flex-col gap-3">
          <span className="text-5xl">🚧</span>
          <p className="text-lg font-medium text-gray-400">{activeTab}</p>
          <p className="text-sm">This section is coming soon</p>
        </div>
      )}
    </div>
  );
};

export default StreamingPage;
