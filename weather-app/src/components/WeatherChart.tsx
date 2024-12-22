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

// Register required Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

interface WeatherChartProps {
  data: {
    times: string[]; // Time labels (e.g., ['8 AM', '9 AM'])
    temperatures: number[]; // Temperature data points
    winds: number[]; // Wind speed data points
    rainChances: number[]; // Rain chance percentages
  };
}

const WeatherChart: React.FC<WeatherChartProps> = React.memo(({ data }) => {
  const chartData = {
    labels: data.times, // X-axis labels correspond to filtered times
    datasets: [
      {
        label: 'Temperature (°F)',
        data: data.temperatures,
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        fill: true,
        tension: 0.3,
        yAxisID: 'y1',
      },
      {
        label: 'Wind Speed (mph)',
        data: data.winds,
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.1)',
        fill: true,
        tension: 0.3,
        yAxisID: 'y2',
      },
      {
        label: 'Rain Chance (%)',
        data: data.rainChances,
        borderColor: 'green',
        backgroundColor: 'rgba(0, 255, 0, 0.1)',
        fill: true,
        tension: 0.3,
        yAxisID: 'y3',
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
      y1: {
        type: 'linear' as const,
        position: 'left' as const,
        title: { display: true, text: 'Temperature (°F)' },
        beginAtZero: true,
      },
      y2: {
        type: 'linear' as const,
        position: 'right' as const,
        title: { display: true, text: 'Wind Speed (mph)' },
        grid: { drawOnChartArea: false },
        beginAtZero: true,
      },
      y3: {
        type: 'linear' as const,
        position: 'right' as const,
        title: { display: true, text: 'Rain Chance (%)' },
        grid: { drawOnChartArea: false },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '300px', padding: '1rem' }}>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
});

export default WeatherChart;