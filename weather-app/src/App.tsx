import React from 'react';
import Header from './components/Header';
import WeatherCard from './components/WeatherCard';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <WeatherCard
        title="This Friday"
        icon="/sunny.png"
        temperature="72°F"
        wind="10 mph"
        rain="0%"
      />
    </div>
  );
};

export default App;
