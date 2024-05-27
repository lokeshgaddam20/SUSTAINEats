import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import { Sun, Snowflake, Leaf, Flower2, Star, Salad, Search, PlusCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AddFoodDialog from "./FoodAdd"; // Import the AddFoodDialog component

const FoodDetail = () => {
  const [food, setFood] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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

  const filterFoods = (foods, searchTerm) => {
    return foods.filter((food) =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.sustainabilityRating.toString().includes(searchTerm.toLowerCase()) ||
      food.season.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/foods/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFood(filterFoods(response.data, searchTerm));
      } catch (error) {
        console.error(error);
      }
    };
    fetchFood();
  }, [token, searchTerm]);

  const handleAddFood = async (newFood) => {
    try {
      const response = await axios.post(
        `http://localhost:8800/api/foods/`,
        newFood,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFood((prevFood) => [...prevFood, response.data]);
    } catch (error) {
      console.error("Error adding food:", error);
    }
  };

  if (!food) return <div>Loading...</div>;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <h2 className='text-md font-medium'>Foods</h2>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
              <AddFoodDialog onSave={handleAddFood} />
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search foods..."
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
          {filterFoods(food, searchTerm).map((foodItem, index) => (
            <Card key={index} className="border">
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
