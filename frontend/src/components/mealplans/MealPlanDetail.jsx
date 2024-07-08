import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../auth/AuthContext";
import Dialogue from "./Dialogue";
import { Button } from "@/components/ui/button";
import {
  CardWithoutHover,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Actions } from "./Actions";
import AddButton from "./AddButton";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Content from "./Content";

export default function MealPlan() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [recipes, setRecipe] = useState([]);
  const [meal, setMeal] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isContentLoading, setIsContentLoading] = useState(false);
  const [abortController, setAbortController] = useState(null);

  const [showInputs, setShowInputs] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [user, setUser] = useState({
    age: "",
    disease: "",
    location: "",
    allergies: "",
  });
  const [aiSuggestions, setAiSuggestions] = useState("");
  const { token } = useContext(AuthContext);

  const apiKey = "AIzaSyDGL4Ic5bjIslpShWSMw856IcJrJ669RB8";
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction:
      "You are a well trained meal planner and know all the recipes specific to any location in the world. Your task is to provide better mealplan based on it's sustainability rating, carbon footprint emission value and its nutritional values. Act as this character and provide answers in first perspective. calling the user YOU. Keep the tone casual. ",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };

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
          recipeTitle === updatedRecipe.prevTitle
            ? updatedRecipe.title
            : recipeTitle
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
            recipe.title === updatedRecipe.prevTitle
              ? { ...recipe, title: updatedRecipe.title }
              : recipe
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

  const handleAddRecipe = async (mealType, newRecipe) => {
    console.log(mealType, newRecipe);
    try {
      const response = await axios.put(
        `http://localhost:8800/api/meals/recipe/add-recipe`,
        { mealName: mealType, recipeTitle: newRecipe },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMeal((prevMeal) =>
        prevMeal.map((plan) =>
          plan.name === mealType
            ? { ...plan, recipes: [...plan.recipes, newRecipe] }
            : plan
        )
      );
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  const handleGenerateClick = async () => {
    setIsGenerating(true);
    setShowInputs(false);
    const controller = new AbortController();
    setAbortController(controller);
    try {
      await generateAISuggestions(controller.signal);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Request aborted");
      } else {
        console.error("Error generating suggestions:", error);
      }
    }
    setIsGenerating(false);
  };

  const handleCloseContent = () => {
    if (abortController) {
      abortController.abort();
    }
    setShowInputs(true);
    setUser({ age: "", disease: "", location: "", allergies: "" });
    setAiSuggestions("");
    setIsGenerating(false);
  };

  const generateAISuggestions = async (signal) => {
    const allRecipes = meal.flatMap((mealPlan) => mealPlan.recipes);
    const prompt = `As a sustainability and health advisor, your task is to analyze and provide suggestions to improve the sustainability and healthiness of the following meal plans. 
  
    User Information:
    - Age: ${user.age}
    - Health Condition: ${user.disease || "None"}
    - Location: ${user.location}
    - Allergies: ${user.allergies || "None"}
  
    Current Meal Plans:
    - Breakfast: ${
      meal.find((plan) => plan.name === "Breakfast")?.recipes.join(", ") ||
      "No recipes"
    }
    - Lunch: ${
      meal.find((plan) => plan.name === "Lunch")?.recipes.join(", ") ||
      "No recipes"
    }
    - Snack: ${
      meal.find((plan) => plan.name === "Snack")?.recipes.join(", ") ||
      "No recipes"
    }
    - Dinner: ${
      meal.find((plan) => plan.name === "Dinner")?.recipes.join(", ") ||
      "No recipes"
    }
  
    Objective:
    1. Suggest alternative recipes that can reduce the carbon footprint of the current meal plans.
    2. Ensure the suggestions are suitable considering the user's health conditions and allergies.
    3. Maintain or improve the nutritional value of the meal plans.
    4.Add the percentage of estimated reduce in Carbon footprint (*in bold letters) in new plan comparing the older plan. Don't include the mention of older recipes in the current subheading.
  
    Provide detailed suggestions for each meal type (Breakfast, Lunch, Snack, Dinner) and explain how each suggested change contributes to sustainability and health. Be a lot specific and regional to Indian foods and recipes and Don't exceed more than 2 lines for each discription
    
    Output must be Markdown`;

    try {
      const chatSession = model.startChat({
        generationConfig,
        safetySettings: [
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
        ],
        history: [
          {
            role: "user",
            parts: [
              {
                text: "As a sustainability and health advisor, your task is to analyze and provide suggestions to improve the sustainability and healthiness of the following meal plans. \n  \n    User Information:\n    - Age: 40\n    - Diseases:high Blood pressure\n    - Location:Coastal Region\n    - Allergies: None\n  \n    Current Meal Plans:\n    - Breakfast: Idle, Coffee\n    - Lunch: Parota, Rice, Dal\n    - Snack: Chocolate cake\n    - Dinner: Chapathi, All mix veggies, Chicken\n  \n    Objective:\n    1. Suggest alternative recipes that can reduce the carbon footprint of the current meal plans.\n    2. Ensure the suggestions are suitable considering the user's health conditions and allergies.\n    3. Maintain or improve the nutritional value of the meal plans.\n  \n    Provide detailed suggestions for each meal type (Breakfast, Lunch, Snack, Dinner) and explain how each suggested change contributes to sustainability and health.\n\n",
              },
            ],
          },
          {
            role: "model",
            parts: [
              {
                text: '{"Breakfast": {"Current": "Idle, Coffee", "Suggestion": "Oatmeal with Berries and Nuts", "Sustainability": "Oats have a lower carbon footprint than most grains. Locally sourced berries and nuts reduce transport emissions.", "Health": "Provides fiber, complex carbohydrates, and healthy fats. Berries are rich in antioxidants and nuts offer heart-healthy fats, which is beneficial for managing high blood pressure."}, "Lunch": {"Current": "Parota, Rice, Dal", "Suggestion": "Brown Rice Salad with Grilled Fish and Seasonal Vegetables", "Sustainability": "Brown rice has a lower carbon footprint than white rice. Replacing parota with brown rice salad reduces the use of refined flour and oil. Local seasonal vegetables and grilled fish minimize transport emissions and promote sustainable fishing practices.", "Health": "Brown rice offers more fiber and nutrients. Grilled fish is a good source of lean protein and omega-3 fatty acids. Vegetables provide essential vitamins and minerals. This meal is lower in sodium and fat, beneficial for managing high blood pressure."}, "Snack": {"Current": "Chocolate Cake", "Suggestion": "Fruit Salad with Yogurt", "Sustainability": "Fruits are locally sourced and require less energy to produce than processed snacks. Yogurt is a good source of probiotics and has a lower carbon footprint than many dairy products.", "Health": "Fruits are rich in fiber, vitamins, and minerals. Yogurt provides calcium and probiotics, which are beneficial for gut health. This snack is lower in sugar and fat, promoting healthier eating habits."}, "Dinner": {"Current": "Chapathi, All mix veggies, Chicken", "Suggestion": "Quinoa Salad with Roasted Vegetables and Tofu", "Sustainability": "Quinoa is a complete protein source with a lower carbon footprint than many other grains. Roasted vegetables require less energy than stir-fried veggies. Tofu is a plant-based protein source that has a lower carbon footprint than chicken. This meal reduces reliance on animal products and promotes sustainable agriculture.", "Health": "Quinoa is high in fiber, protein, and iron. Tofu is a good source of protein and calcium. Roasted vegetables offer antioxidants and fiber. This meal is lower in saturated fat and cholesterol, which is beneficial for managing high blood pressure."}}\n',
              },
            ],
          },
        ],
      });

      setIsContentLoading(true);
      const result = await chatSession.sendMessage(prompt, { signal });
      setAiSuggestions(result.response.text());
    } catch (error) {
      console.error("Error generating AI suggestions:", error);
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
                    <CardHeader className="px-7 flex">
                      <div className="flex justify-between">
                        <div>
                        <CardTitle>{mealType}</CardTitle>
                        <CardDescription>
                          Eat healthy and enjoy!
                        </CardDescription>
                        </div>
                      <AddButton mealType={mealType} onSave={handleAddRecipe} />
                      </div>
                      {/* <Button onClick={() => handleAddRecipe(mealType)}>Add Recipe</Button> */}
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
                              mealPlan.recipes.length > 0 ? (
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
                                      <TableCell>
                                        {(recipe.carbon * 1000).toFixed(1)}
                                      </TableCell>
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
                                  ) : null;
                                })
                              ) : (
                                <TableRow key="no-results">
                                  <TableCell
                                    className="h-24 text-center"
                                    colSpan={5}
                                  >
                                    No results.
                                  </TableCell>
                                </TableRow>
                              )
                            )}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </CardWithoutHover>
                </TabsContent>
              ))}
            </Tabs>
          </div>
          <div className="lg:col-span-1">
            <CardWithoutHover
              className={!showInputs ? "h-[calc(100vh-200px)]" : ""}
            >
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl font-bold mb-4 bg-gradient-to-bl from-orange-400 via-pink-500 to-blue-500 text-transparent bg-clip-text">
                  AI Suggestions
                </CardTitle>
                {!showInputs && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCloseContent}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {showInputs ? (
                  <div className="space-y-5 pb-4">
                    <input
                      type="number"
                      placeholder="Age"
                      value={user.age}
                      onChange={(e) =>
                        setUser({ ...user, age: e.target.value })
                      }
                      className="w-full p-2 border rounded"
                    />
                    <input
                      type="text"
                      placeholder="Disease"
                      value={user.disease}
                      onChange={(e) =>
                        setUser({ ...user, disease: e.target.value })
                      }
                      className="w-full p-2 border rounded"
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={user.location}
                      onChange={(e) =>
                        setUser({ ...user, location: e.target.value })
                      }
                      className="w-full p-2 border rounded"
                    />
                    <input
                      type="text"
                      placeholder="Allergies"
                      value={user.allergies}
                      onChange={(e) =>
                        setUser({ ...user, allergies: e.target.value })
                      }
                      className="w-full p-2 border rounded"
                    />
                    <Button
                      variant="ai"
                      className="w-full flex items-center justify-center gap-2"
                      onClick={handleGenerateClick}
                      disabled={!user.age || !user.location}
                    >
                      Generate AI Suggestions
                      <img
                        src="/icon-sparkling.png"
                        alt="AI"
                        className="w-5 h-5"
                      />
                    </Button>
                  </div>
                ) : (
                  <Content
                    aiSuggestions={aiSuggestions}
                    isLoading={isGenerating}
                  />
                )}
              </CardContent>
            </CardWithoutHover>
          </div>
        </main>
      </div>
    </div>
  );
}
