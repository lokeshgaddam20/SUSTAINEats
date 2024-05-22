import React, { useState } from 'react';
import api from '../../api';

const MealPlanForm = () => {
  const [name, setName] = useState('');
  const [recipes, setRecipes] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/meal-plans', { name, recipes });
      alert('Meal plan created successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to create meal plan');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Meal Plan Name" required />
      <input type="text" value={recipes} onChange={(e) => setRecipes(e.target.value.split(','))} placeholder="Recipe IDs (comma separated)" required />
      <button type="submit">Create Meal Plan</button>
    </form>
  );
};

export default MealPlanForm;
