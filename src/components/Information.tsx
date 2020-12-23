import React from 'react';
import City from '../types';

interface InformationProps {
  city: City;
}

const Information: React.FC<InformationProps> = (props) => {
  return (
    <div className = 'information'>
        <h3>{props.city.name}</h3>
        <p>{props.city.temperature} °C</p>
        <p>{props.city.humidity} %</p>
        <p>{props.city.weather}</p>
    </div>
  );
};

export default Information;
