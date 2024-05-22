import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Home from "./Home";
import Food from "./components/food/FoodDetail"
// import Recipes from "./components/recipes/RecipeDetail"
import Meals from "./components/mealplans/MealPlanDetail"

const App = () => {

  return (
    <Router> {/* Move Router here */}
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
                <li>
                  <Link to="/foods">Foods</Link>
                </li>
                <li>
                  <Link to="/recipes">Recipes</Link>
                </li>
                <li>
                  <Link to="/meals">Meals</Link>
                </li>
          </ul>
        </nav>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/foods' element={<Food />} />
          <Route path='/recipes' element={<Home />} />
          <Route path='/meals' element={<Meals />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
