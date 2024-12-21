import axios from 'axios';

export interface HourData {
  datetime: string;
  temp: number;
  windspeed: number;
  precipprob: number;
}

export interface DayData {
  datetime: string;
  temp: number;
  windspeed: number;
  precipprob: number;
  hours: HourData[];
}

export interface ApiResponse {
  days: DayData[];
}

export interface WeatherData {
  daily: Array<{ date: string; temperature: number; wind: number; rainChance: number }>;
  hourly: {
    thisWeek: { times: string[]; temperatures: number[]; winds: number[]; rainChances: number[] };
    nextWeek: { times: string[]; temperatures: number[]; winds: number[]; rainChances: number[] };
  };
}

const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchWeatherData = async (location: string): Promise<WeatherData> => {
  const response = await axios.get<ApiResponse>(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=${API_KEY}`
  );
  const data = response.data;

  return {
    daily: [
      {
        date: data.days[0].datetime,
        temperature: data.days[0].temp,
        wind: data.days[0].windspeed,
        rainChance: data.days[0].precipprob,
      },
      {
        date: data.days[7].datetime,
        temperature: data.days[7].temp,
        wind: data.days[7].windspeed,
        rainChance: data.days[7].precipprob,
      },
    ],
    hourly: {
      thisWeek: {
        times: data.days[0].hours.map((hour: HourData) => hour.datetime),
        temperatures: data.days[0].hours.map((hour: HourData) => hour.temp),
        winds: data.days[0].hours.map((hour: HourData) => hour.windspeed),
        rainChances: data.days[0].hours.map((hour: HourData) => hour.precipprob),
      },
      nextWeek: {
        times: data.days[7].hours.map((hour: HourData) => hour.datetime),
        temperatures: data.days[7].hours.map((hour: HourData) => hour.temp),
        winds: data.days[7].hours.map((hour: HourData) => hour.windspeed),
        rainChances: data.days[7].hours.map((hour: HourData) => hour.precipprob),
      },
    },
  };
};
