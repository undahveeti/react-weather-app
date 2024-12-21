import { useQuery } from '@tanstack/react-query';
import { fetchWeatherData } from '../utils/api';

export const useWeatherData = (location: string) => {
  return useQuery(
    ['weatherData', location],
    () => fetchWeatherData(location),
    {
      enabled: !!location, // Only fetch if location is set
      staleTime: 1000 * 60 * 10, // Cache data for 10 minutes
    }
  );
};
