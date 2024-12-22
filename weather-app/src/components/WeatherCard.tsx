// src/components/WeatherCard.tsx
import React from 'react';

interface WeatherCardProps {
  title: string;
  temperature: string;
  wind: string;
  rain: string;
  weatherMessage: string;
}

/**
 * WeatherCard displays summarized weather data for a specific day.
 */
const WeatherCard: React.FC<WeatherCardProps> = React.memo(
  ({
    title = 'N/A',
    temperature = 'N/A',
    wind = 'N/A',
    rain = 'N/A',
    weatherMessage = 'N/A',
  }) => {
    return (
      <div
        style={{
          backgroundColor: '#444',
          color: '#fff',
          padding: '1.5rem',
          borderRadius: '8px',
          width: '100%',
          maxWidth: '300px',
          textAlign: 'center',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          margin: '1rem auto',
        }}
      >
        <h3 style={{ margin: '0 0 1rem', fontSize: '1.5rem', fontWeight: 'bold' }}>{title}</h3>
        <p style={{ margin: '0.5rem 0', fontSize: '1.2rem' }}>Temperature: {temperature}</p>
        <p style={{ margin: '0.5rem 0', fontSize: '1.2rem' }}>Wind: {wind}</p>
        <p style={{ margin: '0.5rem 0', fontSize: '1.2rem' }}>Rain Chance: {rain}</p>
        <p style={{ marginTop: '1rem', fontStyle: 'italic', fontSize: '1rem' }}>{weatherMessage}</p>
      </div>
    );
  }
);

export default WeatherCard;
