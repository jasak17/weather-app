import React, { useState } from 'react';
import './App.css';
import AddCity from './components/AddCity';
import List from './components/List';
import City from './types';

const App: React.FC = () => {
  const [cities, setCities] = useState<City[] | undefined>();
  const [selectedCity, setSelectedCity] = useState<City>();

  const updateSelectedCity = (city: City) => {
    setSelectedCity(city);
  }
  
  const addCity = (city: City) => {
    if (cities !== undefined && !cities.some((el) => el.name === city.name)) {
      setCities([...cities, city]);
    } else if (cities === undefined) {
      setCities([city]);
    }
  };

  let list;
  if (cities !== undefined) {
    list = <List cities={cities} updateSelectedCity={updateSelectedCity} />;
  } else {
    list = <h3>No cities added</h3>;
  }

  return (
    <div className='App'>
      <h1>Weather app</h1>
      {list}
      <AddCity addCity={addCity} />
    </div>
  );
};

export default App;
