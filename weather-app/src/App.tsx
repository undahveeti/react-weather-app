import React, { useState, useRef } from 'react';
import Header from './components/Header';
import LocationSelector from './components/LocationSelector';
import DayTimeSelector from './components/DayTimeSelector';
import WeatherSection from './components/WeatherSection';
import { useWeatherData, WeatherData, DailyData } from './hooks/useWeatherData';
import { getDateForDay } from './utils/dateHelpers';
import Container from './components/Container';

const App: React.FC = () => {
  const [location, setLocation] = useState<string>('');
  const [selection, setSelection] = useState<{
    day: string;
    timeRange: 'morning' | 'afternoon' | 'evening';
  }>({
    day: 'Friday',
    timeRange: 'afternoon',
  });

  const { data, isLoading, error } = useWeatherData(location);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const findDailyData = (offset: number, weatherData: WeatherData | undefined): DailyData | undefined => {
    if (!weatherData || !weatherData.daily) return undefined;
    return weatherData.daily[offset];
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = direction === 'left' ? -300 : 300;
    scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <Container>
      <Header />
      <LocationSelector onLocationSet={setLocation} />
      <DayTimeSelector selection={selection} onSelectionChange={setSelection} />

      <p style={{ marginTop: '1rem', fontSize: '1rem' }}>
        Selected location: {location || 'None'}
      </p>

      {isLoading && (
        <div
          style={{
            display: 'flex',
            height: '50vh',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <p>Loading weather data...</p>
        </div>
      )}

      {error && (
        <div
          style={{
            display: 'flex',
            height: '50vh',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <p>Error fetching weather data. Please try again later.</p>
        </div>
      )}

      {location && data && (
        <div
          style={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
            padding: '2rem 0',
          }}
        >
          <button
            style={{
              position: 'absolute',
              left: '0',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: '#007BFF',
              color: '#fff',
              border: 'none',
              padding: '1rem',
              cursor: 'pointer',
              zIndex: 10,
            }}
            onClick={() => handleScroll('left')}
          >
            &lt;
          </button>

          <div
            ref={scrollContainerRef}
            style={{
              display: 'flex',
              gap: '2rem',
              overflowX: 'scroll',
              scrollBehavior: 'smooth',
              padding: '1rem',
            }}
          >
            <WeatherSection
              title={`This ${selection.day}`}
              dayData={findDailyData(0, data)}
              timeRange={selection.timeRange}
            />
            <WeatherSection
              title={`Next ${selection.day}`}
              dayData={findDailyData(7, data)}
              timeRange={selection.timeRange}
            />
            <WeatherSection
              title={`${selection.day} (14 days later)`}
              dayData={findDailyData(14, data)}
              timeRange={selection.timeRange}
            />
            <WeatherSection
              title={`${selection.day} (21 days later)`}
              dayData={findDailyData(21, data)}
              timeRange={selection.timeRange}
            />
          </div>

          <button
            style={{
              position: 'absolute',
              right: '0',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: '#007BFF',
              color: '#fff',
              border: 'none',
              padding: '1rem',
              cursor: 'pointer',
              zIndex: 10,
            }}
            onClick={() => handleScroll('right')}
          >
            &gt;
          </button>
        </div>
      )}
    </Container>
  );
};

export default App;
