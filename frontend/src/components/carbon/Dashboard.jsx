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
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function Dashboard() {

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("") 
  const [recipe, setRecipe] = useState([])
  const { token } = useContext(AuthContext);

  // Assume these data are fetched from the respective APIs
  const mealPlans = [
    { name: "Breakfast", recipes: ["Idly", "Dosa"], date: "2023-06-24" },
    { name: "Lunch", recipes: ["Biryani", "Curry"], date: "2023-06-25" },
    { name: "Snack", recipes: ["Samosa", "Vada"], date: "2023-06-26" },
    { name: "Dinner", recipes: ["Pizza", "Pasta"], date: "2023-06-27" },
  ]

  const recipes = [
    { title: "Idly", ingredients: ["Rice", "Urad Dal"], mealType: "Breakfast" },
    { title: "Dosa", ingredients: ["Rice", "Urad Dal"], mealType: "Breakfast" },
    { title: "Biryani", ingredients: ["Rice", "Chicken", "Spices"], mealType: "Lunch" },
    { title: "Curry", ingredients: ["Chicken", "Coconut Milk", "Spices"], mealType: "Lunch" },
    { title: "Samosa", ingredients: ["Potato", "Peas", "Spices"], mealType: "Snack" },
    { title: "Vada", ingredients: ["Urad Dal", "Spices"], mealType: "Snack" },
    { title: "Pizza", ingredients: ["Flour", "Tomato Sauce", "Cheese"], mealType: "Dinner" },
    { title: "Pasta", ingredients: ["Flour", "Tomato Sauce", "Cheese"], mealType: "Dinner" },
  ]

  const carbonFootprints = {
    "Idly": 0.2,
    "Dosa": 0.3,
    "Biryani": 1.5,
    "Curry": 1.2,
    "Samosa": 0.5,
    "Vada": 0.3,
    "Pizza": 2.0,
    "Pasta": 1.8,
  }

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/recipes/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecipe(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecipe();
  }, [token]);


  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <Tabs defaultValue="Breakfast">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="Breakfast">Breakfast</TabsTrigger>
                  <TabsTrigger value="Lunch">Lunch</TabsTrigger>
                  <TabsTrigger value="Snack">Snack</TabsTrigger>
                  <TabsTrigger value="Dinner">Dinner</TabsTrigger>
                </TabsList>
              </div>
              {mealPlans.map((mealPlan, index) => (
                <TabsContent key={index} value={mealPlan.name}>
                  <Card x-chunk="dashboard-05-chunk-3">
                    <CardHeader className="px-7">
                      <CardTitle>{mealPlan.name}</CardTitle>
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
                          {mealPlan.recipes.map((recipeTitle, index) => {
                            const recipe = recipes.find(
                              (r) =>
                                r.title === recipeTitle &&
                                r.mealType === mealPlan.name
                            )
                            return (
                              <TableRow key={index}>
                                <TableCell>
                                  <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                      <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={open}
                                        className="w-[200px] justify-between"
                                      >
                                        {/* {value
                                          ? recipe.find((framework) => framework.value === value)?.label
                                          : "Select framework..."} */}
                                          Select framweork
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[200px] p-0">
                                      <Command>
                                        <CommandInput placeholder="Search framework..." />
                                        <CommandEmpty>No framework found.</CommandEmpty>
                                        <CommandGroup>
                                          {recipe.map((framework) => (
                                            <CommandItem
                                              key={framework}
                                              value={framework}
                                              onSelect={(currentValue) => {
                                                setValue(currentValue === value ? "" : currentValue)
                                                setOpen(false)
                                              }}
                                            >
                                              <Check
                                                className={cn(
                                                  "mr-2 h-4 w-4",
                                                  value === framework ? "opacity-100" : "opacity-0"
                                                )}
                                              />
                                              {framework}
                                            </CommandItem>
                                          ))}
                                        </CommandGroup>
                                      </Command>
                                    </PopoverContent>
                                  </Popover>
                                </TableCell>
                                <TableCell>
                                  {recipe?.ingredients.length || 0}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {mealPlan.date}
                                </TableCell>
                                <TableCell>
                                  {carbonFootprints[recipeTitle] || 0}
                                </TableCell>
                              </TableRow>
                            )
                          })}
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
  )
}