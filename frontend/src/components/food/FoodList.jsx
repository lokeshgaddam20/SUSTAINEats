import React, { useEffect, useState } from 'react';
import api from '../../api';

const FoodList = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await api.get('/foods');
        setFoods(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFoods();
  }, []);

  return (
    <div>
      <h1>Food List</h1>
      <ul>
        {foods.map(food => (
          <li key={food._id}>{food.name} (Sustainability Rating: {food.sustainabilityRating})</li>
        ))}
      </ul>
    </div>
  );
};

export default FoodList;
