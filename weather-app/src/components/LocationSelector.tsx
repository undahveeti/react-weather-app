import React, { useState } from 'react';

interface Props {
  onLocationSet: (location: string) => void;
}

const LocationSelector: React.FC<Props> = ({ onLocationSet }) => {
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      onLocationSet(location);
      setLocation('');
    }
  };

  return (
    <form
  onSubmit={handleSubmit}
  style={{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '1rem', // Spacing between input and button
    width: '100%', // Full width of parent
    maxWidth: '400px', // Restrict maximum width for readability
  }}
>
  <input
    type="text"
    placeholder="Enter location"
    value={location}
    onChange={(e) => setLocation(e.target.value)}
    style={{
      padding: '0.5rem',
      flex: 1, // Input takes all available space
      borderRadius: '4px',
      border: '1px solid #ccc',
    }}
  />
  <button
    type="submit"
    style={{
      padding: '0.5rem 1rem',
      border: 'none',
      backgroundColor: '#007BFF',
      color: '#fff',
      borderRadius: '4px',
      cursor: 'pointer',
    }}
  >
    Set Location
  </button>
</form>

  );
};

export default LocationSelector;
