import { Component, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { Form } from '../model/form';
import { ItemService } from '../post-items/item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent {
  form = new Form();
  formData: Form[] = [];
  click: boolean = false;

  constructor (public itemService: ItemService) {}

  ngOnInit() {
    this.form = new Form();
    this.formData.push(this.form);
  }

  addToFridge(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const fridgeItems: Form[] = [];
    for (let obj of this.formData) {
      if (obj.item != undefined && obj.item != undefined) {
        fridgeItems.push({id: null, item: obj.item, expDate: obj.expDate});
      }
    }
    this.click = !this.click;
    //[disabled]='click'
    this.itemService.addItem(fridgeItems);
  }
  addForm() {
    this.form = new Form();
    this.formData.push(this.form);
  }

  removeForm(i: any) {
    this.formData.splice(i, 1);
  }
}
