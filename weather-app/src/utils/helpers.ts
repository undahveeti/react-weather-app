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
    console.log('Hours Input:', hours); // Log the input hours to debug
  
    if (!hours || hours.length === 0) {
      console.warn('No hourly data available.');
      return { times: [], temperatures: [], winds: [], rainChances: [] };
    }
  
    // Define time ranges dynamically
    const timeRanges = {
      morning: [8, 12], // 6 AM to 9 AM
      afternoon: [12, 17], // 12 PM to 3 PM
      evening: [17, 22], // 6 PM to 9 PM
    };
  
    const [startHour, endHour] = timeRanges[timeRange];
  
    // Filter the hours to get data for the selected time range
    const filteredHours = hours.filter((hour) => {
      // Construct full date-time for accurate interpretation
      const fullDateTime = `2024-01-01T${hour.datetime}`; // Placeholder date
      const hourTime = new Date(fullDateTime).getHours();
      return hourTime >= startHour && hourTime <= endHour;
    });
  
    console.log('Filtered Hours:', filteredHours); // Log filtered hours to debug
  
    // If no data matches the time range, log a warning
    if (filteredHours.length === 0) {
      console.warn(`No data found for time range: ${timeRange}`);
    }
  
    return {
      times: filteredHours.map((hour) => formatTime(`2024-01-01T${hour.datetime}`)), // Map the filtered times
      temperatures: filteredHours.map((hour) => hour.temp || 0), // Map the temperatures
      winds: filteredHours.map((hour) => hour.windspeed || 0), // Map the wind speeds
      rainChances: filteredHours.map((hour) => hour.precipprob || 0), // Map the rain chances
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
    hours = hours % 12 || 12; // Convert 0 hours to 12 for 12-hour format
    return `${hours} ${ampm}`;
  };