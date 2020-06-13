import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Recipe} from '../../../models/recipe';
import {RecipeService} from '../../../services/recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../store/app.reducer';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  @Output() selectedRecipe = new EventEmitter<Recipe>();
  recipes: Array<Recipe> = [];
  recipesChanges: Subscription;

  constructor(
    public recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit(): void {
    this.recipesChanges = this.store.select('recipes')
      .pipe(
        map(recipesState => {
          return recipesState.recipes;
        })
      )
      .subscribe(res => {
        this.recipes = res;
      });
    // this.recipes = this.recipeService.getRecipes();
  }

  newRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.recipesChanges.unsubscribe();
  }
}
