import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';

const MealDetail = () => {
  const [meal, setMeal] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/meals /`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMeal(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMeal();
  }, [token]);

  if (!meal) return <div>Loading...</div>;

  return (
    <div>
      {meal.map((mealItem, index) => (
        <div key={index}>
          <h1>{mealItem.name}</h1>
          <p>Recipes: {mealItem.recipes}</p>
          <p>Date: {mealItem.date}</p>
        </div>
      ))}
    </div>
  );
};

export default MealDetail;
