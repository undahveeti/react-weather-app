import React, { useState } from 'react';
import Header from './components/Header';
import LocationSelector from './components/LocationSelector';
import DayTimeSelector from './components/DayTimeSelector';
import WeatherCard from './components/WeatherCard';
import WeatherChart from './components/WeatherChart';

const App: React.FC = () => {
  const [location, setLocation] = useState('');
  const [selection, setSelection] = useState({ day: 'Friday', timeRange: 'afternoon' }); // Default selection

  const mockHourlyData = {
    times: ['8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM'],
    temperatures: [72, 74, 75, 73, 70, 68, 67, 66, 65],
    winds: [10, 12, 11, 9, 8, 7, 6, 5, 4],
    rainChances: [5, 10, 15, 10, 5, 20, 25, 30, 35],
  };

  const filterHourlyData = (timeRange: 'morning' | 'afternoon' | 'evening') => {
    const timeRangeIndexes = {
      morning: [0, 1, 2, 3],
      afternoon: [4, 5, 6],
      evening: [7, 8],
    };

    const indexes = timeRangeIndexes[timeRange];
    return {
      times: indexes.map((i) => mockHourlyData.times[i]),
      temperatures: indexes.map((i) => mockHourlyData.temperatures[i]),
      winds: indexes.map((i) => mockHourlyData.winds[i]),
      rainChances: indexes.map((i) => mockHourlyData.rainChances[i]),
    };
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
      <DayTimeSelector onSelectionChange={setSelection} />
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
            justifyContent: 'center',
            width: '100%',
          }}
        >
          {/* This Friday Weather */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <WeatherCard
              title={`This ${selection.day}`}
              temperature="72°F"
              wind="10 mph"
              rain="5%"
            />
            <WeatherChart data={filterHourlyData(selection.timeRange as 'morning' | 'afternoon' | 'evening')} />
          </div>

          {/* Next Friday Weather */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <WeatherCard
              title={`Next ${selection.day}`}
              temperature="68°F"
              wind="8 mph"
              rain="20%"
            />
            <WeatherChart data={filterHourlyData(selection.timeRange as 'morning' | 'afternoon' | 'evening')} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
