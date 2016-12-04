import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormArray, FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

import {Subscription} from 'rxjs/Rx';
import {RecipeService} from '../recipe.service';
import {Recipe} from '../recipe';

@Component({
  selector: 'rb-recipe-edit',
  templateUrl: './recipe-edit.component.html'
})
export class RecipeEditComponent implements OnInit, OnDestroy {
	private recipeIndex: number;
	private subscription: Subscription;
  private recipe: Recipe;
  private isNew=true;
  private recipeForm;

  constructor(
  	private route: ActivatedRoute,
  	private recipeService: RecipeService,
    private formBuilder: FormBuilder
  	) { }

  ngOnInit() {
  	this.subscription = this.route.params.subscribe(
  		(params: any)=>{
  			if(params.hasOwnProperty('id')){
  				this.isNew= false;
  				this.recipeIndex = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.recipeIndex);
  			}else{
  				this.isNew = true;
          this.recipe =null;
  			}
  		}		
  	)
  	
  }

  ngOnDestroy(){
   this.subscription.unsubscribe();
  }

  private initForm(isNew: boolean){
   let recipeName="";
   let recipeContent="";
   let imageUrl="";
   let recipeIngredients: FormArray= new FormArray([]);
    
    if(!this.isNew){
      recipeName=this.recipe.name;
      recipeContent=this.recipe.description;
      imageUrl=this.recipe.imagePath;
      
      for(let i=0; i<this.recipe.ingredients.length; i++){
        recipeIngredients.push(
          new FormGroup({
            name: new FormControl(this.recipe.ingredients[i].name), 
            amount: new FormControl(this.recipe.ingredients[i].amount, Validators.pattern('\\d+'))
          })
        );
      }

      this.recipeForm =this.formBuilder.group({

      })
   }
  }

}
