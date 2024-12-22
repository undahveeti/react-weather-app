// hooks/useWeatherData.ts
import { useQuery } from '@tanstack/react-query';
import { fetchWeatherData } from '../utils/api';

// types.ts
// hooks/useWeatherData.ts
export interface HourlyData {
  datetime: string; // String representing the time, e.g., '08:00'
  temp: number; // Temperature in °F
  windspeed: number; // Wind speed in mph
  precipprob: number; // Rain probability as a percentage
}

export interface DailyData {
  date: string;
  temperature: number;
  wind: number;
  rainChance: number;
  weatherCondition: string; // Raw weather condition
  summary: string; // Human-readable description like "Partly Cloudy"
  hours: HourlyData[];
}

export interface WeatherData {
  daily: DailyData[];
}

/**
 * Custom hook to fetch weather data for a location.
 */
export const useWeatherData = (location: string) => {
  return useQuery<WeatherData, Error>({
    queryKey: ['weatherData', location],
    queryFn: () => fetchWeatherData(location),
    enabled: location.trim().length > 0, // Fetch only when location is non-empty
    staleTime: 1000 * 60 * 10, // Cache for 10 minutes
    retry: 2, // Retry twice on failure
  });
};
