import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Recipe} from '../../../models/recipe';
import {RecipeService} from '../../../services/recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

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
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.recipesChanges = this.recipeService.recipesChanges.subscribe(res => {
      this.recipes = res;
    });
    this.recipes = this.recipeService.getRecipes();
  }

  newRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.recipesChanges.unsubscribe();
  }
}
