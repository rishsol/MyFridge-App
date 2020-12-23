import { Injectable } from '@angular/core';
import { Form } from '../model/form'
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ItemService {
  private items: Form[] = [];
  private itemsUpdated = new Subject();

  getItems() {
    return [...this.items];
  }

  getItemsUpdatedListener() {
    return this.itemsUpdated.asObservable();
  }

  addItem(fridgeItems: Form[]) {
    this.items = fridgeItems;
    this.itemsUpdated.next([...this.items]);
  }
}
