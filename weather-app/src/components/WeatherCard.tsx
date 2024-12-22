import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';

interface WeatherCardProps {
  title: string;
  temperature: string;
  wind: string;
  rain: string;
  weatherMessage: string;
  weatherType: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'stormy';
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  title,
  temperature,
  wind,
  rain,
  weatherMessage,
  weatherType,
}) => {
  const renderWeatherIcon = () => {
    switch (weatherType) {
      case 'sunny':
        return <WbSunnyIcon fontSize="large" sx={{ color: '#FFD700' }} />; // Gold for sunny
      case 'cloudy':
        return <CloudIcon fontSize="large" sx={{ color: '#B0C4DE' }} />; // LightSteelBlue for cloudy
      case 'rainy':
        return <CloudIcon fontSize="large" sx={{ color: '#6495ED' }} />; // CornflowerBlue for rainy
      case 'stormy':
        return <CloudIcon fontSize="large" sx={{ color: '#1E90FF' }} />; // DodgerBlue for stormy
      case 'snowy':
        return <CloudIcon fontSize="large" sx={{ color: '#E0FFFF' }} />; // LightCyan for snowy
      default:
        return <CloudIcon fontSize="large" sx={{ color: '#B0C4DE' }} />; // Default to cloudy
    }
  };

  return (
    <Card
      sx={{
        background: 'linear-gradient(90deg, #4facfe, #00f2fe)', // Apply gradient
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '1rem',
        width: '100%',
        maxWidth: '450px',
        color: '#ffffff', // Ensure text is white for contrast
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          {renderWeatherIcon()}
        </Box>
        <Typography variant="h6" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Typography>Temperature: {temperature}</Typography>
        <Typography>Wind: {wind}</Typography>
        <Typography>Rain Chance: {rain}</Typography>
        <Typography sx={{ fontStyle: 'italic', marginTop: '0.5rem' }}>{weatherMessage}</Typography>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
