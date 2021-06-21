import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { contactService } from '../contact.service';
import { RegistrationService } from '../registration.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public registrationService: RegistrationService, 
    public contactService: contactService,
    private cookie: CookieService
    ) {}

  ngOnInit(): void {}

  logOut(){
    this.registrationService.loggedIn = false;
    localStorage.setItem('loggedIn', 'false');
    this.cookie.deleteAll();
  };

};
