import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { ContactsComponent } from './contacts/contacts.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


// primeng
import {ButtonModule} from 'primeng/button';
import { TableModule } from 'primeng/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DialogModule} from 'primeng/dialog';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
// cookie
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [						
    AppComponent,
      ContactDetailsComponent,
      ContactsComponent,
      HeaderComponent,
      HomeComponent,
      LoginComponent,
      SignupComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ButtonModule,
    BrowserAnimationsModule,
    TableModule,
    DialogModule,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [
    CookieService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
