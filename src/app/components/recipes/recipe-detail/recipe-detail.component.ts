import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../../models/recipe';
import {RecipeService} from '../../../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipe: Recipe;
  constructor(
    public recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    console.log(this.recipe);
  }

  toShoppingList() {
    this.recipeService.addIngredients(this.recipe.ingredients);
  }

}
