import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecipeService} from '../../services/recipe.service';
import {AuthService} from '../../services/auth.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;

  constructor(
    public recipeService: RecipeService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  onStoreRecipes() {
    this.recipeService.storeRecipesDb();
  }

  onFetchRecipes() {
    this.recipeService.fetchRecipes().subscribe(res => {
      console.log(res);
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
