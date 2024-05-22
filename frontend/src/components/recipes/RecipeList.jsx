import React, { useEffect, useState } from 'react';
import api from '../../api';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await api.get('/recipes');
        setRecipes(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <div>
      <h1>Recipe List</h1>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe._id}>{recipe.title} (Sustainability Rating: {recipe.sustainabilityRating})</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
