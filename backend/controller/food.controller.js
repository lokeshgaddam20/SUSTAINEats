const Food = require('../models/food.model');

const getAllFoods = async (req, res) => {
    try {
        const foods = await Food.find({user : req.user});
        res.json(foods);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getFoodbyID = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (!food) return res.status(404).json({ message: 'Food not found' });
        res.json(food);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getFood = async (req, res) => {
    const value = req.params.id;
    let query='';
    try {
            if(isNaN(value%2)) {
                query = {
                    $or: [
                        { name: value },
                        { season: value }
                    ]
                };
            }else{
                query = { sustainabilityRating : value}
            }
        const results = await Food.find(query);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getSeasonalFood = async (req, res) => {
    const season = req.params.season;
    try {
        const foods = await Food.find({ season });
        res.json(foods);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createFoods = async (req, res) => {
    const { name, sustainabilityRating, season } = req.body;
    const userId = req.user;
    try {
        // const food = new Food({ user: userId, name, sustainabilityRating, season });
        const food = await Food.create({ user: userId, name, sustainabilityRating, season });
        res.json(food);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteFoods = async (req, res) => {
    const name = req.params.name;
    try {
        const food = await Food.findOneAndDelete({ name, user: req.user });
        console.log(food)
        if (!food) return res.status(404).json({ message: 'Food not found' });
        res.json({ message: 'Food deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllFoods, getFoodbyID, getFood, getSeasonalFood, createFoods, deleteFoods };
