import { Component, Input, OnInit } from '@angular/core';
import { FlightsService } from '../flights.service';
@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  @Input() logged: any = false;

  from: any = "";
  to: any = "";
  destination: any;
  toLocation: any = [];
  departureDateTemplate: boolean = false;
  fromLocation: any = [];
  checkedRoundTrip: boolean = false;
  returnTrip: boolean = false;
  origin: any;
  date: any = "";
  flights: any;
  flightTemplate: boolean = false;
  email: string = '';
  name: string = '';
  booked: boolean = false;
  first: string = "";
  last: string= "";
  bookedFlight: any;
  originChoose: boolean = false;
  toChoose: boolean = false;
  loading: boolean = false;
  locationToReverseTo: any;
  fromLocationTemplate: boolean = true;
  toLocationTemplate: boolean = false;

  constructor(
      private fetch: FlightsService,
    ) { }
    
    ngOnInit(): void {}

  handleFromLocation() {
    if (this.from.length > 3) {
      this.fetch.getLocation(this.from)
      .then(response => response.json())
      .then(data => {
        this.fromLocation = data.data;
        })
      }
    }

  handleOrigin(location: any) {
    this.origin = location;
    this.locationToReverseTo = location;
    this.originChoose = true;
    this.flightTemplate = false;
    this.toLocationTemplate = true;
    this.fromLocation = [];
  }




  handleToLocation() {
    if (this.to.length > 3) {
      this.fetch.getLocation(this.to)
      .then(response => response.json())
      .then(data => this.toLocation = data.data)
      }
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
    if (this.first == "" && this.last == "") {
      alert("Enter your first and last name")
      return;
    }
    this.loading = true;
    const data = { flight: flight };
    const name = {
      first: this.first,
      last: this.last
    }
    const dataForBookingFlight = { flight: flight, name: name };
    this.fetch.bookFlightConfirmation(data)
    .then(response => response.json())
    .then(dataObject => {
      const data = { flight: flight };
      this.fetch.flightBooking(dataForBookingFlight)
      .then(response => response.json())
      .then(data => {
        this.bookedFlight = data;
        this.loading = false;
        this.booked  = true;
        this.returnTrip = this.checkedRoundTrip;
        this.from = '';
        this.to = '';
        this.flightTemplate = false;
        this.flights = [];
        const userLogged = localStorage.getItem('loggedUser');
        const userLoggedTickets = JSON.parse(localStorage.getItem(userLogged as string) as string);
        userLoggedTickets ? localStorage.setItem(userLogged as string, JSON.stringify([...userLoggedTickets, this.bookedFlight])) : localStorage.setItem(userLogged as string, JSON.stringify([this.bookedFlight]));

      })
      .catch((error) => {
        this.loading = false;
        alert(error)
      });
    })
    .catch((error) => {
      console.error('Error:', error);
      this.loading = false;
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
    this.toChoose= false;
    this.checkedRoundTrip = false
    this.returnTrip = false;
    this.departureDateTemplate = false;
    this.locationToReverseTo = '';
    this.destination = '';
    this.origin = '';
    this.toLocation = [];
    this.from = '';
    this.to = '';
    this.first = "";
    this.date = "";
    this.last = "";
    this.booked= false;
  }

}