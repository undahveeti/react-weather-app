// src/utils/dateHelpers.ts
import { DailyData } from '../hooks/useWeatherData';

/**
 * Maps a day of the week to its corresponding date in the fetched weather data.
 * @param day - Day of the week (e.g., 'Monday').
 * @param dailyData - Array of daily weather data.
 * @returns The date string in 'YYYY-MM-DD' format if found, else undefined.
 */
export const getDateForDay = (day: string, dailyData: DailyData[] | undefined): string | undefined => {
  if (!dailyData) return undefined;

  const today = new Date();
  const currentDay = today.getDay(); // 0 (Sunday) to 6 (Saturday)
  const targetDay = dayToNumber(day); // Convert day name to number

  if (targetDay === null) return undefined;

  // Calculate the difference in days
  let diff = targetDay - currentDay;
  if (diff < 0) diff += 7;

  const targetDate = new Date();
  targetDate.setDate(today.getDate() + diff);

  const yyyy = targetDate.getFullYear();
  const mm = String(targetDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const dd = String(targetDate.getDate()).padStart(2, '0');

  const formattedDate = `${yyyy}-${mm}-${dd}`;

  // Verify if the date exists in dailyData
  const exists = dailyData.some((dayData) => dayData.date === formattedDate);
  return exists ? formattedDate : undefined;
};

/**
 * Converts day name to its corresponding number.
 * @param day - Day name (e.g., 'Monday').
 * @returns Number representing the day (0 for Sunday, 1 for Monday, ..., 6 for Saturday) or null if invalid.
 */
const dayToNumber = (day: string): number | null => {
  const days: { [key: string]: number } = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  return days[day] !== undefined ? days[day] : null;
};
