import React, { useEffect, useState } from 'react';
import api from '../../api';

const SeasonalFood = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchSeasonalFoods = async () => {
      try {
        const response = await api.get('/foods/seasonal');
        setFoods(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSeasonalFoods();
  }, []);

  return (
    <div>
      <h1>Seasonal Food Guide</h1>
      <ul>
        {foods.map(food => (
          <li key={food._id}>{food.name} (Season: {food.season})</li>
        ))}
      </ul>
    </div>
  );
};

export default SeasonalFood;
