import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { contactService } from '../contact.service';
import { RegistrationService } from '../registration.service';

import {MessageService} from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})

export class LoginComponent implements OnInit {

  // გადმოეცემა მომხმარებლის პაროლი
  userPassword: string;
  // გადმოეცემა მომხმარებლის ემაილი
  userEmail: string;
  // გადაეცემა 1 ან 0 იმის მიხედვით არსებობს თუ არა ეს აქაუნთი
  checkAcc:any;
  // formNotValid: boolean = false;

  constructor(public service: contactService, 
    public registrationService: RegistrationService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private cookie: CookieService
    ) {}

  ngOnInit(): void {
  }

  submited(form: NgForm){
    // this keyword does not work in subscription method
    const _this = this;
    let userName = this.userEmail;
    let pas = this.userPassword;

    if(form.valid){
      // this.formNotValid = false;

      this.registrationService.logIntoAcc(form.value).subscribe((response) => {
          _this.checkAcc = response;
          if(_this.checkAcc == 1){
            this.registrationService.getToken(userName, pas).subscribe((data: any) => {
              this.cookie.set('access_token', data.access_token);
              localStorage.setItem('loggedIn', 'true');
              this.registrationService.loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
              this.router.navigate(['/contacts'], { relativeTo: this.route }) ;
            }); 
           
          }else {
            this.showEmailOrPasswordError();
          }
        });
    }else{
      // this.formNotValid = true;
      this.showInputError();
    }
    // this.emails = this.userEmail;
    form.reset();
  }

  showEmailOrPasswordError() {
    this.messageService.add({key: 'emailOrPasswordError', severity:'error', summary: 'This Email or Password Does not Exists', detail: 'Sign Up Or Try Again'});
  }

  showInputError(){
    this.messageService.add({key: 'inputError', severity:'error', summary: 'Please fill in all the required fields correctly.', detail: 'password must contain minimum 5 characters'});
  }

  clear() {
    this.messageService.clear();
  }

};
