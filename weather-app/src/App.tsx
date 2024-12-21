import React, { useState } from 'react';
import Header from './components/Header';
import LocationSelector from './components/LocationSelector';
import WeatherCard from './components/WeatherCard';

/**
 * App component serves as the main container for the app.
 */
const App: React.FC = () => {
  const [location, setLocation] = useState(''); // State to store the selected location

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: '100vh',
        backgroundColor: '#333', // Dark background to match design
        color: '#fff',
        padding: '2rem',
      }}
    >
      <Header />
      <LocationSelector onLocationSet={setLocation} />
      <p style={{ marginTop: '1rem', fontSize: '1rem' }}>
        Selected location: {location || 'None'}
      </p>
      {location && (
        <WeatherCard
          title="This Friday"
          temperature="72°F"
          wind="10 mph"
          rain="5%"
        />
      )}
    </div>
  );
};

export default App;
