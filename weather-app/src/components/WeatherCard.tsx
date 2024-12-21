// weather summary temp wind rain for this week and next week

import React from 'react';

interface WeatherCardProps {
  title: string; // Title for the card (e.g., "This Friday")
  temperature: string; // Displayed temperature (e.g., "72°F")
  wind: string; // Wind speed (e.g., "10 mph")
  rain: string; // Rain chance (e.g., "5%")
}

/**
 * WeatherCard displays summarized weather data for a specific day.
 */
const WeatherCard: React.FC<WeatherCardProps> = ({ title, temperature, wind, rain }) => {
  return (
    <div
      style={{
        backgroundColor: '#444', // Dark gray background
        color: '#fff', // White text for readability
        padding: '1.5rem',
        borderRadius: '8px', // Rounded corners for modern design
        maxWidth: '300px', // Limit width for consistent layout
        textAlign: 'center', // Center align the content
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
        margin: '1rem auto', // Center the card horizontally
      }}
    >
      <h3 style={{ margin: '0 0 1rem' }}>{title}</h3>
      <p style={{ margin: '0.5rem 0' }}>Temperature: {temperature}</p>
      <p style={{ margin: '0.5rem 0' }}>Wind: {wind}</p>
      <p style={{ margin: '0.5rem 0' }}>Rain: {rain}</p>
    </div>
  );
};

export default WeatherCard;
