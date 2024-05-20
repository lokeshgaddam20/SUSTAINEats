/* Code that renders homepage on the frontend */
import Navbar from "../../components/navbar/navbar";
import CorecInfo from "../../components/corecinfo/corecinfo";
import React from "react";
import "./home.scss";
import MealTracker from "../mealTracker/mealTracker";

/**
 * Returns a react component consisting of the Home page. Includes all logic relevant to the home page.
 * 
 * @returns a react component consisting of the Home page.
 */
const Home = () => {
    return (
        <div className="home">
            <Navbar />
            <MealTracker/>
            {/* <CorecInfo /> */}
            {/* <Footer /> */}
        </div>
    );
};

export default Home;
