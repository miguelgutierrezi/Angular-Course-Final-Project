import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../../services/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public recipeService: RecipeService
  ) {
  }

  ngOnInit(): void {
  }

  onStoreRecipes() {
    this.recipeService.storeRecipesDb();
  }

  onFetchRecipes() {
    this.recipeService.fetchRecipes().subscribe(res => {
      console.log(res);
    });
  }
}
