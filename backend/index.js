const mongoose = require("mongoose");
require("dotenv").config();
const axios = require("axios");
const express = require("express");

const app = express();

const authRoute = require("./routes/auth.route");
const foodRoute = require("./routes/food.route");
const carbonRoute = require("./routes/carbon.route");
const mealRoute = require("./routes/meal.route");
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

app.use("/api/auth", authenticationRoute);
app.use("/api/menuInfo", menuInfoRoute);
app.use("/api/problems", problemsRoute);
app.use("/api/ratings", ratingsRoute);
app.use("/api/recommendations", recommendationsRoute);
app.use("/api/saved", savedRoute);
app.use("/api/users", usersRoute);

app.listen(8000, () => {
    console.log(`Backend is running on port ${PORT}`);
});
