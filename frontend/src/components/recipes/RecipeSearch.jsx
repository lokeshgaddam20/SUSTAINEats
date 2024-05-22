import React, { useState } from 'react';
import api from '../../api';

const RecipeSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await api.get(`/recipes/search`, { params: { q: query } });
      setResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search recipes" required />
        <button type="submit">Search</button>
      </form>
      <ul>
        {results.map(recipe => (
          <li key={recipe._id}>{recipe.title} (Sustainability Rating: {recipe.sustainabilityRating})</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeSearch;
