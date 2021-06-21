import { Component, OnInit } from '@angular/core';
import { Person } from '../Person';
import { contactService } from '../contact.service';
import { RegistrationService } from '../registration.service';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {

  totalRecords: number;
  recordNumber: number;
  saveContactInfo: boolean = false;

  constructor(public service : contactService,
    public registrationService: RegistrationService,
    private confirmationService: ConfirmationService,
  ){ 
    this.recordNumber = this.service.person.length;
  }

  ngOnInit(): void {
    this.getAllContacts();
    this.totalRecords = this.service.person.length;
  }

  getAllContacts(){
    this.service.getAllContacts().subscribe((response: any) => {
      this.service.person = response;
    });
  };

  updateContact(person: Person){
      //display is primeng variable
      this.service.display = true;
      this.service.editInfo(person);
  };

  deleteContact(person: Person){
    this.confirmationService.confirm({
      message: "Delete Contact?",
      accept: () => {
        this.service.deleteInfo(person).subscribe((response: any) => {
          this.getAllContacts();
        });
      },
    });
  };

  saveContact(){
    this.saveContactInfo = true;
    this.service.display = true;
  };

};