import React, { useState } from 'react';

interface Props {
  onLocationSet: (location: string) => void; // Callback to set location in the parent component
}

/**
 * LocationSelector component allows users to input and set a location.
 * @param onLocationSet - A function passed from the parent component to update the selected location.
 */
const LocationSelector: React.FC<Props> = ({ onLocationSet }) => {
  const [location, setLocation] = useState(''); // Local state to manage the input value

  /**
   * Handles form submission.
   * Prevents page reload and sends the location to the parent component.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (location.trim()) {
      onLocationSet(location); // Pass the location to the parent
      setLocation(''); // Clear the input field after submission
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        margin: '1rem 0',
      }}
    >
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)} // Update the local state as the user types
        placeholder="Enter location"
        style={{
          padding: '0.5rem',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />
      <button
        type="submit"
        style={{
          padding: '0.5rem 1rem',
          border: 'none',
          backgroundColor: '#007BFF', // Blue background for the button
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
