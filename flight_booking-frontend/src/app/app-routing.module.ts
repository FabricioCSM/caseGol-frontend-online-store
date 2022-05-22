import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckFlightsComponent } from './components/flights/check-flights/check-flights.component';
import { FlightSearchComponent } from './components/flights/flight-search/flight-search.component';



const routes: Routes = [
  {
    path: "",
    redirectTo: '/flightsSearch',
    pathMatch: 'full',
  },
  {
    path: "flightsSearch",
    component: FlightSearchComponent,
  },
  {
    path: "checkFlights",
    component: CheckFlightsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }