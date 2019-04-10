import { Component, OnInit, Input, Output, OnDestroy } from "@angular/core";
import { Ingredient } from "../shared/ingredient";
import { ShoppingListService } from "./shopping-list.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private shopSub: Subscription;
  constructor(private shopService: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.shopService.getIngerident();
    this.shopSub = this.shopService.ingredientChanged.subscribe(
      (data: Ingredient[]) => {
        this.ingredients = data;
      }
    );
  }
  onEditItem(index: number){
    this.shopService.startedEditing.next(index);
  }
  ngOnDestroy() {
    this.shopSub.unsubscribe();
    console.log('Out of shopping list');
  }
}
