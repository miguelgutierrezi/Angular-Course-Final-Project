import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../../../models/recipe';
import {RecipeService} from '../../../../services/recipe.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() i: number;

  constructor(
    public recipeService: RecipeService
  ) {
  }

  ngOnInit(): void {
  }
}
