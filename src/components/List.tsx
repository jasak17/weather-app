import React from 'react';
import City from '../types';

interface ListProps {
  cities: City[];
  updateSelectedCity(arg: City): void;
  removeCity(arg: City): void;
}

const List: React.FC<ListProps> = (props) => {
  const listCities = props.cities.map((city, index) => (
    <li className='listCard' onClick={() => props.updateSelectedCity(city)} key={index}>
      {city.name + ' ' + city.temperature + '°C '}
      <button className='removeButton' onClick={() => props.removeCity(city)}> X </button>
    </li>
  ));
  return (
    <div>
      <ul>{listCities}</ul>
    </div>
  );
};

export default List;
