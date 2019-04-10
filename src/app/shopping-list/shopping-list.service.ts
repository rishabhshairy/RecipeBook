import { Injectable} from '@angular/core';
import { Ingredient } from '../shared/ingredient';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  private ingredients: Ingredient[] = [new Ingredient('garam masala', 100)];
  ingredientChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  constructor() { }
  getIngerident() {
    return this.ingredients.slice();
  }
  getIngredientById(id: number){
    return this.ingredients[id];
  }
  addIngredient(data: Ingredient) {
    this.ingredients.push(data);
    this.ingredientChanged
    .next(this.ingredients.slice());
  }
  addIngredients(dataIng: Ingredient[]) {
   this.ingredients.push(...dataIng);
   this.ingredientChanged.next(this.ingredients.slice());
  }
  updateIngredients(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }
  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientChanged.next(this.ingredients.slice());
  }
}
