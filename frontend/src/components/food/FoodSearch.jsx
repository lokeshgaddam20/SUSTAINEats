import React, { useState } from 'react';
import api from '../../api';

const FoodSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await api.get(`/foods/search`, { params: { q: query } });
      setResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search foods" required />
        <button type="submit">Search</button>
      </form>
      <ul>
        {results.map(food => (
          <li key={food._id}>{food.name} (Sustainability Rating: {food.sustainabilityRating})</li>
        ))}
      </ul>
    </div>
  );
};

export default FoodSearch;
