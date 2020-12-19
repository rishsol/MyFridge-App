import { Component } from '@angular/core';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html'
})
export class ItemsComponent {
  addedItem = '';
  addedDate = '';

  newItem = '';
  newDate = '';

  addToFridge() {
    this.newItem = this.addedItem;
    this.newDate = this.addedDate;
  }
  addItem() {
    document.append("<input type='text' [(ngModel)]='addedItem'><input type='date' [(ngModel)]='addedDate'><button> Delete </button>");
  }
}
