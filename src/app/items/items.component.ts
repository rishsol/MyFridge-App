import { Component, EventEmitter, Output } from '@angular/core';
import { Form } from '../model/form';

//(ngSubmit)="addToFridge()"

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent {
  form = new Form();
  formData: Form[] = [];
  @Output() itemSubmitted = new EventEmitter<Form[]>();

  ngOnInit() {
    this.form = new Form();
    this.formData.push(this.form);
  }

  addToFridge() {
    const fridgeItems: Form[] = [];
    for (let obj of this.formData) {
      if (obj.item != undefined || obj.item != undefined) {
        fridgeItems.push({item: obj.item, expDate: obj.expDate});
      }
    }
    this.itemSubmitted.emit(fridgeItems);
  }
  addForm() {
    this.form = new Form();
    this.formData.push(this.form);
  }

  removeForm(i: any) {
    this.formData.splice(i, 1);
  }
}
