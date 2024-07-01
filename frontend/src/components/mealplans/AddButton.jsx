import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from "../auth/AuthContext";
import {
  Badge,
  Button,
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator
} from "@/components/ui";

import { CirclePlus, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AddButton({ mealType, onRecipeSelect }) {
  const [availableRecipes, setAvailableRecipes] = useState([]);
  const [filter, setFilter] = useState('');
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchAvailableRecipes = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/recipes?meal=${mealType}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAvailableRecipes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAvailableRecipes();
  }, [mealType, token]);

  const filteredRecipes = availableRecipes.filter(recipe =>
    recipe.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <CirclePlus className="mr-2 h-4 w-4" />
          Add Recipe
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput
            placeholder={`Search ${mealType} recipes`}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {filteredRecipes.map((recipe) => (
                <CommandItem
                  key={recipe._id}
                  onSelect={() => onRecipeSelect(recipe)}
                >
                  <div className="mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary">
                    <Check className={cn("h-4 w-4")} />
                  </div>
                  <span>{recipe.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
