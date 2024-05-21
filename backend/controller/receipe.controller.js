const receipeModel = require('../models/receipe.model');

async function getAllRecipies(req, res) {
    const receipe = await receipeModel.find({})
    res.status(200).json(receipe)
}

async function getCertailRecipies(req, res) {
    const id = req.params.id
    const receipe = await receipeModel.find({
        title:id
    })
    res.status(200).json(receipe)
}

async function recipieSearch(req, res) {
    const value = req.params.id;
    let query='';
    try {
            if(isNaN(value%2)) {
                query = {
                    $or: [
                        { title: value },
                        { ingredients: value },
                        { instructions: value }
                    ]
                };
            }else{
                query = { sustainabilityRating : value}
            }
        const results = await receipeModel.find(query);
        console.log(results)
        res.send(results);
    } catch (err) {
        res.send(err)
        console.log(err)
    }

}
module.exports = { getAllRecipies, getCertailRecipies, recipieSearch }