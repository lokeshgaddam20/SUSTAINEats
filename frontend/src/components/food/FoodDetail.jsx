import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';

import { Link } from "react-router-dom"

import { Sun, Snowflake, Leaf, Flower2, Star, Salad, Search } from 'lucide-react';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const FoodDetail = () => {
  const [food, setFood] = useState(null);
  const { token } = useContext(AuthContext);

  const SeasonIcon = ({ season }) => {
    const icons = {
      summer: <Sun size={16} />,
      winter: <Snowflake size={16} />,
      autumn: <Leaf size={16} />,
      spring: <Flower2 size={16} />,
    };

    return icons[season] || null;
  };

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/foods/`, { headers: { Authorization: `Bearer ${token}` } });
        console.log(response.data);
        setFood(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFood();
  }, [token]);

  if (!food) return <div>Loading...</div>;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Your Foods
          </Link>
        </nav>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {food.map((foodItem, index) => (
            <Card x-chunk="dashboard-01-chunk-0 border border-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-bold">
                  {foodItem.name}
                </CardTitle>
                <Salad />
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-md font-medium">
                  <Star /><p className='text-lg font-medium'> {foodItem.sustainabilityRating}</p>
                </div>
                <p className=" flex items-center gap-3 text-md text-muted-foreground">
                {foodItem.season.charAt(0).toUpperCase() + foodItem.season.slice(1)}
                <SeasonIcon season={foodItem.season} />
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default FoodDetail;