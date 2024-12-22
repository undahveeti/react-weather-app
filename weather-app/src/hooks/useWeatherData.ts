// src/hooks/useWeatherData.ts
import { useQuery } from '@tanstack/react-query';
import { fetchWeatherData } from '../utils/api';

export interface HourlyData {
  datetime: string;
  temp: number;
  windspeed: number;
  precipprob: number;
}

export interface DailyData {
    datetime: string; // Matches API-provided 'datetime'
    datetimeEpoch: number;
    tempmax: number;  // Maximum temperature
    tempmin: number;  // Minimum temperature
    temp: number;     // Average temperature
    wind?: number;    // Wind speed (if available in API)
    rainChance?: number; // Rain chance (if available in API)
    hours?: HourlyData[]; // Hourly data (if applicable)
  }
  

export interface WeatherData {
  daily: DailyData[];
}

/**
 * Custom hook to fetch weather data for a location.
 * Utilizes React Query for data fetching and caching.
 * @param location - The location for which to fetch weather data.
 * @returns React Query's result object containing data, loading state, and error.
 */
export const useWeatherData = (location: string) => {
  return useQuery<WeatherData, Error>({
    queryKey: ['weatherData', location],
    queryFn: () => fetchWeatherData(location),
    enabled: location.trim().length > 0, // Fetch only when location is non-empty
    staleTime: 1000 * 60 * 10, // Cache data for 10 minutes
    retry: 2, // Retry failed requests twice
  });
};
