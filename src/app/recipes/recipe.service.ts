import { Injectable, EventEmitter } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import { Recipe } from './recipe';
import {Ingredient} from '../shared/ingredient';
import 'rxjs/RX';

@Injectable()
export class RecipeService {
  recipesChangingEvent = new EventEmitter<Recipe[]>();

	private recipes: Recipe[]=[
        new Recipe("Mediterranean Chicken and Pasta", "Mediterranean pasta made with chicken, artichoke hearts, garlic and dried crushed oregano", "http://images.meredith.com/fitness/images/recipe/ss_R137043.jpg", [
        new Ingredient("chicken legs", 3, 100), 
        new Ingredient("artichoke", 2, 200), 
        new Ingredient("garlic", 3, 50), 
        new Ingredient("oregano", 1, 60)]),
        
        new Recipe("Shrimp Scampi Bake", "wonderful 'zip' of Dijon-style mustard", "http://images.media-allrecipes.com/userphotos/560x315/808176.jpg", [])
  ];

  constructor(private http: Http) { 

	}

	getRecipes(){
		return this.recipes;
	}

  getRecipe(id: number){
   return this.recipes[id];
  }

  deleteRecipe(recipe: Recipe){
   this.recipes.splice(this.recipes.indexOf(recipe), 1);
  }

  addRecipe(newRecipe: Recipe){
    this.recipes.push(newRecipe);
  }

  editRecipe(oldRecipe: Recipe, newRecipe: Recipe){
    this.recipes[this.recipes.indexOf(oldRecipe)]=newRecipe;
  }

  storeData(){
    const body=JSON.stringify(this.recipes);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.put('https://mealplan-b1aff.firebaseio.com/recipes.json', body, {headers: headers});
  }

  fetchData(){
    return this.http.get('https://mealplan-b1aff.firebaseio.com/recipes.json').map((response: Response)=>response.json())
    .subscribe(
      (data: Recipe[])=>{
        this.recipes= data;
        this.recipesChangingEvent.emit(this.recipes);
      }
    );
  }
}