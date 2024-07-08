import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'staff',
        loadChildren: () => import('../staff/staff.module').then(m => m.StaffModule)
      },
      {
        path: 'sales',
        loadChildren: () => import('../sales/sales.module').then(m => m.SalesModule)
      },
      {
        path: 'production',
        loadChildren: () => import('../production/production.module').then(m => m.ProductionModule)
      },
      {
        path: 'store',
        loadChildren: () => import('../store/store.module').then(m => m.StoreModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: 'products',
        loadChildren: () => import('../products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'outlets',
        loadChildren: () => import('../outlet/outlet.module').then(m => m.OutletModule)
      },
      {
        path: 'reports',
        loadChildren: () => import('../reports/reports.module').then(m => m.ReportsModule)
      },
      {
        path: 'procurement',
        loadChildren: () => import('../procurement/procurement.module').then(m => m.ProcurementModule)
      },
      {
        path: 'customers',
        loadChildren: () => import('../customers/customers.module').then(m => m.CustomersModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
