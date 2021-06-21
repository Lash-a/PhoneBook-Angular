import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from './Person';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class contactService {

  ID: number;
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  address: string;
  // ამ ცვლადის მიხედვით ამატებს ახალ კონტაქტს თუ false არის თუ არადა 
  // უშვებს edit-ის ფუნქციონალს
  editMode: boolean = false;
  person:Person[];
  userEmail: string;

  // primeng dialog variable
  display: boolean = false;
  token: string = ""; 

  reqUrl: string = "https://localhost:44393/api/PhoneBook/";
   
  constructor(private http: HttpClient, private cookie: CookieService) {
   this.person = [];
   this.firstName = '';
   this.lastName = '';
   this.mobile = '';
   this.email = '';
   this.address = '';
   this.ID = null;
   this.userEmail = null;

  };

  getAuthHeader(){
    let httpOptions:any;
    return httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + this.cookie.get('access_token')
      })
    };
  };

  getAllContacts(): Observable<Person[]>{
    return this.http.post<Person[]>(this.reqUrl + "GetAllContacts", JSON.stringify(null), this.getAuthHeader()); 
  };
  

  deleteInfo(person: Person): Observable<Person>{
    person.ID = person.ID;
    return this.http.post<Person>(this.reqUrl + "DeleteContact", JSON.stringify(person.ID), this.getAuthHeader());
  };

  editInfo(person: Person){
    this.editMode = true;
    this.ID = person.ID;
    this.firstName = person.FirstName;
    this.lastName = person.LastName;
    this.mobile = person.Mobile;
    this.email = person.Email;
    this.address = person.Address;
  };

  saveContact(person: Person): Observable<Person>{

      if(!this.editMode){
         this.person.push(person);
        return this.http.post<Person>(this.reqUrl + "SaveContact", JSON.stringify(person), this.getAuthHeader());
      }else if(this.editMode) {
        this.person.splice(this.ID, 1, person);
        person.ID = this.ID;
        return this.http.post<Person>(this.reqUrl + "EditContact", JSON.stringify(person), this.getAuthHeader());
      };
  };
};