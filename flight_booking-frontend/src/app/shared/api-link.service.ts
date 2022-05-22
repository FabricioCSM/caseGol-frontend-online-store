import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiLinkService {

  server = 'http://localhost:5000';

  constructor() { }
}
