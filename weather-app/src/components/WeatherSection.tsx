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
  // Filter the hourly data based on the selected time range
  const hourlyData = filterHourlyData(dayData.hours, timeRange);

  // Generate a user-friendly weather message
  const weatherMessage = generateWeatherMessage(dayData.temperature, dayData.rainChance);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        padding: '1rem 0',
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
