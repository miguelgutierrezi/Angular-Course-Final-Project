import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../../models/ingredient';
import {ShoppingListService} from '../../services/shopping-list.service';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as Actions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: Array<Ingredient>}>;
  private ingredientsChanged: Subscription;

  constructor(
    public shoppingListService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
  ) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    /*this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientsChanged = this.shoppingListService.ingredientsChanged.subscribe(res => {
      this.ingredients = res;
    });*/
  }

  onEditItem(i: number) {
    // this.shoppingListService.edit.next(i);
    this.store.dispatch(new Actions.StartEdit(i));
  }

  ngOnDestroy() {
    // this.ingredientsChanged.unsubscribe();
  }
}

