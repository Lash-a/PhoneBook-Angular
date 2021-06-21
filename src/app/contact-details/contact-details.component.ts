import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { contactService } from '../contact.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})

export class ContactDetailsComponent implements OnInit{

  constructor(public service : contactService) {}

  ngOnInit(){}
 
  getAllContacts(){
    this.service.getAllContacts().subscribe((response: any) => {
      this.service.person = response;
    });
  };

  submited(form: FormControl){
    //aq chasasworebelia ro orive carieli ar daamatos
    if(!this.service.editMode){
     if(form.value.email == null || form.value.address == null || form.value.email && form.value.address == null){
       form.value.email = "";
       form.value.address = "";
     }
      this.service.saveContact(form.value).subscribe((response) => {
        form.reset();
        this.getAllContacts();
        // xuravs primeng-s dialogs
        this.service.display = false;
      });
    }else if(this.service.editMode){

    this.service.saveContact(form.value).subscribe(response => {
      this.getAllContacts();
      this.service.editMode = false;
      // es xuravs primeng-s dialogs
      this.service.display = false;
      form.reset();
    });
    };
  };
};