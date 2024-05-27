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
import { Pencil } from "lucide-react";
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

export default function Dialogue({ recipe, onSave }) {
  const [title, setTitle] = useState(recipe.title);
  const { toast } = useToast(); // initialize toast
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    onSave({ prevTitle: recipe.title, title });
    setIsOpen(false);
    toast({
      title: "Recipe Updated",
      description: "These are not related to recipe page.",
      action: <ToastAction altText="Close">Close</ToastAction>,
    })
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button aria-haspopup="true" size="icon" variant="ghost">
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit recipe</DialogTitle>
          <DialogDescription>
            Make changes to your recipe here. Click save when you're done.
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
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
