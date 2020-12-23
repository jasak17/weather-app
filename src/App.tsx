import React, { useState } from 'react';
import './App.css';
import AddCity from './components/AddCity';
import City from './types';

const App: React.FC = () => {
  const [cities, setCities] = useState<City[] | undefined>();

  const addCity = (city: City) => {
    if (cities !== undefined) {
      setCities([...cities, city]);
    } else {
      setCities([city]);
    }
  };

  return (
    <div className='App'>
      <h1>test</h1>
      <AddCity addCity={addCity} />
    </div>
  );
};

export default App;
