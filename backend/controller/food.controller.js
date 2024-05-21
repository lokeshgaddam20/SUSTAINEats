const { parse } = require('dotenv');
const foodModel = require('../models/food.model')

async function getAllFoods(req, res) {
    try {
        const data = await foodModel.find({});
        if (!data)
            res.status(400).send("Empty Students Data");
        else {
            res.status(200).json(data);
        }
    }
    catch (err) {
        console.log(err);
    }

}
async function getFood(req, res) {
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
        const results = await foodModel.find(query);
        console.log(results)
        res.send(results);
    } catch (err) {
        res.send(err)
        console.log(err)
    }
}

async function getFoodbyID(req, res) {
    const name = req.params.id;
    const data = await foodModel.findOne({ name });

    if (!data) {
        res.status(400).json({ message: "No food Found" })
    }
    else {
        res.status(200).json(data);
    }
}

module.exports = { getAllFoods, getFood, getFoodbyID }