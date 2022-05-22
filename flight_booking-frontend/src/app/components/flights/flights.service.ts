import { Injectable } from '@angular/core';

import { ApiLinkService } from '../../shared/api-link.service';

@Injectable({
  providedIn: 'root'
})

export class FlightsService {

  constructor(private link: ApiLinkService) { }


  getLocation(to: string) {
    return fetch(this.link.server + '/city-and-airport-search/' + to)
  }

  findFlight(originIataCode: string, destinationIataCode: string, date: string) {
    return fetch(this.link.server + '/flight-search?originCode=' + originIataCode + '&destinationCode=' + destinationIataCode + '&dateOfDeparture=' + date, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  bookFlightConfirmation(data: any) {
    return fetch(this.link.server + '/flight-confirmation' , {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  flightBooking(dataForBookingFlight: any) {
    return fetch('http://localhost:5000/flight-booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataForBookingFlight),
    })
  }
}