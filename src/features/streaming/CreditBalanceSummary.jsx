import React from 'react';

const CreditBalanceSummary = () => {
  const summaryStyle = { flex: 1, padding: '10px' };
  const labelStyle = { fontSize: '11px', color: '#aaa', textTransform: 'uppercase' };
  const valueStyle = { fontSize: '24px', fontWeight: 'bold', margin: '5px 0' };

  return (
    <div style={{ backgroundColor: '#1a1d26', color: 'white', borderRadius: '4px', marginBottom: '10px' }}>
      <div style={{ backgroundColor: '#b71c1c', padding: '5px 15px', fontWeight: 'bold' }}>
        Credit & Balance Summary
      </div>
      <div style={{ display: 'flex', textAlign: 'left', padding: '10px' }}>
        <div style={summaryStyle}>
          <div style={labelStyle}>Credit Limit</div>
          <div style={valueStyle}>100,000.00</div>
          <div style={{ fontSize: '10px', color: '#666' }}>Thai Baht</div>
        </div>
        <div style={{ width: '1px', backgroundColor: '#333', margin: '10px 0' }}></div>
        <div style={summaryStyle}>
          <div style={labelStyle}>Line Available</div>
          <div style={valueStyle}>0.00</div>
          <div style={{ fontSize: '10px', color: '#666' }}>Thai Baht</div>
        </div>
        <div style={{ width: '1px', backgroundColor: '#333', margin: '10px 0' }}></div>
        <div style={summaryStyle}>
          <div style={labelStyle}>Cash Balance</div>
          <div style={valueStyle}>0.00</div>
          <div style={{ fontSize: '10px', color: '#666' }}>Thai Baht</div>
        </div>
      </div>
    </div>
  );
};

export default CreditBalanceSummary;