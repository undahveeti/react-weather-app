import React, { useState } from 'react';
import Header from './components/Header';
import LocationSelector from './components/LocationSelector';
import DayTimeSelector from './components/DayTimeSelector';
import WeatherCard from './components/WeatherCard';
import WeatherChart from './components/WeatherChart';
import { useWeatherData } from './hooks/useWeatherData';

const App: React.FC = () => {
  const [inputLocation, setInputLocation] = useState(''); // Input field for location
  const [location, setLocation] = useState(''); // Validated location for fetching
  const [selection, setSelection] = useState<{ day: string; timeRange: 'morning' | 'afternoon' | 'evening' }>({
    day: 'Friday',
    timeRange: 'afternoon',
  });

  // Fetch weather data using the custom hook
  const { data, isLoading, error } = useWeatherData(location);

  // Helper function to filter hourly data based on the selected time range
  const filterHourlyData = (range: 'morning' | 'afternoon' | 'evening') => {
    if (!data?.hourly) return { times: [], temperatures: [], winds: [], rainChances: [] };

    const timeRangeIndexes = {
      morning: [8, 9, 10, 11],
      afternoon: [12, 13, 14, 15],
      evening: [17, 18, 19, 20],
    };

    const indexes = timeRangeIndexes[range];
    return {
      times: indexes.map((i) => data.hourly.times[i] ?? ''),
      temperatures: indexes.map((i) => data.hourly.temperatures[i] ?? 0),
      winds: indexes.map((i) => data.hourly.winds[i] ?? 0),
      rainChances: indexes.map((i) => data.hourly.rainChances[i] ?? 0),
    };
  };

  // Handle loading and error states
  if (isLoading) return <p>Loading weather data...</p>;
  if (error) return <p>Error fetching weather data. Please try again later.</p>;

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
      {/* Header */}
      <Header />

      {/* Location Input */}
      <LocationSelector
        onLocationSet={(newLocation) => setInputLocation(newLocation)} // Update input state
      />
      <button
        onClick={() => setLocation(inputLocation)} // Submit location
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Fetch Weather
      </button>

      {/* Time Range Selector */}
      <DayTimeSelector
        onSelectionChange={(newSelection) => setSelection(newSelection)} // Update both day and timeRange
      />

      <p style={{ marginTop: '1rem', fontSize: '1rem' }}>
        Selected location: {location || 'None'}
      </p>

      {/* Weather Data Section */}
      {location && data && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row', // Align "This Day" and "Next Day" sections horizontally
            gap: '2rem',
            marginTop: '2rem',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          {/* This Day Section */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <WeatherCard
              title={`This ${selection.day}`}
              temperature={`${data.daily[0]?.temperature ?? 'N/A'}°F`}
              wind={`${data.daily[0]?.wind ?? 'N/A'} mph`}
              rain={`${data.daily[0]?.rainChance ?? 'N/A'}%`}
            />
            <WeatherChart data={filterHourlyData(selection.timeRange)} />
          </div>

          {/* Next Day Section */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <WeatherCard
              title={`Next ${selection.day}`}
              temperature={`${data.daily[1]?.temperature ?? 'N/A'}°F`}
              wind={`${data.daily[1]?.wind ?? 'N/A'} mph`}
              rain={`${data.daily[1]?.rainChance ?? 'N/A'}%`}
            />
            <WeatherChart data={filterHourlyData(selection.timeRange)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
