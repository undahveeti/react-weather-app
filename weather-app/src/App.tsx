import React, { useState } from 'react';
import Header from './components/Header';
import LocationSelector from './components/LocationSelector';
import DayTimeSelector from './components/DayTimeSelector';
import WeatherSection from './components/WeatherSection';
import { useWeatherData } from './hooks/useWeatherData';
import { getDateForDay } from './utils/dateHelpers';
import { IconButton, Box, Typography, CircularProgress, Alert } from '@mui/material';
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

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { data, isLoading, error } = useWeatherData(location);

  const selectedDate = getDateForDay(selection.day, data?.daily);

  // Calculate dates for the weather sections
  const dateOffsets = [0, 7, 14];
  const dates = dateOffsets.map((offset) =>
    selectedDate
      ? new Date(new Date(selectedDate).getTime() + offset * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0]
      : undefined
  );

  const handleScroll = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    } else {
      setCurrentIndex((prev) => Math.min(prev + 1, dateOffsets.length - 1));
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        color: '#333',
        padding: '2rem',
        overflowX: 'hidden',
      }}
    >
      <Header />

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          justifyContent: 'center',
          alignItems: 'flex-start',
          width: '100%',
          maxWidth: '800px',
          margin: '2rem auto',
        }}
      >
        <LocationSelector onLocationSet={setLocation} />
        <DayTimeSelector selection={selection} onSelectionChange={setSelection} />
      </Box>

      <Typography variant="body1" sx={{ marginTop: '1rem' }}>
        Selected location: {location || 'None'}
      </Typography>

      {isLoading && (
        <Box
          sx={{
            display: 'flex',
            height: '50vh',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <CircularProgress />
          <Typography variant="h6" sx={{ marginLeft: '1rem' }}>
            Loading weather data...
          </Typography>
        </Box>
      )}

      {error && (
        <Box
          sx={{
            display: 'flex',
            height: '50vh',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Alert severity="error">Error fetching weather data. Please try again later.</Alert>
        </Box>
      )}

      {location && data && (
        <Box
          className="weather-sections-container"
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' }, // Column for mobile, row for desktop
            gap: { xs: '0', md: '1.5rem' },
            overflowX: { xs: 'hidden', md: 'visible' }, // Prevent horizontal scrolling on desktop
            width: '100%',
            justifyContent: 'center',
            alignItems: 'flex-start',
            position: 'relative',
          }}
        >
          {dates.map((date, index) => {
            const dayData = data.daily.find((day) => day.date === date);
            const title =
              index === 0
                ? `This ${selection.day}`
                : index === 1
                ? `Next ${selection.day}`
                : `${index * 7} Days Later`;

            if (index === currentIndex || index === currentIndex + 1) {
              return dayData ? (
                <WeatherSection
                  key={index}
                  title={title}
                  dayData={dayData}
                  timeRange={selection.timeRange}
                />
              ) : (
                <Box
                  key={index}
                  sx={{
                    width: '500px',
                    height: '300px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    backgroundColor: '#f5f5f5',
                  }}
                >
                  <Typography>No Data Available</Typography>
                </Box>
              );
            }
            return null;
          })}

          {/* Left Arrow */}
          <IconButton
            onClick={() => handleScroll('left')}
            disabled={currentIndex === 0}
            sx={{
              position: 'absolute',
              left: '-25px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              backgroundColor: '#fff',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              display: 'block', // Always show arrows
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>

          {/* Right Arrow */}
          <IconButton
            onClick={() => handleScroll('right')}
            disabled={currentIndex >= dateOffsets.length - 1}
            sx={{
              position: 'absolute',
              right: '-25px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              backgroundColor: '#fff',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              display: 'block', // Always show arrows
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default App;

