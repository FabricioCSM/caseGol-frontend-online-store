import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {

  email: any;
  name: any;

  @Output() userlogged: EventEmitter<Object> = new EventEmitter();


constructor() { }
  ngOnInit(): void {
    
  }


loginCompleted() {
  const loginModel: any = document.getElementById('loginModelClose')
  const regEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
  const emailValid = regEmail.test(this.email);
  if(this.name.length < 3) {
    alert('Name need to have a minimum 4 letters')
    return
  }
  if(!emailValid) {
    alert('Please, insert a valid email!')
    return
  }
  localStorage.setItem('loggedUser', (this.email))
  localStorage.setItem('loggedUserName', (this.name))
  this.userlogged.emit({name: this.name, email: this.email})
  this.email = '';
  this.name = '';
  loginModel.click()
  return
}
}