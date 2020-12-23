import React, { useState } from 'react';
import City from '../types';

const apiKey = 'f3ab91a4606d5ebb7d13c96a61e35208';

interface AddCityProps {
  addCity(arg: City): void;
  updateSelectedCity(arg: City): void;
}

const AddCity: React.FC<AddCityProps> = (props) => {
  const [name, setName] = useState<string>();

  const getWeatherAPI = (name: string) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}`
    )
      .then((response) => {
        if (!response.ok) {
          alert(response.statusText);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        const city: City = {
          id: data.id,
          name: data.name,
          weather: data.weather[0].description,
          temperature: Math.round(data.main.temp - 273.15),
          humidity: data.main.humidity,
        };
        console.log(city);
        props.addCity(city);
        props.updateSelectedCity(city);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <input
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          name !== undefined && e.key === 'Enter'
            ? getWeatherAPI(name)
            : console.log('empty input');
        }}
      />
      <br />
      <button
        className='button1'
        onClick={() =>
          name !== undefined ? getWeatherAPI(name) : alert('empty input')
        }
      >
        Add city
      </button>
    </div>
  );
};

export default AddCity;
