import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/Rx";

import { Recipe} from '../recipe';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'rb-recipe-detail',
  templateUrl: './recipe-detail.component.html',
})

export class RecipeDetailComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private recipeIndex: number;
  selectedRecipe: Recipe;

  constructor(private sls: ShoppingListService, private route: ActivatedRoute, private recipeService: RecipeService) {

   }

  ngOnInit() {
  	this.subscription = this.route.params.subscribe(
  		(params:any) => {
  			this.recipeIndex = params['id'];
  			this.selectedRecipe = this.recipeService.getRecipe(this.recipeIndex);
  		}
  	);
  }

 
  onAddToShoppingList(){
  	this.sls.addItems(
  		this.selectedRecipe.ingredients); 
  }

  ngOnDestroy(){
   this.subscription.unsubscribe();
  }
}
