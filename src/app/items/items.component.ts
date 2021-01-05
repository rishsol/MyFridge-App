import { Component, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Form } from '../model/form';
import { ItemService } from '../post-items/item.service';
import { PostItemsComponent } from '../post-items/post-items.component';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  form = new Form();
  formData: Form[] = [];
  click: boolean = false;
  private mode: string = 'create'
  private itemId: string;
  private postToUpdate: Form;
  constructor (public itemService: ItemService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.form = new Form();
    this.formData.push(this.form);
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('itemId')) {
        this.mode = 'edit';
        this.itemId = paramMap.get('itemId')
        this.postToUpdate = this.itemService.getItem(this.itemId);
      } else {
        this.mode = 'create';
        this.itemId = null;
      }
    })
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
    this.router.navigate(['/items'])

  }
  addForm() {
    this.form = new Form();
    this.formData.push(this.form);
  }

  removeForm(i: any) {
    this.formData.splice(i, 1);
  }
}
