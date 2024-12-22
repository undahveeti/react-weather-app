// src/components/LocationSelector.tsx
import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

interface Props {
  onLocationSet: (location: string) => void; // Callback to set location in the parent component
}

const LocationSelector: React.FC<Props> = ({ onLocationSet }) => {
  const [location, setLocation] = useState<string>(''); // Local state to manage the input value
  const [successMessage, setSuccessMessage] = useState<string>('');

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
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '2rem',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
      }}
    >
      <Typography variant="h6" sx={{ color: '#333' }}>
        Enter Location:
      </Typography>
      <TextField
        id="location-input"
        label="Location"
        variant="outlined"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="e.g., New York"
        required
        fullWidth
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          background: 'linear-gradient(90deg, #4facfe, #00f2fe)',
          color: '#fff',
          borderRadius: '8px',
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          fontWeight: '600',
          textTransform: 'none',
          '&:hover': {
            background: 'linear-gradient(90deg, #00f2fe, #4facfe)',
          },
        }}
      >
        Set Location
      </Button>
      {successMessage && (
        <Typography
          variant="body2"
          sx={{
            color: successMessage === 'Location set successfully!' ? 'green' : 'red',
            fontSize: '0.9rem',
          }}
        >
          {successMessage}
        </Typography>
      )}
    </Box>
  );
};

export default LocationSelector;
