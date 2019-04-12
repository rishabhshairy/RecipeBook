import { AuthService } from './../auth/auth.service';
import { RecipeService } from './../recipes/recipe.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';


@Injectable()
export class DataStorageService {
    constructor(private httpClient: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }
    saveData() {
        const token = this.authService.getToken();
        const header = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.httpClient.put('https://ng-recipe-book-24d92.firebaseio.com/recipes.json?auth=' + token,
            this.recipeService.getRecipe(), { headers: header });
    }
    getRecipesFromDb() {
        const token = this.authService.getToken();
        return this.httpClient.get<Recipe[]>('https://ng-recipe-book-24d92.firebaseio.com/recipes.json?auth=' + token)
        .subscribe(
            (res: Recipe[]) => {this.recipeService.setRecipe(res);}
        );
    }
}
