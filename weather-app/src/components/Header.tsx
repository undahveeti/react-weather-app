import React from 'react';

/**
 * The Header component renders the static title of the app.
 */
const Header: React.FC = () => {
  return (
    <header
      style={{
        backgroundColor: '#1e1e1e', // Dark background for contrast
        color: '#fff', // White text for readability
        padding: '1rem', // Padding around the header content
        textAlign: 'center', // Center the title text
        fontSize: '1.5rem', // Font size for emphasis
        fontWeight: 'bold', // Bold font style for visual impact
      }}
    >
      Weather App
    </header>
  );
};

export default Header;
