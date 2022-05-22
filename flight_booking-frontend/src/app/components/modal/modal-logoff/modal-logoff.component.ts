import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-modal-logoff',
  templateUrl: './modal-logoff.component.html',
  styleUrls: ['./modal-logoff.component.css']
})
export class ModalLogoffComponent implements OnInit {

  @Input() email: any;

  @Output() loggedOut: EventEmitter<Object> = new EventEmitter();


constructor() { }
  ngOnInit(): void {
    
  }


logOut() {
  const loginModel: any = document.getElementById('loginOutModelClose')
  localStorage.removeItem('loggedUser');
  loginModel.click()
  this.loggedOut.emit()
}
}