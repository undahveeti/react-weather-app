// src/components/Header.tsx
import React from 'react';

/**
 * Header component displays the application title.
 */
const Header: React.FC = () => {
  return (
    <header
      style={{
        width: '100%',
        padding: '1rem 0',
        textAlign: 'center',
        backgroundColor: '#333',
        color: '#fff',
        marginBottom: '1rem',
      }}
    >
      <h1>Weather Forecast App</h1>
    </header>
  );
};

export default Header;
