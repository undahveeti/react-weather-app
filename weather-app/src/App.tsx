import React, { useState } from 'react';
import Header from './components/Header';
import LocationSelector from './components/LocationSelector';

/**
 * App component serves as the main container for the app.
 */
const App: React.FC = () => {
  const [location, setLocation] = useState(''); // State to hold the selected location

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: '100vh',
        backgroundColor: '#333',
        color: '#fff',
      }}
    >
      <Header />
      <LocationSelector onLocationSet={setLocation} />
      <p
        style={{
          marginTop: '1rem',
          fontSize: '1rem',
        }}
      >
        Selected location: {location || 'None'}
      </p>
    </div>
  );
};

export default App;
