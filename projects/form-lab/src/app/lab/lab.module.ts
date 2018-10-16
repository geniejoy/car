import { AsnValidatorComponent } from './asn-validator/asn-validator.component';
import { AsPathValidatorComponent } from './as-path-validator/as-path-validator.component';
import { BgpCsValidatorComponent } from './bgp-cs-validator/bgp-cs-validator.component';
import { IpValidatorComponent } from './ip-validator/ip-validator.component';
import { LabComponent } from './lab/lab.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
@NgModule({
  declarations: [
    AsnValidatorComponent,
    BgpCsValidatorComponent,
    IpValidatorComponent,
    LabComponent,
    AsPathValidatorComponent
  ],
  imports: [SharedModule],
  bootstrap: [LabComponent]
})
export class LabModule {}
