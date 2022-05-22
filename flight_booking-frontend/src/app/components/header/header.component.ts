import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

name: string = '';
email: string = '';
isLogged: boolean = false;


constructor() { }

  ngOnInit(): void {
    const userLogged = localStorage.getItem('loggedUser') as string;
    const usernameLogged = localStorage.getItem('loggedUserName') as string;
    if (userLogged) {
      this.isLogged = true;
      this.email = userLogged
      this.name = usernameLogged
    }
  }


  loginCompleted() {
    if(this.name.length < 3) {
      alert('Name need to be mininum 4 letters')
      return
    }
    return
  }

  userLogged(event: any) {
    this.name = event.name;
    this.email = event.email;
    this.isLogged = true;
  }

  loggedOut() {
    this.name = '';
    this.email = '';
    this.isLogged = false;
  }
}