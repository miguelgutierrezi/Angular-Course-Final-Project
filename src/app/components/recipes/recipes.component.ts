import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../models/recipe';
import {RecipeService} from '../../services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;
  constructor(
    public recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    this.recipeService.recipeSelected.subscribe(res => {
      this.selectedRecipe = res;
    });
  }

  onSelected(recipe: Recipe) {
    this.selectedRecipe = recipe;
  }
}
