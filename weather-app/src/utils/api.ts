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

export const fetchWeatherData = async (location: string): Promise<WeatherData> => {
  const response = await axios.get(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=${API_KEY}`
  );

  const data = response.data;

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
};
