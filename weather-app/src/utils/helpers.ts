// src/utils/helpers.ts
import { HourlyData } from '../hooks/useWeatherData';

/**
 * Filters hourly data based on the selected time range.
 * @param hours - Array of hourly weather data.
 * @param timeRange - Selected time range ('morning' | 'afternoon' | 'evening').
 * @returns Filtered data containing times, temperatures, winds, and rainChances.
 */
export const filterHourlyData = (
  hours: HourlyData[] | undefined,
  timeRange: 'morning' | 'afternoon' | 'evening'
): {
  times: string[];
  temperatures: number[];
  winds: number[];
  rainChances: number[];
} => {
  if (!hours) return { times: [], temperatures: [], winds: [], rainChances: [] };

  const timeRangeIndexes: { [key in 'morning' | 'afternoon' | 'evening']: number[] } = {
    morning: [6, 7, 8, 9], // 6 AM to 9 AM
    afternoon: [12, 13, 14, 15], // 12 PM to 3 PM
    evening: [18, 19, 20, 21], // 6 PM to 9 PM
  };

  const indexes = timeRangeIndexes[timeRange];
  return {
    times: indexes.map((i) => formatTime(hours[i]?.datetime || 'N/A')),
    temperatures: indexes.map((i) => hours[i]?.temp ?? 0),
    winds: indexes.map((i) => hours[i]?.windspeed ?? 0),
    rainChances: indexes.map((i) => hours[i]?.precipprob ?? 0),
  };
};

/**
 * Generates a generic weather message based on temperature and rain chance.
 * @param temperature - The temperature in °F.
 * @param rainChance - The rain probability percentage.
 * @returns A user-friendly weather message.
 */
export const generateWeatherMessage = (temperature: number, rainChance: number): string => {
  let message = '';

  if (temperature >= 60 && temperature <= 75) {
    message += 'Nice day';
  } else if (temperature < 60) {
    message += 'Cool day';
  } else {
    message += 'Warm day';
  }

  if (rainChance >= 25 && rainChance <= 75) {
    message += ' with a chance of rain';
  } else if (rainChance > 75) {
    message += ' likely to rain';
  } else {
    message += ' with little to no rain';
  }

  return message + '.';
};

/**
 * Formats the datetime string to a readable time format (e.g., '12 PM').
 * @param datetime - The datetime string.
 * @returns Formatted time string.
 */
const formatTime = (datetime: string): string => {
  const date = new Date(datetime);
  let hours = date.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  return `${hours} ${ampm}`;
};
