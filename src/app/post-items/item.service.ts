import { Injectable } from '@angular/core';
import { Form } from '../model/form'
import { pairs, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class ItemService {
  private items: Form[] = [];
  private itemsUpdated = new Subject();

  constructor(private http: HttpClient) {}

  getItems() {
    //return [...this.items];
    this.http.get<{items: any}>('http://localhost:3000/items')
      .pipe(map((itemData) => {
        return itemData.items.map(item => {
          return {
            item: item.item,
            expDate: item.expDate,
            id: item._id
          };
        });
      }))
      .subscribe(items => {
        this.items = items;
        this.itemsUpdated.next([...this.items]);
      });
  }

  getItemsUpdatedListener() {
    return this.itemsUpdated.asObservable();
  }

  addItem(fridgeItems: Form[]) {
    this.http.post('http://localhost:3000/items', fridgeItems)
      .subscribe((responseData) => {
        this.items = fridgeItems;
        this.itemsUpdated.next([...this.items]);
      });
  }

  deleteItem(itemId: string) {
    this.http.delete('http://localhost:3000/items/' + itemId)
      .subscribe(() => {
        console.log('item deleted');
        console.log(itemId);
      });
  }
}
