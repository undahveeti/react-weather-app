import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface WeatherCardProps {
  title: string;
  icon: string; // Icon URL
  temperature: string;
  wind: string;
  rain: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ title, icon, temperature, wind, rain }) => (
    <Card
    style={{
      margin: '1rem',
      flex: 1, // Make card take up equal space as LocationSelector
      maxWidth: '400px', // Restrict maximum width for readability
      backgroundColor: '#444',
      color: '#fff',
    }}
  >
  
    <CardContent>
      <Typography variant="h6">{title}</Typography>
      <img src={icon} alt="Weather icon" style={{ width: '50px', margin: '10px 0' }} />
      <Typography>Temp: {temperature}</Typography>
      <Typography>Wind: {wind}</Typography>
      <Typography>Rain: {rain}</Typography>
    </CardContent>
  </Card>
);

export default WeatherCard;
