const receipeModel = require('../models/receipe.model');

async function postMealPlan(req, res) {
    res.status(200).send("postMealPlan");
}

async function getMealPlanById(req, res) {
    res.status(200).send("getMealPlanById");
}

async function updateMealPlan(req, res) {
    res.status(200).send("updateMealPlan");
}
async function deleteMealPlan(req, res) {
    res.status(200).send("deleteMealPlan");
}

module.exports = { postMealPlan, getMealPlanById, updateMealPlan, deleteMealPlan };