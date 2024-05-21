const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoute = require("./routes/auth.route");
const foodRoute = require("./routes/food.route");
const carbonRoute = require("./routes/carbon.route");
const mealRoute = require("./routes/meal.route");
const receipeRoute = require("./routes/receipe.route");

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));


app.use("/api/auth", authRoute);
app.use("/api/foods", foodRoute);
app.use("/api/recipes", receipeRoute);
app.use("/api/meal-plans", mealRoute);
app.use("/api/carbon-footprint", carbonRoute);

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
