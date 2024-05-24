import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "./components/auth/AuthContext";

import Home from "./Home";
import Food from "./components/food/FoodDetail";
import Meals from "./components/mealplans/MealPlanDetail";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";

import RecipeDetail from "./components/recipes/RecipeDetail";
import { NavbarComp } from "./components/navbar/navbar"; // Import the NavbarComp component

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <NavbarComp />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/foods" element={<Food />} />
            <Route path="/recipes" element={<RecipeDetail />} />
            <Route path="/meals" element={<Meals />} />
          </Routes>
        </div>
        <Toaster />
        {/* <ToastContainer
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
        /> */}
      </Router>
    </AuthProvider>
  );
};

export default App;
