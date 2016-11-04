import { Injectable } from '@angular/core';
import { Recipe } from './recipe';
import {Ingredient} from '../shared/ingredient';

@Injectable()
export class RecipeService {

	private recipes: Recipe[]=[
        new Recipe("Mediterranean Chicken and Pasta", "Mediterranean pasta made with chicken, artichoke hearts, garlic and dried crushed oregano", "http://images.meredith.com/fitness/images/recipe/ss_R137043.jpg", [
        new Ingredient("chicken legs", 3), 
        new Ingredient("artichoke", 2), 
        new Ingredient("garlic", 3), 
        new Ingredient("oregano", 1)]),
        
        new Recipe("Shrimp Scampi Bake", "wonderful 'zip' of Dijon-style mustard", "http://images.media-allrecipes.com/userphotos/560x315/808176.jpg", [])
  ];

  constructor() { 

	}

	getRecipes(){
		return this.recipes;
	}

  getRecipe(id: number){
   return this.recipes[id];
  }
}