import React, { useState } from 'react';

interface Props {
  onLocationSet: (location: string) => void; // Callback to set location in the parent component
}

const LocationSelector: React.FC<Props> = ({ onLocationSet }) => {
  const [location, setLocation] = useState<string>(''); // Local state to manage the input value
  const [successMessage, setSuccessMessage] = useState<string>('');

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.5rem',
      width: '100%',
      maxWidth: '300px',
      margin: '2rem auto',
    },
    label: {
      fontSize: '1rem',
    },
    input: {
      padding: '0.5rem',
      borderRadius: '4px',
      border: '1px solid #ccc',
      width: '100%',
      fontSize: '1rem',
    },
    button: {
      padding: '0.5rem 1rem',
      border: 'none',
      backgroundColor: '#007BFF',
      color: '#fff',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '1rem',
    },
    successMessage: {
      color: 'green',
      fontSize: '0.9rem',
      marginTop: '0.5rem',
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (!location.trim()) {
      setSuccessMessage('Please enter a valid location.');
      setTimeout(() => setSuccessMessage(''), 3000);
      return;
    }
    onLocationSet(location.trim()); // Pass the trimmed location to the parent
    setLocation(''); // Clear the input field after submission
    setSuccessMessage('Location set successfully!');
    setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
  };

  return (
    <form onSubmit={handleSubmit} style={styles.container}>
      <label htmlFor="location-input" style={styles.label}>
        Enter Location:
      </label>
      <input
        id="location-input"
        aria-label="Enter your location"
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)} // Update the local state as the user types
        placeholder="e.g., New York"
        style={styles.input}
        required
      />
      <button type="submit" style={styles.button}>
        Set Location
      </button>
      {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
    </form>
  );
};

export default LocationSelector;
