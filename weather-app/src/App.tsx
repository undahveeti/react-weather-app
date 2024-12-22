import React, { useState } from 'react';
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

  // Calculate the selected day's date
  const selectedDate = getDateForDay(selection.day, data?.daily);

  // Calculate the next week's date for the same day
  const nextWeekDate = selectedDate
    ? new Date(new Date(selectedDate).getTime() + 7 * 24 * 60 * 60 * 1000) // Add 7 days
        .toISOString()
        .split('T')[0] // Format to YYYY-MM-DD
    : undefined;

  // Helper function to find daily data based on the selected date
  const findDailyData = (date: string | undefined, weatherData: WeatherData | undefined): DailyData | undefined => {
    if (!date || !weatherData) return undefined;
    return weatherData.daily.find((day) => day.date === date);
  };

  const dailyData = findDailyData(selectedDate, data);
  const nextWeekDailyData = findDailyData(nextWeekDate, data);

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
          {/* This Day Section */}
          {dailyData && (
            <WeatherSection
              title={`This ${selection.day}, ${dailyData.date}`}
              dayData={dailyData}
              timeRange={selection.timeRange}
            />
          )}

          {/* Next Week Section */}
          {nextWeekDailyData && (
            <WeatherSection
              title={`Next ${selection.day}, ${nextWeekDailyData.date}`}
              dayData={nextWeekDailyData}
              timeRange={selection.timeRange}
            />
          )}
        </div>
      )}
    </Container>
  );
};

export default App;
