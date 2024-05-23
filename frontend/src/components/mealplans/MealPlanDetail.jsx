import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';

const FoodDetail = () => {
  const [food, setFood] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/meals/`,{headers: {Authorization: `Bearer ${localStorage.getItem('token')}}` }});
        console.log(response.data);
        setFood(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFood();
  },[token]);

  if (!food) return <div>Loading...</div>;

  return (
    <div>
      {food.map((foodItem, index) => (
        <div key={index}>
          <h1>{foodItem.name}</h1>
          <p>Recipes: {foodItem.recipes}</p>
          <p>Date: {foodItem.date}</p>
        </div>
      ))}
    </div>
  );
};

export default FoodDetail;
