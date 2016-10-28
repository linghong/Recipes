import { Injectable } from '@angular/core';
import { Recipe } from './recipe';

@Injectable()
export class RecipeService {

	private recipes: Recipe[]=[
        new Recipe("Mediterranean Chicken and Pasta", "Mediterranean pasta made with chicken, artichoke hearts, garlic and dried crushed oregano", "http://images.meredith.com/fitness/images/recipe/ss_R137043.jpg", []),
        new Recipe("Shrimp Scampi Bake", "wonderful 'zip' of Dijon-style mustard", "http://images.media-allrecipes.com/userphotos/560x315/808176.jpg", [])
  ];

  	constructor() { 

	}

	getRecipes(){
		return this.recipes;
	}
}