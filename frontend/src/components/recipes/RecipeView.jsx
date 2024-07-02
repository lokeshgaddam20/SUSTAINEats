import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';


export function RecipeView({ recipe }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="pt-8">View Recipe</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
          <DialogTitle className="text-xl font-bold">{recipe.title}</DialogTitle>
          <DialogDescription>Rating: {recipe.sustainabilityRating}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <h3 className="mb-2 font-semibold">Ingredients</h3>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">Instructions</h3>
            <ul>
              {recipe.instructions.split(", ").map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ul>
          </div>
        </div>
        {/* <DialogFooter>
          <Button type="submit">Close</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}
