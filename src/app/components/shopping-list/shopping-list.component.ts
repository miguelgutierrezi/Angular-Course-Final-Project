import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../../models/ingredient';
import {ShoppingListService} from '../../services/shopping-list.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Array<Ingredient> = [];
  private ingredientsChanged: Subscription;

  constructor(
    public shoppingListService: ShoppingListService
  ) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientsChanged = this.shoppingListService.ingredientsChanged.subscribe(res => {
      this.ingredients = res;
    });
  }

  onEditItem(i: number) {
    this.shoppingListService.edit.next(i);
  }

  ngOnDestroy() {
    this.ingredientsChanged.unsubscribe();
  }
}

