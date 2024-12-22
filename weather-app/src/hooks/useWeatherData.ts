// hooks/useWeatherData.ts
import { useQuery } from '@tanstack/react-query';
import { fetchWeatherData } from '../utils/api';

// types.ts
export interface HourlyData {
  time: string;
  temperature: number;
  wind: number;
  rainChance: number;
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
