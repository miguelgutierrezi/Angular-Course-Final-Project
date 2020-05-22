import { Component, OnInit } from '@angular/core';
import {Ingredient} from '../../models/ingredient';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Array<Ingredient> = [
    new Ingredient('Apples', 5),
    new Ingredient('Blackberries', 20),
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
