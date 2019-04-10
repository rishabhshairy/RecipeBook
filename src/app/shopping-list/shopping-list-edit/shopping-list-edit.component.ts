import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient';
import { ShoppingListService } from '../shopping-list.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  shoppingEditForm: FormGroup;
  editMode = false;
  addMode = true;
  shopEditIndex: number;
  editedItem: Ingredient;

  constructor(private shopService: ShoppingListService,
              private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.shoppingEditForm = this.formBuilder.group({
      name: ['', Validators.required],
      amount: ['', [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')]]
    });
    this.subscription = this.shopService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.addMode = false;
        this.shopEditIndex = index;
        this.editedItem = this.shopService.getIngredientById(index);
        this.shoppingEditForm.setValue({
          name: this.editedItem.ingName,
          amount: this.editedItem.amount
        });
      }
    );
  }
  get f() {
    return this.shoppingEditForm.controls;
  }
  onAddIngerdient() {
    // const newIngredient = new Ingredient(
    //   this.nameInputRef.nativeElement.value,
    //   this.amountInputRef.nativeElement.value
    // );
    const newIngredient = new Ingredient(
      this.shoppingEditForm.get('name').value, this.shoppingEditForm.get('amount').value
    );
    this.shopService.addIngredient(newIngredient);
  }

  onClear() {
    this.shoppingEditForm.reset();
    this.editMode = false;
    this.addMode = true;
  }
  onUpdate() {
    const newIngredient = new Ingredient(
      this.shoppingEditForm.get('name').value, this.shoppingEditForm.get('amount').value
    );
    this.shopService.updateIngredients(this.shopEditIndex, newIngredient);
  }
  onDelete() {
    this.onClear();
    this.shopService.deleteIngredient(this.shopEditIndex);
    
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
