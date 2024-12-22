import { useQuery } from '@tanstack/react-query';
import { fetchWeatherData } from '../utils/api';

interface WeatherData {
  daily: {
    date: string;
    temperature: number;
    wind: number;
    rainChance: number;
  }[];
  hourly: {
    times: string[];
    temperatures: number[];
    winds: number[];
    rainChances: number[];
  };
}

/**
 * Custom hook to fetch weather data for a location.
 * @param location - The location string.
 * @returns Weather data with query states.
 */
export const useWeatherData = (location: string) => {
  return useQuery<WeatherData, Error>({
    queryKey: ['weatherData', location], // Unique query key
    queryFn: () => fetchWeatherData(location), // Fetch function
    enabled: !!location, // Only fetch when location is set
    staleTime: 1000 * 60 * 10, // Cache data for 10 minutes
    retry: 2, // Retry twice on failure
  });
};
