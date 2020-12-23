import React from 'react';
import City from '../types';

interface ListProps {
  cities: City[];
  updateSelectedCity(arg: City): void;
}

const List: React.FC<ListProps> = (props) => {
  const listCities = props.cities.map((city, index) => (
    <li onClick={() => props.updateSelectedCity(city)} key={index}>
      {city.name + ' ' + city.temperature + '°C'}
    </li>
  ));
  return (
    <div>
      <ul>{listCities}</ul>
    </div>
  );
};

export default List;
