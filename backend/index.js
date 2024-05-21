const mongoose = require("mongoose");
require("dotenv").config();
const axios = require("axios");
const cors = require('cors');
const express = require("express");

const app = express();

// const authRoute = require("./routes/auth.route");
const foodRoute = require("./routes/food.route");
// const carbonRoute = require("./routes/carbon.route");
// const mealRoute = require("./routes/meal.route");
const receipeRoute = require("./routes/receipe.route");

mongoose
    .connect(
        process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));

// app.use("/api/auth", authRoute);
// app.use("/api/foods", foodRoute);
// app.use("/api/receipes", receipeRoute);
app.use("/api/meal-plans", mealRoute);
// app.use("/api/carbon-footprint", carbonRoute);

app.listen(8000, () => {
    console.log(`Backend is running on port 8000`);
});
