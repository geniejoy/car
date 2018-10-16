import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemComponent } from '@system/system.component';
import { SystemRoutingModule } from '@system/system-routing.module';

@NgModule({
  imports: [CommonModule, SystemRoutingModule],
  declarations: [SystemComponent]
})
export class SystemModule {}
