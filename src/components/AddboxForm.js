import React, { useState } from 'react';

const countries = [
  { name: 'Sweden', multiplier: 7.35 },
  { name: 'China', multiplier: 11.53 },
  { name: 'Brazil', multiplier: 15.63 },
  { name: 'Australia', multiplier: 50.09 },
];

function rgbFromHex(hex) {
  hex = hex.replace(/^#/, '');
  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;
  return `(${r}, ${g}, ${b})`;
}

export default function AddboxForm({ onAddBox }) {
  const [receiver, setReceiver] = useState('');
  const [weight, setWeight] = useState('');
  const [boxColor, setBoxColor] = useState('#ffffff');
  const [country, setCountry] = useState(countries[0].name);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleWeightChange = (e) => {
    let value = e.target.value;
    if (value < 0) {
      setError('Negative values are not permitted for weight. Defaulted to zero.');
      setWeight(0);
    } else {
      setWeight(value);
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!receiver.trim() || weight === '' || !boxColor || !country) {
      setError('All fields are required.');
      return;
    }
    if (parseFloat(weight) < 0) {
      setError('Negative values are not permitted for weight. Defaulted to zero.');
      setWeight(0);
      return;
    }

    const data = {
      receiver,
      weight,
      boxColor: rgbFromHex(boxColor),
      country,
    };
    if (onAddBox) {
      onAddBox(data);
    }
    setSuccess('Box added successfully!');
    // Reset form
    setReceiver('');
    setWeight('');
    setBoxColor('#ffffff');
    setCountry(countries[0].name);

    // Hide success after 2 seconds
    setTimeout(() => setSuccess(''), 2000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginTop: '2rem',
        maxWidth: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'rgba(255, 255, 255, 0.25)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        padding: '2rem',
        zIndex: 10,
      }}
    >
      <div style={{ marginBottom: '1rem' }}>
        <h2 style={{ textAlign: 'center', color: '#282c34' }}>Add Shipping Box</h2>
      </div>
      {error && (
        <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>
      )}
      {success && (
        <div style={{ color: 'green', marginBottom: '1rem', textAlign: 'center' }}>{success}</div>
      )}
      <div style={{ marginBottom: '1rem' }}>
        <label>Receiver Name:</label>
        <input
          type="text"
          value={receiver}
          onChange={e => setReceiver(e.target.value)}
          required
          style={{ width: '100%' }}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>Weight (kg):</label>
        <input
          type="number"
          value={weight}
          onChange={handleWeightChange}
          required
          min="0"
          step="any"
          style={{ width: '100%' }}
        />
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>Box Colour:</label>
        <input
          type="color"
          value={boxColor}
          onChange={e => setBoxColor(e.target.value)}
          style={{ width: '100%' }}
        />
        <div>RGB: {rgbFromHex(boxColor)}</div>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>Destination Country:</label>
        <select
          value={country}
          onChange={e => setCountry(e.target.value)}
          style={{ width: '100%' }}
        >
          {countries.map(c => (
            <option key={c.name} value={c.name}>
              {c.name} ({c.multiplier} INR)
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        style={{
          width: '100%',
          padding: '0.5rem',
          background: '#61dafb',
          border: 'none',
          fontWeight: 'bold',
        }}
      >
        Save
      </button>
    </form>
  )
}