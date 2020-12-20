import { Component } from '@angular/core';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html'
})
export class ItemsComponent {
  addedItem = '';
  addedDate = '';

  items = [''];
  dates = [''];

  totalItems = 0;

  addToFridge() {
    if (this.totalItems == 0) {
      this.addItem();
    }
    for (var i = 0; i < this.items.length; i++) {
      console.log(this.items[i]);
    }
  }
  addItem() {
    this.totalItems++;
    this.items.push(this.addedItem);
    this.dates.push(this.addedDate);
  }

  deleteItem() {
    this.totalItems--;
    this.items.pop();
    this.dates.pop();
  }
}
