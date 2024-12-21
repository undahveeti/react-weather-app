import { useQuery } from '@tanstack/react-query';
import { fetchWeatherData, WeatherData } from '../utils/api';

export const useWeatherData = (location: string) => {
  return useQuery<WeatherData>({
    queryKey: ['weatherData', location],
    queryFn: () => fetchWeatherData(location),
    enabled: Boolean(location),
  });
};
