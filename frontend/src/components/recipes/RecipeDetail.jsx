import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/recipes/`,{headers: {Authorization: `Bearer ${token}` }});
        console.log(response.data);
        setRecipe(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecipe();
  },[token]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div>
      {recipe.map((recipeItem, index) => (
        <div key={index}>
          <h1>{recipeItem.meal}</h1>
          <p>Title: {recipeItem.title}</p>
          <p>Ingredients: {recipeItem.ingredients}</p>
          <p>instructions: {recipeItem.instructions}</p>
          <p>sustainabilityRating: {recipeItem.sustainabilityRating}</p>
        </div>
      ))}
    </div>
  );
};

export default RecipeDetail;
