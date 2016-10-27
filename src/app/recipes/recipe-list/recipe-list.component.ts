import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {Recipe} from '../recipe';
import {RecipeItemComponent} from './recipe-item.component'

@Component({
  selector: 'rb-recipe-list',
  templateUrl: './recipe-list.component.html'
})

export class RecipeListComponent implements OnInit {
	
	recipes: Recipe[]=[];
  @Output() recipeSelected = new EventEmitter<Recipe>();

	recipe = new Recipe("Mediterranean Chicken and Pasta", "Mediterranean pasta made with chicken, artichoke hearts, garlic and dried crushed oregano", "http://images.meredith.com/fitness/images/recipe/ss_R137043.jpg");
  
	constructor() { }

  	ngOnInit() {
  	}
  	onSelected(recipe: Recipe){
      this.recipeSelected.emit(recipe);
  	
  	}
}
