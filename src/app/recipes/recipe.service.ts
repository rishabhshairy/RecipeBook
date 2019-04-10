import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe('Momo',
      'Chicken Momo',
      'http://findyoufood.com/wp-content/uploads/2017/11/chicken-momo-600x480.jpg',
      [new Ingredient('Flour', 200),
      new Ingredient('Chicken', 500)]),

    new Recipe('Chicken Tandoor',
      'Tandoor',
      'https://www.onceuponachef.com/images/2015/01/Tandoori-Chicken-Drumsticks2-760x505.jpg',
      [new Ingredient('Chicken', 1000),
      new Ingredient('Spices', 300)]),
  ];
  constructor(private shopService: ShoppingListService) { }


  getRecipe() {
    return this.recipes.slice();
  }
  getRecipeById(id: number) {
    return this.recipes[id];
  }
  addIngredientToShopList(data: Ingredient[]){
    this.shopService.addIngredients(data);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
    console.log(newRecipe);
    
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
