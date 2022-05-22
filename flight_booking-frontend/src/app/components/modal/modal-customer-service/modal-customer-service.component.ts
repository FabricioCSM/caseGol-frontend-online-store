import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-modal-customer-service',
  templateUrl: './modal-customer-service.component.html',
  styleUrls: ['./modal-customer-service.component.css']
})
export class ModalCustomerServiceComponent implements OnInit {

@Input() email: any;
@Input() name: any;

constructor() { }
  ngOnInit(): void {
    
  }


loginCompleted() {
  console.log(this.email, this.name)
}
}