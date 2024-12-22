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
  
    // Define the time ranges
    const timeRanges: { [key in 'morning' | 'afternoon' | 'evening']: [number, number] } = {
      morning: [8, 12], // 8 AM to 12 PM
      afternoon: [12, 17], // 12 PM to 5 PM
      evening: [17, 21], // 5 PM to 9 PM
    };
  
    const [startHour, endHour] = timeRanges[timeRange];
  
    // Filter the hours within the selected range
    const filteredHours = hours.filter((hour) => {
      const hourTime = new Date(hour.datetime).getHours();
      return hourTime >= startHour && hourTime < endHour;
    });
  
    return {
      times: filteredHours.map((hour) => formatTime(hour.datetime)),
      temperatures: filteredHours.map((hour) => hour.temp ?? 0),
      winds: filteredHours.map((hour) => hour.windspeed ?? 0),
      rainChances: filteredHours.map((hour) => hour.precipprob ?? 0),
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
