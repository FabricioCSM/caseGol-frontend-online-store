import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-check-flights',
  templateUrl: './check-flights.component.html',
  styleUrls: ['./check-flights.component.css']
})
export class CheckFlightsComponent implements OnInit {

  isLogged: boolean | undefined;
  hasTickets: boolean = false;
  userLoggedTickets: any;

  constructor() { }

    ngOnInit(): void {
      const userLogged = localStorage.getItem('loggedUser') as string;
      this.isLogged = false;
      if (userLogged) {
        this.userLoggedTickets = JSON.parse(localStorage.getItem(userLogged) as string);
        this.isLogged = true
      }
      if(this.userLoggedTickets) {
        this.hasTickets = true;
      };
    }

    userlogged(evento: any) {
      this.isLogged = true;
    }
}