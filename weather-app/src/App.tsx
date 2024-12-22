import React, { useState } from 'react';
import Header from './components/Header';
import LocationSelector from './components/LocationSelector';
import DayTimeSelector from './components/DayTimeSelector';
import WeatherSection from './components/WeatherSection';
import { useWeatherData } from './hooks/useWeatherData';
import { getDateForDay } from './utils/dateHelpers';
import { IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const App: React.FC = () => {
  const [location, setLocation] = useState<string>('');
  const [selection, setSelection] = useState<{
    day: string;
    timeRange: 'morning' | 'afternoon' | 'evening';
  }>({
    day: 'Friday',
    timeRange: 'afternoon',
  });

  const [currentIndex, setCurrentIndex] = useState<number>(0); // Track the current scroll index
  const { data, isLoading, error } = useWeatherData(location);

  const selectedDate = getDateForDay(selection.day, data?.daily);

  // Calculate dates for the weather sections
  const dateOffsets = [0, 7, 14, 21];
  const dates = dateOffsets.map((offset) =>
    selectedDate
      ? new Date(new Date(selectedDate).getTime() + offset * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0]
      : undefined
  );

  // Helper function to find daily data based on the selected date
  const findDailyData = (date: string | undefined) => {
    if (!date || !data) return null;
    return data.daily.find((day) => day.date === date) || null;
  };

  // Handle scrolling
  const handleScroll = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    } else {
      setCurrentIndex((prev) => Math.min(prev + 1, dateOffsets.length - 2));
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        color: '#333',
        padding: '2rem',
      }}
    >
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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            position: 'relative',
            marginTop: '2rem',
          }}
        >
          {/* Left Arrow */}
          <IconButton
            onClick={() => handleScroll('left')}
            disabled={currentIndex === 0}
            style={{ position: 'absolute', left: '1rem', zIndex: 10 }}
          >
            <ArrowBackIosIcon />
          </IconButton>

          {/* Weather Sections */}
          <div
            style={{
              display: 'flex',
              gap: '2rem',
              overflow: 'hidden',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            {findDailyData(dates[currentIndex]) && (
              <WeatherSection
                title={`${selection.day} (This Week)`}
                dayData={findDailyData(dates[currentIndex])!}
                timeRange={selection.timeRange}
              />
            )}
            {findDailyData(dates[currentIndex + 1]) && (
              <WeatherSection
                title={`${selection.day} (Next Week)`}
                dayData={findDailyData(dates[currentIndex + 1])!}
                timeRange={selection.timeRange}
              />
            )}
          </div>

          {/* Right Arrow */}
          <IconButton
            onClick={() => handleScroll('right')}
            disabled={currentIndex >= dateOffsets.length - 2}
            style={{ position: 'absolute', right: '1rem', zIndex: 10 }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default App;
