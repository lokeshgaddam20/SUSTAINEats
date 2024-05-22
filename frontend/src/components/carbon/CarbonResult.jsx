import React from 'react';

const CarbonResult = ({ result }) => {
  if (!result) return null;

  return (
    <div>
      <h1>Carbon Footprint Result</h1>
      <p>Total Carbon Footprint: {result.totalFootprint}</p>
    </div>
  );
};

export default CarbonResult;
