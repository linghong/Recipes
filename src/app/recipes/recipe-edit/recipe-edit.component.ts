import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
  private recipeForm: FormGroup;

  constructor(
  	private route: ActivatedRoute,
  	private recipeService: RecipeService,
    private formBuilder: FormBuilder,
    private router: Router
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
        this.initForm();
  		}		
  	)  	
  }  

  onSubmit(){
     const newRecipe = this.recipeForm.value;
     if(this.isNew){
        this.recipeService.addRecipe(newRecipe);
     } else{
      this.recipeService.editRecipe(this.recipe, newRecipe);
     }
     this.navigateBack();
  }

  onCancel(){
    this.navigateBack();
  }

  onRemoveIngredient(index: number){
  console.log(this.recipeForm.controls['ingredients']);
    (<FormArray>this.recipeForm.controls['ingredients']).removeAt(index);
  }

  onAddIngredient(name: string, amount: string){
    (<FormArray>this.recipeForm.controls['ingredients']).push(
      new FormGroup({
          name: new FormControl(name, Validators.required),
          amount: new FormControl(amount, [Validators.required, Validators.pattern('\\d+')])
      })
    )
  }

  ngOnDestroy(){
   this.subscription.unsubscribe();
  }
  
  private navigateBack(){
    this.router.navigate(['../']);
  }
  private initForm(){
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
   }

    this.recipeForm =this.formBuilder.group({
        name: recipeName,
        imagePath: imageUrl,
        description: recipeContent,
        ingredients: recipeIngredients
    })
  }

}
