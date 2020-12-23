import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import AddCity from './components/AddCity';
import Information from './components/Information';
import List from './components/List';
import City from './types';

const apiKey = 'f3ab91a4606d5ebb7d13c96a61e35208';

const App: React.FC = () => {
  const [cities, setCities] = useState<City[]>();
  const [selectedCity, setSelectedCity] = useState<City>();

  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
      try {
        const state = window.localStorage.getItem('state');
        if (state !== null) {
          const mesta: City[] = JSON.parse(state);
          setCities(mesta);
        }
      } catch (e) {}
    } else {
      // do componentDidUpdate logic
      window.localStorage.setItem('state', JSON.stringify(cities));
    }
  }, [cities]);

  const updateSelectedCity = (city: City) => {
    setSelectedCity(city);
  };

  const removeCity = (city: City) => {
    if (cities !== undefined) {
      const removed = cities.filter((el) => el !== city);
      setCities(removed);
    }
  };

  const addCity = (city: City) => {
    if (cities !== undefined && !cities.some((el) => el.name === city.name)) {
      setCities([...cities, city]);
    } else if (cities === undefined) {
      setCities([city]);
    }
  };

  const refreshData = (cities: City[] | undefined) => {
    if (cities !== undefined) {
      const citiesIDs = cities
        .reduce((acc, val) => acc + ',' + val.id, '')
        .substring(1);
      fetch(
        `http://api.openweathermap.org/data/2.5/group?id=${citiesIDs}&appid=${apiKey}`
      )
        .then((response) => {
          if (!response.ok) {
            alert(response.statusText);
          } else {
            return response.json();
          }
        })
        .then((data) => {
          console.log(data);
          const refreshedCities: City[] = [];
          data.list.forEach((i: any) => {
            const current: City = {
              id: i.id,
              name: i.name,
              weather: i.weather[0].description,
              temperature: Math.round(i.main.temp - 273.15),
              humidity: i.main.humidity,
            };
            refreshedCities.push(current);
            if (current.id === selectedCity?.id) {
              setSelectedCity(current);
            }
          });
          setCities(refreshedCities);
        })
        .catch((err) => console.log(err));
    }
  };

  let list;
  if (cities !== undefined) {
    list = (
      <List
        cities={cities}
        updateSelectedCity={updateSelectedCity}
        removeCity={removeCity}
      />
    );
  } else {
    list = <h3>No cities added</h3>;
  }

  let selected;
  if (selectedCity !== undefined) {
    selected = <Information city={selectedCity} />;
  }

  return (
    <div className='App'>
      <h1>Weather app</h1>
      {list}
      <AddCity addCity={addCity} updateSelectedCity={updateSelectedCity} />
      <button className='button1' onClick={() => refreshData(cities)}>
        Refresh data
      </button>
      {selected}
    </div>
  );
};

export default App;
