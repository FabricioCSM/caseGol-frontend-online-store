import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxLoadingModule } from 'ngx-loading';

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ModalModule } from './components/modal/modal.module';
import { FlightSearchComponent } from './components/flights/flight-search/flight-search.component';
import { CheckFlightsComponent } from './components/flights/check-flights/check-flights.component';
import { RoundTripFlightComponent } from './components/flights/round-trip-flight/round-trip-flight.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    FlightSearchComponent,
    CheckFlightsComponent,
    RoundTripFlightComponent,
    HeaderComponent,
  ],
  imports: [
    ModalModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    NgxLoadingModule.forRoot({}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
