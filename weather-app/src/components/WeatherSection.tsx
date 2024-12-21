import React from 'react';
import WeatherCard from './WeatherCard';
import WeatherChart from './WeatherChart';

interface WeatherSectionProps {
  title: string; // Title for the section (e.g., "This Friday")
  weatherData: {
    temperature: string;
    wind: string;
    rain: string;
  }; // Data for the WeatherCard
  chartData: {
    times: string[];
    temperatures: number[];
    winds: number[];
    rainChances: number[];
  }; // Data for the WeatherChart
}

/**
 * WeatherSection combines a WeatherCard and WeatherChart in a reusable layout.
 */
const WeatherSection: React.FC<WeatherSectionProps> = ({ title, weatherData, chartData }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      {/* Weather Card */}
      <WeatherCard
        title={title}
        temperature={weatherData.temperature}
        wind={weatherData.wind}
        rain={weatherData.rain}
      />

      {/* Weather Chart */}
      <WeatherChart data={chartData} />
    </div>
  );
};

export default WeatherSection;
