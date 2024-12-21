import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchWeatherData = async (location: string) => {
  const response = await axios.get(
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
        times: data.days[0].hours.map((hour: any) => hour.datetime),
        temperatures: data.days[0].hours.map((hour: any) => hour.temp),
        winds: data.days[0].hours.map((hour: any) => hour.windspeed),
        rainChances: data.days[0].hours.map((hour: any) => hour.precipprob),
      },
      nextWeek: {
        times: data.days[7].hours.map((hour: any) => hour.datetime),
        temperatures: data.days[7].hours.map((hour: any) => hour.temp),
        winds: data.days[7].hours.map((hour: any) => hour.windspeed),
        rainChances: data.days[7].hours.map((hour: any) => hour.precipprob),
      },
    },
  };
};
