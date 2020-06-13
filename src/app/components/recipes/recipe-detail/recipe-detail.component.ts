import {Component, OnInit} from '@angular/core';
import {Recipe} from '../../../models/recipe';
import {RecipeService} from '../../../services/recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import {map} from 'rxjs/operators';
import * as Actions from '../store/recipes.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    public recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params.id;
      // this.recipe = this.recipeService.getRecipe(this.id);
      this.store.select('recipes')
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
      console.log(this.id);
    });

    console.log(this.recipe);
  }

  toShoppingList() {
    this.recipeService.addIngredients(this.recipe.ingredients);
  }

  editRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    // this.recipeService.deleteRecipe(this.id);
    this.store.dispatch(new Actions.DeleteRecipe(this.id));
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
