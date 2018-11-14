import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from '@customers/customers.component';
import { FactoriesComponent } from '@factories/factories.component';
import { ItemsComponent } from '@items/items.component';

import { LoginComponent } from './auth/login/login.component';
const routes: Routes = [
      { path: '', redirectTo: 'factories', pathMatch: 'full' },
      { path: 'factories', component: FactoriesComponent },
      { path: 'items', component: ItemsComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
