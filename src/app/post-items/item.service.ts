import { Injectable } from '@angular/core';
import { Form } from '../model/form'
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ItemService {
  private items: Form[] = [];
  private itemsUpdated = new Subject();

  constructor (private http: HttpClient) {}

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
        this.items.sort((a, b) => a.expDate > b.expDate ? 1 : -1);
        this.itemsUpdated.next([...this.items]);
      });
  }

  getItemsUpdatedListener() {
    return this.itemsUpdated.asObservable();
  }

  getItem(id: string) {
    return {...this.items.find(i => i.id === id)};
  }

  addItem(fridgeItems: Form[]) {
    this.http.post('http://localhost:3000/items', fridgeItems)
      .subscribe((responseData) => {

      this.items.push.apply(this.items, fridgeItems);
      this.itemsUpdated.next([...this.items]);
    });
  }

  updateItem(id: string, item: string, expDate: string) {
    const updatedItem: Form = {id: id, item: item, expDate: expDate};
    this.http.put('http://localhost:3000/items/' + id, updatedItem)
    .subscribe(res => console.log(res));
  }

  deleteItem(itemId: string) {
    this.http.delete('http://localhost:3000/items/' + itemId)
      .subscribe(() => {
        this.items = this.items.filter(item => item.id !== itemId);
        this.itemsUpdated.next([...this.items]);
      });
  }
}
