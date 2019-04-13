import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingListEditComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ]
})
export class ShoppingListModule{
    
}