import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsoleComponent } from '@console/console.component';

const routes: Routes = [
  {
    path: '',
    component: ConsoleComponent,
    children: [
      { path: 'items', loadChildren: '@items/items.module#ItemsModule' },
      { path: 'customers', loadChildren: '@customers/customers.module#CustomersModule' },
      // { path: 'factories', loadChildren: '@factory/factory.module#FactoryModule' },
      { path: 'factories', loadChildren: '@factory/factory.module#FactoryModule' },
      { path: 'system', loadChildren: '@system/system.module#SystemModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleRoutingModule {}
