import { Injectable } from '@angular/core';
import { Form } from '../model/form'
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({providedIn: 'root'})
export class ItemService {
  private items: Form[] = [];
  private itemsUpdated = new Subject();

  constructor(private http: HttpClient) {}

  getItems() {
    //return [...this.items];
    this.http.get<{items: Form[]}>('http://localhost:3000/items')
      .subscribe((itemsData) => {
        this.items = itemsData.items;
        this.itemsUpdated.next([...this.items]);
      });
  }

  getItemsUpdatedListener() {
    return this.itemsUpdated.asObservable();
  }

  addItem(fridgeItems: Form[]) {
    this.items = fridgeItems;
    this.itemsUpdated.next([...this.items]);
  }
}
