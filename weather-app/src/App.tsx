import React, { useState } from 'react';
import Header from './components/Header';
import LocationSelector from './components/LocationSelector';

const App: React.FC = () => {
  const [location, setLocation] = useState('');

  return (
    <div>
      <Header />
      <LocationSelector onLocationSet={setLocation} />
      {location && <p>Selected Location: {location}</p>}
    </div>
  );
};

export default App;
