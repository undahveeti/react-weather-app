import React, { useState } from 'react';
import Header from './components/Header';
import LocationSelector from './components/LocationSelector';
import WeatherCard from './components/WeatherCard';

const App: React.FC = () => {
  const [location, setLocation] = useState('');

  return (
    <div
      style={{
        backgroundColor: '#333',
        minHeight: '100vh',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column', // For mobile view
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1rem',
          gap: '2rem', // Adds spacing between children
        }}
      >
        {/* Location Selector */}
        <LocationSelector onLocationSet={setLocation} />

        {/* Weather Card */}
        {location && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row', // Arrange in row for larger screens
              justifyContent: 'space-evenly',
              alignItems: 'center',
              width: '100%', // Stretch to fill the container
              gap: '2rem',
            }}
          >
            <WeatherCard
              title="This Friday"
              icon="/sunny.png"
              temperature="72°F"
              wind="10 mph"
              rain="0%"
            />
            <WeatherCard
              title="Next Friday"
              icon="/cloudy.png"
              temperature="68°F"
              wind="12 mph"
              rain="20%"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
