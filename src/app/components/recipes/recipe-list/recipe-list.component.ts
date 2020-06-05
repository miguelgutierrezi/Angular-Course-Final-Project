import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from '../../../models/recipe';
import {RecipeService} from '../../../services/recipe.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() selectedRecipe = new EventEmitter<Recipe>();
  recipes: Array<Recipe> = [];
  constructor(
    public recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

  newRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
