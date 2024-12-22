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

  // Calculate dates for the weather sections (limited to 14 days)
  const dateOffsets = [0, 7, 14]; // Only up to 14 days
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

  const styles: { [key: string]: React.CSSProperties } = {
    appContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      color: '#333',
      padding: '2rem',
    },
    selectorsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      width: '100%',
      maxWidth: '800px',
      margin: '2rem auto',
      gap: '2rem',
    },
    selectedLocation: {
      marginTop: '1rem',
      fontSize: '1rem',
    },
    loadingContainer: {
      display: 'flex',
      height: '50vh',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    errorContainer: {
      display: 'flex',
      height: '50vh',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      color: 'red',
    },
    weatherSectionContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      position: 'relative',
      marginTop: '2rem',
    },
    weatherSections: {
      display: 'flex',
      gap: '2rem',
      overflow: 'hidden',
      width: '100%',
      justifyContent: 'center',
    },
    noData: {
      width: '300px',
      height: '400px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid #ccc',
      borderRadius: '8px',
      backgroundColor: '#f5f5f5',
    },
    arrowButton: {
      position: 'absolute',
      zIndex: 10,
    },
    leftArrow: {
      left: '1rem',
    },
    rightArrow: {
      right: '1rem',
    },
  };

  return (
    <div style={styles.appContainer}>
      <Header />

      {/* Wrapper for LocationSelector and DayTimeSelector */}
      <div style={styles.selectorsContainer}>
        <LocationSelector onLocationSet={setLocation} />
        <DayTimeSelector selection={selection} onSelectionChange={setSelection} />
      </div>

      <p style={styles.selectedLocation}>
        Selected location: {location || 'None'}
      </p>

      {isLoading && (
        <div style={styles.loadingContainer}>
          <p>Loading weather data...</p>
        </div>
      )}

      {error && (
        <div style={styles.errorContainer}>
          <p>Error fetching weather data. Please try again later.</p>
        </div>
      )}

      {location && data && (
        <div style={styles.weatherSectionContainer}>
          {/* Left Arrow */}
          <IconButton
            onClick={() => handleScroll('left')}
            disabled={currentIndex === 0}
            style={{ ...styles.arrowButton, ...styles.leftArrow }}
          >
            <ArrowBackIosIcon />
          </IconButton>

          {/* Weather Sections */}
          <div style={styles.weatherSections}>
            {dates.slice(currentIndex, currentIndex + 2).map((date, index) => {
              const dayData = findDailyData(date);
              return dayData ? (
                <WeatherSection
                  key={index}
                  title={`${
                    selection.day
                  } (${index === 0 ? `${currentIndex * 7} Days Later` : `${
                    (currentIndex + 1) * 7
                  } Days Later`})`}
                  dayData={dayData}
                  timeRange={selection.timeRange}
                />
              ) : (
                <div style={styles.noData} key={index}>
                  <p>No Data Available</p>
                </div>
              );
            })}
          </div>

          {/* Right Arrow */}
          <IconButton
            onClick={() => handleScroll('right')}
            disabled={currentIndex >= dateOffsets.length - 2}
            style={{ ...styles.arrowButton, ...styles.rightArrow }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default App;
