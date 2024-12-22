// src/components/LocationSelector.tsx
import React, { useState } from 'react';

interface Props {
  onLocationSet: (location: string) => void; // Callback to set location in the parent component
}

/**
 * LocationSelector component allows users to input and set a location.
 * @param onLocationSet - A function passed from the parent component to update the selected location.
 */
const LocationSelector: React.FC<Props> = ({ onLocationSet }) => {
  const [location, setLocation] = useState<string>(''); // Local state to manage the input value
  const [successMessage, setSuccessMessage] = useState<string>('');

  /**
   * Handles form submission.
   * Prevents page reload and sends the location to the parent component.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (location.trim()) {
      onLocationSet(location.trim()); // Pass the trimmed location to the parent
      setLocation(''); // Clear the input field after submission
      setSuccessMessage('Location set successfully!');
      setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        width: '100%',
        maxWidth: '300px',
        margin: '1rem auto',
      }}
    >
      <label htmlFor="location-input" style={{ fontSize: '1rem' }}>
        Enter Location:
      </label>
      <input
        id="location-input"
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)} // Update the local state as the user types
        placeholder="e.g., New York"
        style={inputStyle}
        required
      />
      <button type="submit" style={buttonStyle}>
        Set Location
      </button>
      {successMessage && (
        <p style={{ color: 'green', fontSize: '0.9rem', marginTop: '0.5rem' }}>
          {successMessage}
        </p>
      )}
    </form>
  );
};

const inputStyle: React.CSSProperties = {
  padding: '0.5rem',
  borderRadius: '4px',
  border: '1px solid #ccc',
  width: '100%',
  fontSize: '1rem',
};

const buttonStyle: React.CSSProperties = {
  padding: '0.5rem 1rem',
  border: 'none',
  backgroundColor: '#007BFF', // Blue background for the button
  color: '#fff',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '1rem',
};

export default LocationSelector;
