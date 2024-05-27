import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../auth/AuthContext";

import {
  Star,
  Soup,
  Search,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { RecipeView } from "./RecipeView";
import AddRecipeDialog from "./RecipeAdd";

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { token } = useContext(AuthContext);

  const filterRecipes = (recipes, searchTerm) => {
    return recipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.sustainabilityRating
          .toString()
          .includes(searchTerm.toLowerCase()) ||
        recipe.meal.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/recipes/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecipe(filterRecipes(response.data, searchTerm));
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecipe();
  }, [token, searchTerm]);

  const handleAddRecipe = async (newRecipe) => {
    try {
      const response = await axios.post(
        `http://localhost:8800/api/recipes/`,
        newRecipe,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRecipe((prevRecipes) => [...prevRecipes, response.data]);
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <h2 className="text-md font-medium">Recipes</h2>
        <div className="flex w-full items-center justify-items-end gap-4 md:ml-auto md:gap-2 lg:gap-4 bg-white">
              <AddRecipeDialog onSave={handleAddRecipe} />
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </form>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {filterRecipes(recipe, searchTerm).map((recipeItem, index) => (
            <Card key={index} className="border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-bold">
                  {recipeItem.title}
                </CardTitle>
                <Soup />
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-md font-medium">
                  <Star />
                  <p className="text-lg font-medium">
                    {recipeItem.sustainabilityRating}
                  </p>
                </div>
                <p className=" flex items-center gap-3 text-md text-muted-foreground">
                  {recipeItem.meal.charAt(0).toUpperCase() +
                    recipeItem.meal.slice(1)}
                </p>
                <ScrollArea className="h-72 w-full rounded-md pb-4">
                  <div className="pt-4">
                    <h4 className="mb-4 text-md font-medium leading-none">
                      Ingredients
                    </h4>
                    {recipeItem.ingredients.map((ingredient, index) => (
                      <React.Fragment key={index}>
                        <div className="text-sm">{ingredient}</div>
                        {index !== recipeItem.ingredients.length - 1 && (
                          <Separator className="my-2" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </ScrollArea>
                <RecipeView recipe={recipeItem}/>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default RecipeDetail;