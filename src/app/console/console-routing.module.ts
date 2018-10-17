import { ConsoleComponent } from '@console/console.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ConsoleComponent,
    children: [
      { path: 'items', loadChildren: '@items/items.module#ItemsModule' },
      { path: 'customers', loadChildren: '@customers/customers.module#CustomersModule' },
      { path: 'factories', loadChildren: '@factories/factories.module#FactoriesModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleRoutingModule {}
