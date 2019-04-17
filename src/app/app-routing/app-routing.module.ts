import { HomeComponent } from '../core/home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recipes', loadChildren: '../recipes/recipes.module#RecipesModule' },
  { path: 'shoppingList', loadChildren: '../shopping-list/shopping-list.module#ShoppingListModule' },
];
@NgModule({
  declarations: [],
  imports: [

    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
