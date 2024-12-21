import React, { useState } from 'react';
import Header from './components/Header';
import LocationSelector from './components/LocationSelector';
import WeatherSection from './components/WeatherSection';

const App: React.FC = () => {
  const [location, setLocation] = useState(''); // State to hold the selected location

  // Mock data for testing the WeatherSection
  const mockThisFridayData = {
    temperature: '72°F',
    wind: '10 mph',
    rain: '5%',
  };

  const mockNextFridayData = {
    temperature: '68°F',
    wind: '8 mph',
    rain: '10%',
  };

  const mockHourlyData = {
    times: ['12 PM', '1 PM', '2 PM', '3 PM', '4 PM'],
    temperatures: [72, 74, 75, 73, 70],
    winds: [10, 12, 11, 9, 8],
    rainChances: [5, 10, 15, 10, 5],
  };

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
        padding: '2rem',
      }}
    >
      <Header />
      <LocationSelector onLocationSet={setLocation} />
      <p style={{ marginTop: '1rem', fontSize: '1rem' }}>
        Selected location: {location || 'None'}
      </p>
      {location && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '2rem',
            marginTop: '2rem',
          }}
        >
          {/* This Friday Section */}
          <WeatherSection
            title="This Friday"
            weatherData={mockThisFridayData}
            chartData={mockHourlyData}
          />

          {/* Next Friday Section */}
          <WeatherSection
            title="Next Friday"
            weatherData={mockNextFridayData}
            chartData={mockHourlyData}
          />
        </div>
      )}
    </div>
  );
};

export default App;
