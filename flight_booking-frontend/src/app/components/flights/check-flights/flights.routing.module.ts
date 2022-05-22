import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckFlightsComponent } from './check-flights.component';

const routes: Routes = [
  {
    path: "",
    component: CheckFlightsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckFlightsRoutingModule { }
