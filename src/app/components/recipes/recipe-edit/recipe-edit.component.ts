import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../../../services/recipe.service';
import {Recipe} from '../../../models/recipe';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import {map} from 'rxjs/operators';
import * as Actions from '../store/recipes.actions';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  recipe: Recipe;
  private recipeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    public recipeService: RecipeService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params.id;
      this.editMode = params.id != null;
      // this.recipe = this.recipeService.getRecipe(this.id);
      this.recipeSub = this.store.select('recipes')
        .pipe(
          map(recipesState => {
            return recipesState.recipes.find((recipe, index) => {
              return index === this.id;
            });
          })
        )
        .subscribe(recipe => {
          this.recipe = recipe;
        });
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = '';
    let recipeDescription = '';
    let recipeImagePath = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      recipeName = this.recipe.name;
      recipeDescription = this.recipe.description;
      recipeImagePath = this.recipe.imagePath;
      if (this.recipe.ingredients) {
        for (const ingredient of this.recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      ingredients: recipeIngredients
    });
  }

  get ingredients() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient(i: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(i);
  }

  onClearIngredients() {
    (this.recipeForm.get('ingredients') as FormArray).clear();
  }

  onSubmit() {
    console.log(this.recipeForm.value);
    if (this.editMode) {
      // this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      this.store.dispatch(new Actions.UpdateRecipe({
        id: this.id,
        newRecipe: this.recipeForm.value
      }));
    } else {
      // this.recipeService.addRecipe(this.recipeForm.value);
      this.store.dispatch(new Actions.AddRecipe(this.recipeForm.value));
    }
    this.onCancel();
  }

  ngOnDestroy() {
    if (this.recipeSub) {
      this.recipeSub.unsubscribe();
    }
  }
}
