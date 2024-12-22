import React from 'react';
import WeatherCard from './WeatherCard';
import WeatherChart from './WeatherChart';
import { filterHourlyData, generateWeatherMessage } from '../utils/helpers';
import { DailyData } from '../hooks/useWeatherData';

interface WeatherSectionProps {
  title: string;
  dayData: DailyData;
  timeRange: 'morning' | 'afternoon' | 'evening';
}

const WeatherSection: React.FC<WeatherSectionProps> = ({ title, dayData, timeRange }) => {
  const hourlyData = filterHourlyData(dayData.hours, timeRange);
  console.log('Filtered Data:', hourlyData); // Debugging log
  const weatherMessage = generateWeatherMessage(dayData.temperature, dayData.rainChance);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between ',
        width: '600px', // Fixed width
        height: '600px', // Fixed height
        padding: '1rem',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <WeatherCard
        title={title}
        temperature={`${dayData.temperature}°F`}
        wind={`${dayData.wind} mph`}
        rain={`${dayData.rainChance}%`}
        weatherMessage={weatherMessage}
      />
      <WeatherChart data={hourlyData} />
    </div>
  );
};

export default WeatherSection;