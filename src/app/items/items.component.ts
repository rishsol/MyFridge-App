import { Component, EventEmitter, Output } from '@angular/core';
import { Form } from '../model/form';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent {
  form = new Form();
  formData = [];
  @Output() itemSubmitted = new EventEmitter();

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
