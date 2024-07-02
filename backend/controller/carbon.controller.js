const axios = require('axios');

const calculateCarbonFootPrint = async (req, res) => {
  try {
    const { recipeName} = req.body;

    const foodsResponse = await axios.get('https://api.myemissions.green/v1/calculator/foods/?limit=1000');
    const foods = foodsResponse.data.results;

    const food = foods.find(f => f.name === recipeName.toLowerCase());
    if (!food) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    const amount = food.serving_weight.toString();

    const payload = {
      "ingredients": [
        {
          "food": food.id,
          "unit": "17b6249c-cbda-4e59-b575-018f7781c68c",
          "amount": amount
        }
      ],
      "servings": 1
    };

    const emissionsResponse = await axios.post('https://api.myemissions.green/v1/calculator/', payload);

    const emissionsTotal = emissionsResponse.data.recipe[0].emissions_total;

    res.status(200).json({ emissions_total: emissionsTotal });
  } catch (error) {
    console.error('Error calculating emissions:', error);
    res.status(500).json({ message: 'Error calculating emissions' });
  }
};

module.exports = { calculateCarbonFootPrint };