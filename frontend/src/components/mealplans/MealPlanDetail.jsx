import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FoodDetail = () => {
  const [food, setFood] = useState(null);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/meals/`,{headers: {Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NGM3ZjQwZDMxMWFhMzc2OGM3YTdhOSIsImlhdCI6MTcxNjM3OTIzMiwiZXhwIjoxNzE2NDY1NjMyfQ.yiovXZ3LpLiwNGqCsAu1_xwKrj6iRmFAXyPebn6MwOM` }});
        console.log(response.data);
        setFood(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFood();
  },[]);

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
