import React, { useEffect, useState } from 'react';
import api from '../../api';

const MealPlanList = () => {
  const [mealPlans, setMealPlans] = useState([]);

  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        const response = await api.get('/meal-plans');
        setMealPlans(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMealPlans();
  }, []);

  return (
    <div>
      <h1>Meal Plan List</h1>
      <ul>
        {mealPlans.map(mealPlan => (
          <li key={mealPlan._id}>{mealPlan.name} (Date: {new Date(mealPlan.date).toLocaleDateString()})</li>
        ))}
      </ul>
    </div>
  );
};

export default MealPlanList;
