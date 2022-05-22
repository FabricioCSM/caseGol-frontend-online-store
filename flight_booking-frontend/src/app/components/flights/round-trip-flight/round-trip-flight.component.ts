import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FlightsService } from '../flights.service';
@Component({
  selector: 'app-round-trip-flight',
  templateUrl: './round-trip-flight.component.html',
  styleUrls: ['./round-trip-flight.component.css']
})
export class RoundTripFlightComponent implements OnInit {

@Input() origin: any;
@Input() destination: any;
@Input() bookedFlight: any;
@Input() email: any;

@Output() returnMain: EventEmitter<boolean> = new EventEmitter<boolean>();

from: any = "";
fromLocation: any = [];
checkedRoundTrip: boolean = false;
returnTrip: boolean = false;
returnBooked: boolean = false;
originChoose: boolean = false;
returnFlightBooked: any;
toChoose: boolean = false;
loading: boolean = false;
locationToReverseTo: any;
fromLocationTemplate: boolean = true;
toLocationTemplate: boolean = false;
booked: boolean = false;
to: any = "";
toLocation: any = [];
departureDateTemplate: boolean = false;
date: any = "";
flights: any;
flightTemplate: boolean = false;
first: string = "";
last: string= "";

constructor(
  private fetch: FlightsService,
) { }

  ngOnInit(): void {
    
  }

  handleOrigin(location: any) {
    this.origin = location;
    this.locationToReverseTo = location;
    this.originChoose = true;
    this.flightTemplate = false
    this.toLocationTemplate = true;
    this.fromLocation = [];
  }

  handleDestination(location: any) {
    this.destination = location;
    this.toChoose = true;
    this.toLocation = [];
    this.departureDateTemplate = true;
  }
  

  onFindFlight() {
    if (this.date == "") {
      alert("Please choose a date")
    } else {
      this.loading = true;
      this.fetch.findFlight(this.origin.iataCode, this.destination.iataCode, this.date)
      .then(response => response.json())
      .then(data => {
        this.flights = data.data;

        this.flightTemplate = true;
        this.loading = false;
      })
      .catch((error) => {
        this.loading = false;
        alert(error)
      });
    }
  }
  

  onBookFlight(flight: any) {
    const userLogged = localStorage.getItem('loggedUser')
      if (!userLogged) {
        alert("You need to login to purchase a ticket")
        return
      }
      this.loading = true;
      const data = { flight: flight };
      const name = {
        first: this.bookedFlight.data.travelers[0].name.firstName,
        last: this.bookedFlight.data.travelers[0].name.lastName
      }
      const dataForBookingFlight = { flight: flight, name: name };
      this.fetch.bookFlightConfirmation(data)
      .then(response => response.json())
      .then(dataObject => {
        const data = { flight: flight };
        this.fetch.flightBooking(dataForBookingFlight)
        .then(response => response.json())
        .then(data => {
          this.returnFlightBooked = data;
          this.loading = false;
          this.booked  = true;
          this.returnBooked = !this.returnBooked;
          this.returnTrip = true;
          this.from = '';
          this.to = '';
          this.flightTemplate = false;
          this.flights = [];
          const userLogged = localStorage.getItem('loggedUser');
          const userLoggedTickets = JSON.parse(localStorage.getItem(userLogged as string) as string);
          localStorage.setItem(userLogged as string, JSON.stringify([...userLoggedTickets, this.returnFlightBooked]));
        })
        .catch((error) => {
          this.loading = false
          alert(error)
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        this.loading = false
        alert(error)
      });
    }

  checkedRoundTripMarked(value: boolean) {
    this.checkedRoundTrip = value;

  };

  changeLocation() {
    this.fromLocationTemplate = true;
    this.toLocationTemplate = false;
  }

  reverseFields() {
    this.origin = this.destination;
    this.destination = this.locationToReverseTo;
    this.locationToReverseTo = this.origin;
    this.from = '';
    this.to = '';
  }

  returnToMain() {
    this.returnBooked = true;
    this.returnMain.emit();
  }
}