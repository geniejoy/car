import { AsnValidatorComponent } from './asn-validator/asn-validator.component';
import { AsPathValidatorComponent } from './as-path-validator/as-path-validator.component';
import { BgpCsValidatorComponent } from './bgp-cs-validator/bgp-cs-validator.component';
import { IpValidatorComponent } from './ip-validator/ip-validator.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'asPathValidator', component: AsPathValidatorComponent },
  { path: 'ipValidator', component: IpValidatorComponent },
  { path: 'asnValidator', component: AsnValidatorComponent },
  { path: 'bgpCsValidator', component: BgpCsValidatorComponent },
  { path: 'ipValidator', component: IpValidatorComponent },
  { path: '**', redirectTo: 'ipValidator' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class LabRoutingModule {}
