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
        const stateJSON = window.localStorage.getItem('citiesState');
        const selectedJSON = window.localStorage.getItem('selectedState');

        if (selectedJSON !== null) {
          const selected: City = JSON.parse(selectedJSON);
          setSelectedCity(selected);
        }

        if (stateJSON !== null) {
          const citiesSaved: City[] = JSON.parse(stateJSON);
          if (citiesSaved !== null) {
            const citiesIDs = citiesSaved
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
        }
      } catch (e) {
        console.log(e);
      }
    } else {
      // do componentDidUpdate logic
      window.localStorage.setItem('citiesState', JSON.stringify(cities));
      window.localStorage.setItem(
        'selectedState',
        JSON.stringify(selectedCity)
      );
    }
  }, [cities, selectedCity]);

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
    if (
      cities !== undefined &&
      !cities.some((el: City) => el.name === city.name)
    ) {
      setCities([...cities, city]);
    } else if (cities === undefined) {
      setCities([city]);
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
      {selected}
    </div>
  );
};

export default App;
