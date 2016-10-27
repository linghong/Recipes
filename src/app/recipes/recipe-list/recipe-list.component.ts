import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {Recipe} from '../recipe';
import {RecipeItemComponent} from './recipe-item.component';

@Component({
  selector: 'rb-recipe-list',
  templateUrl: './recipe-list.component.html'
})

export class RecipeListComponent implements OnInit {
	
	recipes: Recipe[]=[
        new Recipe("Mediterranean Chicken and Pasta", "Mediterranean pasta made with chicken, artichoke hearts, garlic and dried crushed oregano", "http://images.meredith.com/fitness/images/recipe/ss_R137043.jpg", []),
        new Recipe("Shrimp Scampi Bake", "wonderful 'zip' of Dijon-style mustard", "http://images.media-allrecipes.com/userphotos/560x315/808176.jpg", [])
  ];
  @Output() recipeSelected = new EventEmitter<Recipe>();


  
	constructor() { }

  	ngOnInit() {
  	}
  	onSelected(recipe: Recipe){
      this.recipeSelected.emit(recipe);
  	
  	}
}
