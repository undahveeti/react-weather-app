// utils/api.ts
import axios from 'axios';
import { WeatherData } from '../hooks/useWeatherData';

const API_KEY = import.meta.env.VITE_API_KEY;

/**
 * Fetches weather data from the Visual Crossing API for a given location.
 * @param location - The location for which to fetch weather data.
 * @returns A promise resolving to the structured WeatherData.
 */
export const fetchWeatherData = async (location: string): Promise<WeatherData> => {
  const response = await axios.get(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
      location
    )}?unitGroup=us&key=${API_KEY}&include=hours`
  );
  const data = response.data;

  return {
    daily: data.days.map((day: {
      datetime: string;
      temp: number;
      windspeed: number;
      precipprob: number;
      hours: {
        datetime: string;
        temp: number;
        windspeed: number;
        precipprob: number;
      }[];
    }) => ({
      date: day.datetime,
      temperature: day.temp,
      wind: day.windspeed,
      rainChance: day.precipprob,
      hours: day.hours.map((hour: {
        datetime: string;
        temp: number;
        windspeed: number;
        precipprob: number;
      }) => ({
        datetime: hour.datetime,
        temp: hour.temp,
        windspeed: hour.windspeed,
        precipprob: hour.precipprob,
      })),
    })),
  };
};
