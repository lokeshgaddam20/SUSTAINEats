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

export default function AddFoodDialog({ onSave }) {
  const [name, setName] = useState("");
  const [season, setSeason] = useState("");
  const [sustainabilityRating, setSustainabilityRating] = useState("");
  const { toast } = useToast(); // Initialize toast
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    const newFood = {
      name,
      season,
      sustainabilityRating: parseFloat(sustainabilityRating),
    };
    onSave(newFood);
    setIsOpen(false); // Close the dialog
    toast({ title: "Food Added", description: `${name} has been added.` }); // Display toast message
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <PlusCircle className="h-4 w-4" />
          <span className="sr-only">Add Food</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new food</DialogTitle>
          <DialogDescription>
            Enter the details of the new food item. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="foodName" className="text-right">
              Name
            </Label>
            <Input
              id="foodName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="season" className="text-right">
              Season
            </Label>
            <Input
              id="season"
              value={season}
              onChange={(e) => setSeason(e.target.value)}
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
