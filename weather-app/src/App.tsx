// src/App.tsx
import React, { useState } from 'react';
import Header from './components/Header';
import LocationSelector from './components/LocationSelector';
import DayTimeSelector from './components/DayTimeSelector';
import WeatherSection from './components/WeatherSection';
import { useWeatherData } from './hooks/useWeatherData';
import { getDateForDay } from './utils/dateHelpers';
import { IconButton, Grid, Box, Typography, CircularProgress, Alert } from '@mui/material';
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
      }}
    >
      <Header />

      {/* Wrapper for LocationSelector and DayTimeSelector */}
      <Grid
        container
        spacing={4}
        sx={{
          width: '100%',
          maxWidth: '800px',
          margin: '2rem auto',
        }}
      >
        <Grid item xs={12} md={6}>
          <LocationSelector onLocationSet={setLocation} />
        </Grid>
        <Grid item xs={12} md={6}>
          <DayTimeSelector selection={selection} onSelectionChange={setSelection} />
        </Grid>
      </Grid>

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
        <Box sx={{ width: '100%', maxWidth: '1200px', marginTop: '2rem' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            {/* Left Arrow */}
            <IconButton
              onClick={() => handleScroll('left')}
              disabled={currentIndex === 0}
              sx={{
                position: 'absolute',
                left: '0',
                zIndex: 10,
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>

            {/* Weather Sections */}
            <Box
              sx={{
                display: 'flex',
                gap: '2rem',
                overflow: 'hidden',
                width: '100%',
                justifyContent: 'center',
              }}
            >
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
                  <Box
                    key={index}
                    sx={{
                      width: '300px',
                      height: '400px',
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
              })}
            </Box>

            {/* Right Arrow */}
            <IconButton
              onClick={() => handleScroll('right')}
              disabled={currentIndex >= dateOffsets.length - 2}
              sx={{
                position: 'absolute',
                right: '0',
                zIndex: 10,
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default App;
