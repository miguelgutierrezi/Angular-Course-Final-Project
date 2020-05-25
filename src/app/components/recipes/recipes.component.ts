import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../models/recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  @Input() selectedRecipe: Recipe;
  constructor() { }

  ngOnInit(): void {
  }

  onSelected(recipe: Recipe) {
    this.selectedRecipe = recipe;
  }
}
