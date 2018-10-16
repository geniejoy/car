import { NgModule } from '@angular/core';
import { ItemsComponent } from './items.component';
import { SharedModule } from '@shared/shared.module';
import { ItemsRoutingModule } from './items-routing.module';

@NgModule({
  declarations: [ItemsComponent],
  imports: [SharedModule, ItemsRoutingModule]
})
export class ItemsModule {}
