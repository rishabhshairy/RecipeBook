import { Recipe } from './../recipe.model';
import { RecipeService } from './../recipe.service';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
  Validators
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeEditForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private recipeService: RecipeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((data: Params) => {
      this.id = +data.id;
      this.editMode = data.id != null;
      this.initForm();
    });
    console.log(`Edit Mode= ${this.editMode}`);
  }

  get f() {
    return this.recipeEditForm.controls;
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDesc = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipeById(this.id);
      console.log(recipe.ingredients);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDesc = recipe.description;
      if (recipe.ingredients) {
        for (const item of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              ingName: new FormControl(item.ingName, Validators.required),
              amount: new FormControl(item.amount, [
                Validators.required,
                Validators.pattern('^[1-9]+[0-9]*$')
              ])
            })
          );
        }
      }
    }
    this.recipeEditForm = this.formBuilder.group({
      name: [recipeName, Validators.required],
      imagePath: [recipeImagePath],
      description: [recipeDesc, Validators.required],
      ingredients: recipeIngredients
    });
  }

  onSubmit() {

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeEditForm.value);
      console.log(this.recipeEditForm);

    } else {
      this.recipeService.addRecipe(this.recipeEditForm.value);
      console.log(this.recipeEditForm);

    }
    this.router.navigate(['../'], {relativeTo: this.route});
  }
  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
  onAddIngredient() {
    (this.recipeEditForm.get('ingredients') as FormArray).push(
      new FormGroup({
        ingName: new FormControl('', Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern('^[1-9]+[0-9]*$')
        ])
      })
    );
  }
  onDeleteIngredient(i: number) {
    ( this.recipeEditForm.get('ingredients') as FormArray).removeAt(i);

  }
}
