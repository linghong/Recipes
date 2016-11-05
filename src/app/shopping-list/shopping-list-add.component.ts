import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient';
import { ShoppingListService } from  './shopping-list.service';

@Component({
  selector: 'rb-shopping-list-add',
  templateUrl: './shopping-list-add.component.html'
})

export class ShoppingListAddComponent implements OnInit {
  isAdd =true;
  ingredientAdded: Ingredient;

  constructor(private sls: ShoppingListService) { 
  }

  ngOnInit() {
	
  }

  onSubmit(inputIngredient: Ingredient){
  	if(this.isAdd===true){
		this.ingredientAdded = new Ingredient(inputIngredient.name, inputIngredient.amount);
		this.sls.addItem(this.ingredientAdded);
	}  	
  }
}
