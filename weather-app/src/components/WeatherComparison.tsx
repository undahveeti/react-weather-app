import React from 'react';
import WeatherCard from './WeatherCard';
import WeatherChart from './WeatherChart';
import { useWeatherData } from '../hooks/useWeatherData';

interface Props {
  location: string;
}

const WeatherComparison: React.FC<Props> = ({ location }) => {
  const { data, isLoading, error } = useWeatherData(location);

  if (isLoading) {
    return <p style={{ textAlign: 'center', color: '#999' }}>Loading weather data...</p>;
  }

  if (error) {
    return (
      <p style={{ textAlign: 'center', color: 'red' }}>
        Unable to fetch weather data. Please try again later.
      </p>
    );
  }

  if (!data) {
    return (
      <p style={{ textAlign: 'center', color: '#999' }}>
        No weather data available. Please check your location input.
      </p>
    );
  }

  return (
    <div className="grid-container">
      {/* This Friday */}
      <div>
        <WeatherCard
          title={`This Friday (${data.daily[0].date})`}
          icon="/sunny.png"
          temperature={`${data.daily[0].temperature}°F`}
          wind={`${data.daily[0].wind} mph`}
          rain={`${data.daily[0].rainChance}%`}
        />
        <WeatherChart data={data.hourly.thisWeek} />
      </div>

      {/* Next Friday */}
      <div>
        <WeatherCard
          title={`Next Friday (${data.daily[1].date})`}
          icon="/cloudy.png"
          temperature={`${data.daily[1].temperature}°F`}
          wind={`${data.daily[1].wind} mph`}
          rain={`${data.daily[1].rainChance}%`}
        />
        <WeatherChart data={data.hourly.nextWeek} />
      </div>
    </div>
  );
};

export default WeatherComparison;
