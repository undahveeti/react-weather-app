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
    <form onSubmit={handleSubmit} style={{ margin: '1rem', textAlign: 'center' }}>
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        style={{ padding: '0.5rem', width: '300px' }}
      />
      <button type="submit" style={{ padding: '0.5rem 1rem', marginLeft: '0.5rem' }}>
        Set Location
      </button>
    </form>
  );
};

export default LocationSelector;
