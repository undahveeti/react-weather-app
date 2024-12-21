// detailed hour by hour weather data for temp, win and rain
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

// Register required components for Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

interface WeatherChartProps {
  data: {
    times: string[]; // Time labels (e.g., ['12 PM', '1 PM'])
    temperatures: number[]; // Temperature data points
    winds: number[]; // Wind speed data points
    rainChances: number[]; // Rain chance percentages
  };
}

/**
 * WeatherChart visualizes hourly weather data using a line chart.
 */
const WeatherChart: React.FC<WeatherChartProps> = ({ data }) => {
  // Define the chart's dataset and configuration
  const chartData = {
    labels: data.times, // Labels for the x-axis (time of day)
    datasets: [
      {
        label: 'Temperature (°F)',
        data: data.temperatures,
        borderColor: 'red',
        fill: false,
        tension: 0.3, // Smooth line curve
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
      legend: { position: 'top' as const }, // Position legend at the top
      tooltip: { enabled: true }, // Enable tooltips on hover
    },
    scales: {
      x: {
        title: { display: true, text: 'Time of Day' }, // Label for the x-axis
      },
      y: {
        title: { display: true, text: 'Value' }, // Label for the y-axis
        beginAtZero: true, // Start y-axis at 0
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
