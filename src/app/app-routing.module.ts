import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsComponent } from './items/items.component';
import { PostItemsComponent } from './post-items/post-items.component';
import { EditItemsComponent } from './edit-items/edit-items.component';

const routes: Routes = [
  {path: 'items', component: PostItemsComponent},
  {path: '', component: ItemsComponent},
  {path: 'edit/:itemId/:itemName/:itemExpDate', component: EditItemsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
