const receipeModel = require('../models/receipe.model');

async function getAllRecipies(req, res) {
    res.status(200).send("getReceipe");
}

async function getCertailRecipies(req, res) {
    res.status(200).send("getReceipe");
}

async function recipieSearch(req, res) {
    res.status(200).send("getReceipe");
}

module.exports = { getAllRecipies, getCertailRecipies, recipieSearch };