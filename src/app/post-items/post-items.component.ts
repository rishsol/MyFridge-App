import { Component, Input } from "@angular/core";
import { ItemsComponent } from '../items/items.component';
import { Form } from '../model/form';

@Component({
  selector: 'app-post-items',
  templateUrl: './post-items.component.html',
  styleUrls: ['./post-items.component.css']
})
export class PostItemsComponent {
  @Input() allItems: Form[] = [];
}
