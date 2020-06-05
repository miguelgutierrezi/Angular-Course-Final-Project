import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../../models/ingredient';
import {ShoppingListService} from '../../../services/shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('form', {static: false}) ingredientForm: NgForm;
  editing: Subscription;
  index: number;
  isEditing = false;
  ingredient: Ingredient;

  constructor(
    public shoppingListService: ShoppingListService
  ) {
  }

  ngOnInit(): void {
    this.editing = this.shoppingListService.edit.subscribe(res => {
      this.index = res;
      this.isEditing = true;
      this.ingredient = this.shoppingListService.getIngredient(this.index);
      this.ingredientForm.setValue({
        name: this.ingredient.name,
        amount: this.ingredient.amount
      });
    });
  }

  onSubmit(form: NgForm) {
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    if (!this.isEditing) {
      this.shoppingListService.addIngredient(newIngredient);
    } else {
      this.shoppingListService.updateIngredient(this.index, newIngredient);
      this.isEditing = false;
    }
    form.reset();
  }

  onClear(form: NgForm) {
    form.reset();
    this.isEditing = false;
  }

  onDelete(form: NgForm) {
    this.shoppingListService.deleteIngredient(this.index);
    this.onClear(form);
  }

  ngOnDestroy() {
    this.editing.unsubscribe();
  }
}
