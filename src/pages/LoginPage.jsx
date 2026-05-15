import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Sidebar from '../components/layout/Sidebar';
import LoginForm from '../features/auth/LoginForm';
import TwoFactorAuth from '../features/auth/TwoFactorAuth';
import IntradayChart from '../features/dashboard/IntradayChart';

// 📍 1. ลบ import MostActiveStocks ออก และเพิ่ม 2 Component ใหม่ที่เราเพิ่งสร้างเข้าไปแทน
import MarketOverview from '../features/dashboard/MarketOverview';
import MarketStockTabs from '../features/dashboard/MarketStockTabs';

const LoginPage = ({ isDarkMode, setIsDarkMode, onAuthSuccess }) => {
  const [show2FA, setShow2FA] = useState(false);
  const [authData, setAuthData] = useState(null);

  const handleLoginSuccess = (data) => {
    setAuthData(data);
    setShow2FA(true);
  };

  const handleVerificationSuccess = () => {
    console.log('Login Complete!');
    if (onAuthSuccess) {
      onAuthSuccess();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#090e19] text-gray-900 dark:text-white transition-colors duration-300">
      
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      
      <div className="flex flex-1 flex-col lg:flex-row overflow-hidden">
        {!show2FA && <Sidebar />}
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 flex justify-center lg:border-l border-gray-200 dark:border-[#1e3a8a]">
            
            <div className="w-full max-w-4xl flex flex-col gap-4 mt-2">
              
              {/* ส่วนบน: แบ่งซ้าย-ขวา */}
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch">
                
                {/* ซ้าย: Login Form หรือ 2FA */}
                <div className={`w-full ${show2FA ? 'lg:w-full flex justify-center' : 'lg:w-1/2'}`}>
                  {show2FA ? (
                    <TwoFactorAuth 
                      authData={authData}
                      onBackToLogin={() => setShow2FA(false)} 
                      onSuccess={handleVerificationSuccess}
                    />
                  ) : (
                    <LoginForm onLoginSuccess={handleLoginSuccess} />
                  )}
                </div>

                {!show2FA && (
                  <div className="w-full lg:w-1/2 flex flex-col gap-4">
                    <MarketOverview />
                    <MarketStockTabs />
                  </div>
                )}
                
              </div>

              {!show2FA && (
                <div className="w-full"> 
                  <IntradayChart />
                </div>
              )}

            </div>

        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-[#1e3a8a] bg-white dark:bg-[#090e19] py-3 px-4 text-[10px] text-gray-500 flex flex-col md:flex-row justify-between items-center gap-2">
        <p>System response and all information may vary due to system performance, market conditions and other factors</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-blue-600 dark:hover:text-gray-300 underline">SETTRADE.COM</a>
          <a href="#" className="hover:text-blue-600 dark:hover:text-gray-300 underline">All rights reserved</a>
          <a href="#" className="hover:text-blue-600 dark:hover:text-gray-300 underline">Terms of Use</a>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;