import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast"; 
import { Textarea } from "@/components/ui/textarea"

function AddRecipeDialog({ onSave }) {
  const [title, setTitle] = useState("");
  const [meal, setMeal] = useState("");
  const [sustainabilityRating, setSustainabilityRating] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instruct, setInstruct] = useState("");
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    const newRecipe = {
      meal,
      title,
      ingredients: ingredients.split(',').map(ingredient => ingredient.trim()),
      instructions: instruct,
      sustainabilityRating: parseFloat(sustainabilityRating),
    };
    onSave(newRecipe);
    setIsOpen(false); // Close the dialog
    toast({ 
      title: "Recipe Added", 
    description: `${title} has been added.`,
  }); // Display toast message
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <PlusCircle className="h-4 w-4" />
          <span className="sr-only">Add Recipe</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new recipe</DialogTitle>
          <DialogDescription>
            Enter the details of the new recipe. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="recipeTitle" className="text-right">
              Title
            </Label>
            <Input
              id="recipeTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="mealType" className="text-right">
              Meal
            </Label>
            <Input
              id="mealType"
              value={meal}
              onChange={(e) => setMeal(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="sustainabilityRating" className="text-right">
              Sustainability Rating
            </Label>
            <Input
              id="sustainabilityRating"
              value={sustainabilityRating}
              onChange={(e) => setSustainabilityRating(e.target.value)}
              className="col-span-3"
              type="number"
              step="0.1"
              min="0"
              max="5"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ingredients" className="text-right">
              Ingredients
            </Label>
            <Input
              id="ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="col-span-3"
              placeholder="Comma-separated"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="instructions" className="text-right">
              Instructions
            </Label>
            <Textarea 
            id="instructions"
            value={instruct}
            onChange={(e) => setInstruct(e.target.value)}
            className="col-span-3"
            placeholder="Type your instructions here." />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddRecipeDialog;