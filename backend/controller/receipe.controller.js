const axios = require('axios');
const Recipe = require('../models/receipe.model');
const dotenv = require('dotenv');

dotenv.config();
const url = process.env.BEND_URL;

const getAllRecipies = async (req, res) => {
    try {
        const recipes = await Recipe.find({ user: req.user });
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getRecipeById = async (req, res) => {
    const title = req.params.id;
    try {
        const recipe = await Recipe.findOne({ title });
        if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
        res.json(recipe);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const searchRecipes = async (req, res) => {
    const value = req.params.id;
    let query = '';
    try {
        if (isNaN(value % 2)) {
            const arr = value.split(',').map(item => item.trim());
            query = {
                $or: [
                    { title: value },
                    { ingredients: { $all: arr } }
                ]
            };
        } else {
            query = { sustainabilityRating: value }
        }
        const results = await Recipe.find(query);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const addRecipe = async (req, res) => {
    const userId = req.user;
    const { meal, title, ingredients, instructions, sustainabilityRating } = req.body;

    try {
        const emissionsResponse = await axios.post(url+'/api/carbon-footprint', {
            recipeName: title,
        });

        const carbon = emissionsResponse.data.emissions_total;
        console.log(carbon);
        const recipe = new Recipe({ user: userId, meal, title, ingredients, instructions, sustainabilityRating, carbon });
        await recipe.save();
        res.json(recipe);
    } catch (err) {
        res.status(500).json({ error: err});
        console.log(err)
    }
};

module.exports = { getAllRecipies, getRecipeById, searchRecipes, addRecipe };
