import {Component, OnInit} from '@angular/core';
import {Recipe} from '../../../models/recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Array<Recipe> = [
    new Recipe('Arroz con pollo', 'Colombian typical food', 'https://s1.eestatic.com/2020/01/28/cocinillas/recetas/pasta-y-arroz/Arroz-Pollo-Pasta_y_arroz_463216136_143694760_1706x960.jpg'),
    new Recipe('Arroz con pollo', 'Colombian typical food', 'https://s1.eestatic.com/2020/01/28/cocinillas/recetas/pasta-y-arroz/Arroz-Pollo-Pasta_y_arroz_463216136_143694760_1706x960.jpg'),
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
