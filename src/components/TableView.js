import React from 'react';

const countryMultipliers = {
  Sweden: 7.35,
  China: 11.53,
  Brazil: 15.63,
  Australia: 50.09,
};

// Helper to convert "(r, g, b)" to "rgb(r, g, b)"
function rgbString(rgbTuple) {
  return `rgb${rgbTuple}`;
}

function TableView({ boxes }) {
  return (
    <div style={{ marginTop: '5rem', maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(255,255,255,0.85)', borderRadius: '12px', overflow: 'hidden' }}>
        <thead>
          <tr style={{ background: '#61dafb', color: '#282c34' }}>
            <th style={{ padding: '0.75rem', border: '1px solid #e0e0e0' }}>Receiver Name</th>
            <th style={{ padding: '0.75rem', border: '1px solid #e0e0e0' }}>Weight (kg)</th>
            <th style={{ padding: '0.75rem', border: '1px solid #e0e0e0' }}>Box Colour</th>
            <th style={{ padding: '0.75rem', border: '1px solid #e0e0e0' }}>Destination Country</th>
            <th style={{ padding: '0.75rem', border: '1px solid #e0e0e0' }}>Shipping Cost (INR)</th>
          </tr>
        </thead>
        <tbody>
          {boxes.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center', padding: '1rem', color: '#888' }}>
                No boxes added yet.
              </td>
            </tr>
          ) : (
            boxes.map((box, idx) => {
              // box.boxColor is in format "(r, g, b)"
              const cost = (parseFloat(box.weight || 0) * (countryMultipliers[box.country] || 0)).toLocaleString('en-IN', {
                style: 'currency',
                currency: 'INR',
                minimumFractionDigits: 2,
              });
              return (
                <tr key={idx}>
                  <td style={{ padding: '0.75rem', border: '1px solid #e0e0e0' }}>{box.receiver}</td>
                  <td style={{ padding: '0.75rem', border: '1px solid #e0e0e0' }}>{box.weight}</td>
                  <td style={{ padding: '0.75rem', border: '1px solid #e0e0e0' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        width: 28,
                        height: 28,
                        borderRadius: 6,
                        border: '1px solid #ccc',
                        background: rgbString(box.boxColor),
                        verticalAlign: 'middle',
                      }}
                      title={box.boxColor}
                    ></span>
                  </td>
                  <td style={{ padding: '0.75rem', border: '1px solid #e0e0e0' }}>{box.country}</td>
                  <td style={{ padding: '0.75rem', border: '1px solid #e0e0e0' }}>{cost}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TableView;