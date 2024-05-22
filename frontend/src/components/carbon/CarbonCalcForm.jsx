import React, { useState } from 'react';
import api from '../../api';

const CarbonCalcForm = ({ onResult }) => {
  const [mealPlanId, setMealPlanId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/carbon-footprint', { mealPlanId });
      onResult(response.data);
    } catch (error) {
      console.error(error);
      alert('Failed to calculate carbon footprint');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={mealPlanId} onChange={(e) => setMealPlanId(e.target.value)} placeholder="Meal Plan ID" required />
      <button type="submit">Calculate Carbon Footprint</button>
    </form>
  );
};

export default CarbonCalcForm;
