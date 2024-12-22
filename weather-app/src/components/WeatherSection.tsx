import React from 'react';
import WeatherCard from './WeatherCard';
import WeatherChart from './WeatherChart';
import { filterHourlyData, generateWeatherMessage } from '../utils/helpers';
import { DailyData } from '../hooks/useWeatherData';
import { Box } from '@mui/material';

interface WeatherSectionProps {
  title: string;
  dayData: DailyData;
  timeRange: 'morning' | 'afternoon' | 'evening';
}

const WeatherSection: React.FC<WeatherSectionProps> = ({ title, dayData, timeRange }) => {
  const hourlyData = filterHourlyData(dayData.hours, timeRange);

  const { message: weatherMessage, weatherType } = generateWeatherMessage(
    dayData.temperature,
    dayData.rainChance
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '500px',
        padding: '1rem',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        margin: '0 auto',
        flexShrink: 0,
      }}
    >
      <WeatherCard
        title={title}
        temperature={`${dayData.temperature}°F`}
        wind={`${dayData.wind} mph`}
        rain={`${dayData.rainChance}%`}
        weatherMessage={weatherMessage}
        weatherType={weatherType}
      />
      <WeatherChart data={hourlyData} />
    </Box>
  );
};

export default WeatherSection;
