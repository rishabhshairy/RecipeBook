import { AppRoutingModule } from './../app-routing/app-routing.module';
import { SharedModule } from './../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { AuthGaurd } from '../auth/auth-gaurd.service';
@NgModule({
    declarations: [
        HomeComponent,
        HeaderComponent
    ],
    imports: [SharedModule, AppRoutingModule],
    exports: [HeaderComponent, AppRoutingModule],
    providers: [ShoppingListService, RecipeService, DataStorageService, AuthService, AuthGaurd],
})
export class CoreModule {

}