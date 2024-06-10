import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistributionComponent } from './distribution.component';

const routes: Routes = [{ path: '', component: DistributionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistributionRoutingModule { }
