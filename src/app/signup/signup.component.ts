import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { contactService } from '../contact.service';
import { RegistrationService } from '../registration.service';

import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [MessageService]
})
export class SignupComponent implements OnInit {

  // sign up html-ში გამოიყენება პაროლის გადმოსაცემად
  userPassword: string;
  // ვამოწმებთ შესულია თუ არა მომხმარებელი და იმის მიხედვით გამოგვაქ ui
  loggedIn: boolean;
  // ამ ცვლადში აპი-დან დაბრუნდება ან 0 ან 1 იმ შემთხვევაში არსებობს თუ არა მაილი 
  EmailCount: any;
  // errorMesseage: string = '';
  // თუ ემაილი არსებობს მაგ შემთხვევაში ამ ცვლადს გადმოეცემა მნიშვნელობა რომელიც იძახებს showEmailError() ფუნქციას
  responseMesseage: any;


  constructor(public service: contactService, 
    private registrationService: RegistrationService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService) {}

  ngOnInit(): void {
    this.loggedIn = this.registrationService.loggedIn;
  }

  submited(form: NgForm){

    const formValue = form.value;
    const _this = this;

    if(form.valid){
      this.registrationService.checkIfEmailExists(form.value).subscribe((response) => {
        _this.EmailCount = response;
        this.responseMesseage = response;
        if(this.responseMesseage != ''){
          this.showEmailError();
        }
      }, (err: HttpErrorResponse) => {
      }, () => {
        if(this.EmailCount == 0){
          this.registrationService.registerAccount(formValue).subscribe((response) => {
            this.showSuccess();
            setTimeout(() => {
              this.router.navigate(['/login'], { relativeTo: this.route }) ;
            }, 1000);
            
          }, (err) => {
          });
        }
      });
    }else{
      this.showFieldError();
    }
    
    form.reset();
  };

  showFieldError() {
    this.messageService.add({key: 'fieldError', severity:'error', summary: 'Please fill in all the required fields.', detail: 'password must contain minimum 5 characters'});
  }

  showEmailError() {
    this.messageService.add({key: 'emailError', severity:'error', summary: 'Email Already exists', detail: 'Chose diferent Email to continue'});
  }

  showSuccess(){
    this.messageService.add({key: 'success', severity:'success', summary: 'Account Registered successfuly', detail: 'Log in to continue'});
  }

};