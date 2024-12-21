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

// Register required chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

interface WeatherChartProps {
  data: {
    times: string[]; // Time labels (e.g., ['12 PM', '1 PM'])
    temperatures: number[]; // Temperature data points
    winds: number[]; // Wind speed data points
    rainChances: number[]; // Rain chance percentages
  };
}

const WeatherChart: React.FC<WeatherChartProps> = ({ data }) => {
  const chartData = {
    labels: data.times,
    datasets: [
      {
        label: 'Temperature (°F)',
        data: data.temperatures,
        borderColor: 'red',
        fill: false,
        tension: 0.3,
      },
      {
        label: 'Wind Speed (mph)',
        data: data.winds,
        borderColor: 'blue',
        fill: false,
        tension: 0.3,
      },
      {
        label: 'Rain Chance (%)',
        data: data.rainChances,
        borderColor: 'green',
        fill: false,
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        title: { display: true, text: 'Time of Day' },
      },
      y: {
        title: { display: true, text: 'Value' },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default WeatherChart;
