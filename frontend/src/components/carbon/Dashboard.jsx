import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../auth/AuthContext";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Users2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
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

export function Dashboard() {
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
                  <Card>
                    <CardHeader className="px-7">
                      <CardTitle>{mealType}</CardTitle>
                      <CardDescription>Eat healthy and enjoy!</CardDescription>
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
                                  </TableRow>
                                ) : null;
                              })
                            )}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
