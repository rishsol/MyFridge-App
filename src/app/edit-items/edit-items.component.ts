import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { ItemService } from "../post-items/item.service";

@Component({
  selector: 'app-edit-items',
  templateUrl: './edit-items.component.html',
  styleUrls: ['./edit-items.component.css']
})
export class EditItemsComponent implements OnInit {
  itemId: string;
  itemName: string;
  itemExpDate: string;
  form: FormGroup;

  constructor (public itemService: ItemService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.itemName = this.route.snapshot.paramMap.get('itemName');
    this.itemExpDate = this.route.snapshot.paramMap.get('itemExpDate');
    this.form = new FormGroup({
      'item': new FormControl(this.itemName, {validators: [Validators.required]}),
      'date': new FormControl(this.itemExpDate, {validators: [Validators.required]})
    });
  }

  updateItem() {
    if (this.form.invalid) {
      return;
    }
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('itemId')) {
        this.itemId = paramMap.get('itemId');
      }
      this.itemService.updateItem(this.itemId, this.form.value.item, this.form.value.date);
    });
    this.itemService.getItems();
    this.router.navigate(['/items']);
  }
}
