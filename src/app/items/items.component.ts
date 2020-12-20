import { Component } from '@angular/core';
import { Form } from '../model/form';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent {
  form = new Form();
  formData = [];

  ngOnInit() {
    this.form = new Form();
    this.formData.push(this.form);
  }

  addToFridge() {
    console.log(this.formData);
  }
  addForm() {
    this.form = new Form();
    this.formData.push(this.form);
  }

  removeForm(i: any) {
    this.formData.splice(i, 1);
  }
}
