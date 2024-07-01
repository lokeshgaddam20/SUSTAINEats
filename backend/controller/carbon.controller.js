const axios = require('axios');

const calculateCarbonFootPrint = async (req, res) => {
  try {
    const { recipeName} = req.body;

    // Fetch food items from the API
    const foodsResponse = await axios.get('https://api.myemissions.green/v1/calculator/foods/?limit=1000');
    const foods = foodsResponse.data.results;

    // Find the food item by name
    const food = foods.find(f => f.name === recipeName.toLowerCase());
    if (!food) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Use serving_weight as the amount
    const amount = food.serving_weight.toString();

    console.log(typeof(food.id)+" "+ food.name+" "+typeof(amount))

    // Prepare the payload for emissions calculation
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

    // Calculate emissions
    const emissionsResponse = await axios.post('https://api.myemissions.green/v1/calculator/', payload);
    // console.log(emissionsResponse)

    // Extract emissions_total from the response
    const emissionsTotal = emissionsResponse.data.recipe[0].emissions_total;
    // const totalEmissions = ingredient.emissions.total;
    console.log(typeof(emissionsTotal));
    // Return only the emissions_total
    res.status(200).json({ emissions_total: emissionsTotal });
  } catch (error) {
    console.error('Error calculating emissions:', error);
    res.status(500).json({ message: 'Error calculating emissions' });
  }
};

module.exports = { calculateCarbonFootPrint };