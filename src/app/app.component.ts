import { Component } from '@angular/core';
import { Form } from './model/form';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  fridgeItems: Form[] = [];

  addToFridge(allItems) {
    this.fridgeItems = allItems;
  }
}
