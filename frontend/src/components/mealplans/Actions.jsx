import { Info, Trash, MoreHorizontal } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

export function Actions({ recipe, onDelete }) {
  // const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDelete = () => {
    onDelete(recipe);
  };
  const handleViewRecipe = async () => {
    // !implement specific recipe navigation
    navigate("/recipes");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={handleDelete}>
          <Trash className="h-4 w-4" />
          <div className="p-2">Delete recipe</div>
        </DropdownMenuItem>
        <DropdownMenuSeparator/>
        <DropdownMenuItem onClick={handleViewRecipe}>
          <Info className="h-4 w-4" />
          <div className="p-2">View recipe</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
