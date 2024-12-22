import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;

interface HourlyData {
  times: string[];
  temperatures: number[];
  winds: number[];
  rainChances: number[];
}

interface DailyData {
  date: string;
  temperature: number;
  wind: number;
  rainChance: number;
}

interface WeatherData {
  daily: DailyData[];
  hourly: HourlyData;
}

/**
 * Fetch weather data from the Visual Crossing API.
 * @param location - The location string (e.g., "New York, USA").
 * @returns Parsed weather data as WeatherData.
 */
export const fetchWeatherData = async (location: string): Promise<WeatherData> => {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=${API_KEY}`;
  
  try {
    console.log('Fetching weather data from:', url); // Debugging log

    const response = await axios.get(url);

    const data = response.data;

    // Validate the response structure to ensure required data is present
    if (!data || !data.days || !data.days[0]?.hours) {
      throw new Error('Invalid API response structure');
    }

    return {
      daily: data.days.map((day: { datetime: string; temp: number; windspeed: number; precipprob: number }) => ({
        date: day.datetime,
        temperature: day.temp,
        wind: day.windspeed,
        rainChance: day.precipprob,
      })),
      hourly: {
        times: data.days[0].hours.map((hour: { datetime: string }) => hour.datetime),
        temperatures: data.days[0].hours.map((hour: { temp: number }) => hour.temp),
        winds: data.days[0].hours.map((hour: { windspeed: number }) => hour.windspeed),
        rainChances: data.days[0].hours.map((hour: { precipprob: number }) => hour.precipprob),
      },
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);

    // Handle specific cases for better debugging
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', error.response?.data || error.message);
    }

    // Throw the error to let the caller handle it
    console.log(import.meta.env);
    throw new Error('Failed to fetch weather data. Please check the location or try again later.');
  }
};
