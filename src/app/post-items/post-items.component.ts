import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ItemsComponent } from '../items/items.component';
import { Form } from '../model/form';
import { ItemService } from './item.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-items',
  templateUrl: './post-items.component.html',
  styleUrls: ['./post-items.component.css']
})
export class PostItemsComponent implements OnInit, OnDestroy {
  @Input() allItems: Form[] = [];
  itemService: ItemService;
  private itemSub = new Subscription();

  constructor(itemService: ItemService) {
    this.itemService = itemService;
  }

  deleteItem(itemID: any, i: any) {
    this.itemService.deleteItem(itemID);
    this.allItems.splice(i, 1);
    //name='pair{{i}}'
  }

  ngOnInit() {
    this.itemService.getItems();
    this.itemSub = this.itemService.getItemsUpdatedListener()
      .subscribe((items: Form[]) => {
        this.allItems = items;
      });
  }

  ngOnDestroy() {
    this.itemSub.unsubscribe();
  }
}
