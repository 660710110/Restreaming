import React from 'react';

const OutstandingOrder = () => {
  const orders = [
    { id: '1001234', fis: '-', symbol: 'AOT', time: '10:30:15', side: 'B', price: '51.00', vol: '1,000', ice: '-', valid: 'Day', match: '1,000', bal: '0', can: '0', status: 'Matched', statusColor: '#3d4b7c', action: 'View' },
    { id: '1001235', fis: '-', symbol: 'PTT', time: '10:42:08', side: 'S', price: '34.50', vol: '500', ice: '-', valid: 'Day', match: '0', bal: '500', can: '0', status: 'Open', statusColor: '#2e4a31', action: 'Detail', showCancel: true },
    { id: '1001236', fis: '-', symbol: 'KBANK', time: '10:45:22', side: 'B', price: '140.00', vol: '200', ice: '-', valid: 'Day', match: '100', bal: '100', can: '0', status: 'Partial', statusColor: '#6b4f1a', action: 'Change', showCancel: true },
  ];

  const thStyle = { backgroundColor: '#252932', color: '#8e94a0', fontSize: '10px', padding: '8px 4px', fontWeight: 'normal', borderBottom: '1px solid #1a1d26' };
  const tdStyle = { padding: '10px 4px', borderBottom: '1px solid #2a2e39', fontSize: '11px' };

  return (
    <div style={{ backgroundColor: '#131722', color: 'white', borderRadius: '4px', overflow: 'hidden', border: '1px solid #2a2e39' }}>
      <div style={{ backgroundColor: '#b71c1c', padding: '6px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 'bold', fontSize: '13px' }}>Outstanding Order</span>
        <span style={{ fontSize: '11px', color: '#4caf50' }}>● Live</span>
      </div>

      <div style={{ padding: '8px 12px', backgroundColor: '#1a1d26', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button style={{ backgroundColor: 'transparent', border: '1px solid #444', color: '#ccc', fontSize: '10px', borderRadius: '15px', padding: '2px 10px' }}>
          ⓘ Order Status Meaning
        </button>
        <div style={{ fontSize: '11px' }}>
          Insert PIN for Cancel: <input type="password" value="****" readOnly style={{ width: '50px', backgroundColor: '#131722', border: '1px solid #444', color: 'white', textAlign: 'center', marginLeft: '5px' }} />
        </div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
        <thead>
          <tr>
            <th style={thStyle}>ORDER NO</th>
            <th style={thStyle}>FIS NO</th>
            <th style={thStyle}>SYMBOL</th>
            <th style={thStyle}>TIME</th>
            <th style={thStyle}>SIDE</th>
            <th style={thStyle}>PRICE</th>
            <th style={thStyle}>VOL</th>
            <th style={thStyle}>ICEBERG VOL</th>
            <th style={thStyle}>VALID</th>
            <th style={thStyle}>MATCHED</th>
            <th style={thStyle}>BALANCE</th>
            <th style={thStyle}>CANCELLED</th>
            <th style={thStyle}>STATUS</th>
            <th style={thStyle}>CANCEL</th>
            <th style={thStyle}>DETAIL/ CHANGE</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, i) => (
            <tr key={i}>
              <td style={tdStyle}>{order.id}</td>
              <td style={{ ...tdStyle, color: '#666' }}>{order.fis}</td>
              <td style={{ ...tdStyle, color: '#4da3ff' }}>{order.symbol}</td>
              <td style={tdStyle}>{order.time}</td>
              <td style={tdStyle}>
                <span style={{ color: order.side === 'B' ? '#4caf50' : '#f44336', border: `1px solid ${order.side === 'B' ? '#4caf50' : '#f44336'}`, padding: '0 4px', borderRadius: '2px', fontSize: '10px' }}>
                  {order.side}
                </span>
              </td>
              <td style={tdStyle}>{order.price}</td>
              <td style={tdStyle}>{order.vol}</td>
              <td style={{ ...tdStyle, color: '#666' }}>{order.ice}</td>
              <td style={tdStyle}>{order.valid}</td>
              <td style={tdStyle}>{order.match}</td>
              <td style={tdStyle}>{order.bal}</td>
              <td style={tdStyle}>{order.can}</td>
              <td style={tdStyle}>
                <span style={{ backgroundColor: order.statusColor, padding: '2px 10px', borderRadius: '10px', fontSize: '10px', minWidth: '60px', display: 'inline-block' }}>
                  {order.status}
                </span>
              </td>
              <td style={{ ...tdStyle, color: order.showCancel ? '#f44336' : '#666', cursor: order.showCancel ? 'pointer' : 'default' }}>
                {order.showCancel ? 'Cancel' : '—'}
              </td>
              <td style={{ ...tdStyle, color: '#4da3ff', cursor: 'pointer' }}>{order.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OutstandingOrder;