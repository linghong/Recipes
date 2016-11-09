import { Component, OnChanges, Input } from '@angular/core';
import { Ingredient } from '../shared/ingredient';
import { ShoppingListService } from  './shopping-list.service';

@Component({
  selector: 'rb-shopping-list-add',
  templateUrl: './shopping-list-add.component.html'
})

export class ShoppingListAddComponent implements OnChanges {
 isAdd =true;
 @Input() item: Ingredient;

  constructor(private sls: ShoppingListService) { 
  }

  ngOnChanges(changes) {
  	if(changes.item.currentValue===null){
  		this.isAdd=true;
      this.item ={name:null, amount:null};
  	}else{
  		this.isAdd=false;
  	}
	
  }

  onSubmit(inputIngredient: Ingredient){
    const newIngredient = new Ingredient(
      inputIngredient.name, inputIngredient.amount);

  	if(!this.isAdd){
  		this.sls.editItem(this.item, newIngredient);
	 } else{
      this.item = newIngredient;
      this.sls.addItem(this.item);
   } 	
  }

  onDelete(){
    this.sls.deleteItem(this.item);
  }
}
