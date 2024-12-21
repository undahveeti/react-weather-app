import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

interface WeatherChartProps {
  data: {
    times: string[];
    temperatures: number[];
    winds: number[];
    rainChances: number[];
  };
}

const WeatherChart: React.FC<WeatherChartProps> = ({ data }) => {
  const chartData = {
    labels: data?.times || [],
    datasets: [
      {
        label: 'Temperature (°F)',
        data: data?.temperatures || [],
        borderColor: 'red',
        tension: 0.3,
      },
      {
        label: 'Wind Speed (mph)',
        data: data?.winds || [],
        borderColor: 'blue',
        tension: 0.3,
      },
      {
        label: 'Rain Chance (%)',
        data: data?.rainChances || [],
        borderColor: 'green',
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' }, // Fixed legend position
      tooltip: { enabled: true },
    },
    scales: {
      x: { title: { display: true, text: 'Time of Day' } },
      y: { title: { display: true, text: 'Value' }, beginAtZero: true },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default WeatherChart;
