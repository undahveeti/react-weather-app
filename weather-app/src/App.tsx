import React, { useState } from 'react';
import Header from './components/Header';
import LocationSelector from './components/LocationSelector';
import DayTimeSelector from './components/DayTimeSelector';
import WeatherSection from './components/WeatherSection';
import { useWeatherData } from './hooks/useWeatherData';
import { getDateForDay } from './utils/dateHelpers';
import Carousel from './components/Carousel';

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
  const selectedDate = getDateForDay(selection.day, data?.daily);

  const nextWeekDate = selectedDate
    ? new Date(new Date(selectedDate).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    : undefined;

  const fourteenDaysLaterDate = selectedDate
    ? new Date(new Date(selectedDate).getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    : undefined;

  const twentyOneDaysLaterDate = selectedDate
    ? new Date(new Date(selectedDate).getTime() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    : undefined;

  const findDailyData = (date: string | undefined) => {
    if (!date || !data) return null;
    return data.daily.find((day) => day.date === date) || null;
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
        <Carousel>
          {findDailyData(selectedDate) && (
            <WeatherSection
              title={`${selection.day} (This Week)`}
              dayData={findDailyData(selectedDate)!}
              timeRange={selection.timeRange}
            />
          )}
          {findDailyData(nextWeekDate) && (
            <WeatherSection
              title={`${selection.day} (Next Week)`}
              dayData={findDailyData(nextWeekDate)!}
              timeRange={selection.timeRange}
            />
          )}
          {findDailyData(fourteenDaysLaterDate) && (
            <WeatherSection
              title={`${selection.day} (14 Days Later)`}
              dayData={findDailyData(fourteenDaysLaterDate)!}
              timeRange={selection.timeRange}
            />
          )}
          {findDailyData(twentyOneDaysLaterDate) && (
            <WeatherSection
              title={`${selection.day} (21 Days Later)`}
              dayData={findDailyData(twentyOneDaysLaterDate)!}
              timeRange={selection.timeRange}
            />
          )}
        </Carousel>
      )}
    </div>
  );
};

export default App;
