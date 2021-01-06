import { Component, Input, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
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

  constructor (public itemService: ItemService, private router: Router, private route: ActivatedRoute) {
    this.itemName = this.route.snapshot.paramMap.get('itemName');
    this.itemExpDate = this.route.snapshot.paramMap.get('itemExpDate');
    console.log(this.itemExpDate);
  }

  ngOnInit() {
    (<HTMLInputElement>document.getElementById("itemInput")).defaultValue = this.itemName;
    (<HTMLInputElement>document.getElementById("itemExpDate")).defaultValue = this.itemExpDate;
    /*
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      (<HTMLInputElement>document.getElementById("itemInput")).defaultValue = paramMap.get('itemName');
      (<HTMLInputElement>document.getElementById("itemExpDate")).defaultValue = paramMap.get('itemExpDate');
    });
    */
  }

  updateItem(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('itemId')) {
        this.itemId = paramMap.get('itemId');
      }
      this.itemService.updateItem(this.itemId, form.value.item, form.value.date);
    });
    this.itemService.getItems();
    this.router.navigate(['/items']);
  }
}
