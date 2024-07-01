import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../auth/AuthContext";
import Dialogue from "./Dialogue";

import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CardWithoutHover,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "../ui/scroll-area";
import { Actions } from "./Actions";
import AddButton from "./AddButton";

export default function MealPlan() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [recipes, setRecipe] = useState([]);
  const [meal, setMeal] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const [mealResponse, recipeResponse] = await Promise.all([
          axios.get(`http://localhost:8800/api/meals/`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`http://localhost:8800/api/recipes/`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setMeal(mealResponse.data);
        setRecipe(recipeResponse.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleUpdateRecipe = async (updatedRecipe, mealName) => {
    try {
      const mealPlan = meal.find((plan) => plan.name === mealName);
      if (mealPlan) {
        const updatedRecipes = mealPlan.recipes.map((recipeTitle) =>
          recipeTitle === updatedRecipe.prevTitle ? updatedRecipe.title : recipeTitle
        );

        await axios.put(
          `http://localhost:8800/api/meals/${mealPlan.name}`,
          { recipes: updatedRecipes },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setMeal((prevMeal) =>
          prevMeal.map((plan) =>
            plan.name === mealName ? { ...plan, recipes: updatedRecipes } : plan
          )
        );

        setRecipe((prevRecipes) =>
          prevRecipes.map((recipe) =>
            recipe.title === updatedRecipe.prevTitle ? { ...recipe, title: updatedRecipe.title } : recipe
          )
        );
      }
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  const handleDeleteRecipe = async (recipeName, mealName) => {
    try {
      const mealPlan = meal.find((plan) => plan.name === mealName);
      console.log(mealPlan);

      if (mealPlan) {
        const updatedRecipes = mealPlan.recipes.filter(
          (recipeTitle) => recipeTitle !== recipeName
        );

        const response = await axios.put(
          `http://localhost:8800/api/meals/${mealPlan.name}`,
          { recipes: updatedRecipes },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setMeal((prevMeal) =>
          prevMeal.map((plan) =>
            plan.name === mealName ? { ...plan, recipes: updatedRecipes } : plan
          )
        );
        setRecipe((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe.title !== recipeName)
        );
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const handleAddRecipe = async (mealType) => {
    try {
      const response = await axios.put(
        `http://localhost:8800/api/meals/add-recipe`,
        { mealName: mealType, recipeTitle: selectedRecipe },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMeal((prevMeal) =>
        prevMeal.map((plan) =>
          plan.name === mealType ? { ...plan, recipes: [...plan.recipes, selectedRecipe] } : plan
        )
      );
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };
  

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <Tabs defaultValue="Dinner">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="Dinner">Dinner</TabsTrigger>
                  <TabsTrigger value="Lunch">Lunch</TabsTrigger>
                  <TabsTrigger value="Snack">Snack</TabsTrigger>
                  <TabsTrigger value="Breakfast">Breakfast</TabsTrigger>
                </TabsList>
              </div>
              {["Breakfast", "Lunch", "Snack", "Dinner"].map((mealType) => (
                <TabsContent key={mealType} value={mealType}>
                  <CardWithoutHover>
                    <CardHeader className="px-7">
                      <CardTitle>{mealType}</CardTitle>
                      <CardDescription>Eat healthy and enjoy!</CardDescription>
                      <AddButton></AddButton>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Recipes</TableHead>
                            <TableHead>No. of Ingredients</TableHead>
                            <TableHead className="hidden md:table-cell">
                              Date
                            </TableHead>
                            <TableHead>
                              Footprint (CO<sub>2</sub>)
                            </TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {meal
                            .filter((mealPlan) => mealPlan.name === mealType)
                            .flatMap((mealPlan) =>
                              mealPlan.recipes.map((recipeTitle, index) => {
                                const recipe = recipes.find(
                                  (r) =>
                                    r.title === recipeTitle &&
                                    r.meal === mealPlan.name
                                );
                                return recipe ? (
                                  <TableRow key={index}>
                                    <TableCell>{recipe.title}</TableCell>
                                    <TableCell>
                                      {recipe.ingredients.length}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                      {new Date(
                                        mealPlan.date
                                      ).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>0</TableCell>
                                    <TableCell>
                                    <Dialogue
                                        recipe={recipe}
                                        onSave={(updatedRecipe) =>
                                          handleUpdateRecipe(
                                            updatedRecipe,
                                            mealPlan.name
                                          )
                                        }
                                      />
                                      <Actions
                                        recipe={recipe}
                                        onDelete={(recipe) =>
                                          handleDeleteRecipe(
                                            recipe.title,
                                            mealPlan.name
                                          )
                                        }
                                      />
                                    </TableCell>
                                  </TableRow>
                                ) : (
                                  <TableRow>
                                    <TableCell className="h-24 text-center">
                                      No results.
                                    </TableCell>
                                  </TableRow>
                                );
                              })
                            )}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </CardWithoutHover>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
