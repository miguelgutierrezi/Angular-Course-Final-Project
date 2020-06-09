import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipesComponent} from './components/recipes/recipes.component';
import {ShoppingListComponent} from './components/shopping-list/shopping-list.component';
import {RecipeDetailComponent} from './components/recipes/recipe-detail/recipe-detail.component';
import {RecipeListComponent} from './components/recipes/recipe-list/recipe-list.component';
import {RecipeStartComponent} from './components/recipes/recipe-start/recipe-start.component';
import {RecipeEditComponent} from './components/recipes/recipe-edit/recipe-edit.component';
import {RecipesResolverService} from './services/recipes-resolver.service';
import {AuthComponent} from './components/auth/auth.component';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: 'auth', component: AuthComponent},
  {
    path: 'recipes', canActivate: [AuthGuard], component: RecipesComponent, children: [
      {path: '', component: RecipeStartComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
      {path: 'list', component: RecipeListComponent},
      {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]}
    ]
  },
  {path: 'shoppingList', component: ShoppingListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
