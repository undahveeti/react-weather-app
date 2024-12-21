import React, { useState } from 'react';
import Header from './components/Header';
import LocationSelector from './components/LocationSelector';
import WeatherCard from './components/WeatherCard';

const App: React.FC = () => {
  const [location, setLocation] = useState('');

  return (
    <div style={{ backgroundColor: '#333', minHeight: '100vh', color: '#fff', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
        <LocationSelector onLocationSet={setLocation} />
        {location && (
          <>
            <WeatherCard
              title="This Friday"
              icon="/sunny.png"
              temperature="72°F"
              wind="10 mph"
              rain="0%"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
