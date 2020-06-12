import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../../models/ingredient';
import {ShoppingListService} from '../../../services/shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as Actions from '../store/shopping-list.actions';
import * as fromApp from '../../../store/app.reducer';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('form', {static: false}) ingredientForm: NgForm;
  editing: Subscription;
  isEditing = false;
  ingredient: Ingredient;

  constructor(
    public shoppingListService: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit(): void {
    this.editing = this.store.select('shoppingList').subscribe(stateDate => {
      if (stateDate.editedIngredientId > -1) {
        this.isEditing = true;
        this.ingredient = stateDate.editedIngredient;
        this.ingredientForm.setValue({
          name: this.ingredient.name,
          amount: this.ingredient.amount
        });
      } else {
        this.isEditing = false;
      }
    });
    /*this.editing = this.shoppingListService.edit.subscribe(res => {
      this.index = res;
      this.isEditing = true;
      this.ingredient = this.shoppingListService.getIngredient(this.index);
      this.ingredientForm.setValue({
        name: this.ingredient.name,
        amount: this.ingredient.amount
      });
    });*/
  }

  onSubmit(form: NgForm) {
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    if (!this.isEditing) {
      // this.shoppingListService.addIngredient(newIngredient);
      this.store.dispatch(new Actions.AddIngredient(newIngredient));
    } else {
      // this.shoppingListService.updateIngredient(this.index, newIngredient);
      this.store.dispatch(new Actions.UpdateIngredient(newIngredient));
      this.isEditing = false;
    }
    form.reset();
  }

  onClear(form: NgForm) {
    form.reset();
    this.isEditing = false;
    this.store.dispatch(new Actions.StopEdit());
  }

  onDelete(form: NgForm) {
    // this.shoppingListService.deleteIngredient(this.index);
    this.store.dispatch(new Actions.DeleteIngredient());
    this.onClear(form);
  }

  ngOnDestroy() {
    this.editing.unsubscribe();
    this.store.dispatch(new Actions.StopEdit());
  }
}
