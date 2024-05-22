import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./Home";
import Food from "./components/food/FoodDetail";
// import Recipes from "./components/recipes/RecipeDetail"
import Meals from "./components/mealplans/MealPlanDetail";
import AuthProvider from "./components/auth/AuthContext";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import LogoutButton from "./components/auth/LogoutButton";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        {" "}
        {/* Move Router here */}
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
              <li>
                <LogoutButton />
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
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/foods" element={<Food />} />
            <Route path="/recipes" element={<Home />} />
            <Route path="/meals" element={<Meals />} />
          </Routes>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Slide}
        />
      </Router>
    </AuthProvider>
  );
};

export default App;
