import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {AccordionModule} from 'primeng/accordion';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MessageComponent } from './components/message/message.component';
import { UperFirstLetterPipe } from './pipes/uper-first-letter.pipe';
import { UserComponent } from './admin-components/user/user.component';
import { UsersComponent } from './admin-components/users/users.component';
import { ButtonHoverDirective } from './directives/button-hover.directive';
import { DropdownMenuItemDirective } from './directives/dropdown-menu-item.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    AboutComponent,
    PricingComponent,
    GalleryComponent,
    RegistrationComponent,
    CalendarComponent,
    MessageComponent,
    UperFirstLetterPipe,
    UserComponent,
    UsersComponent,
    ButtonHoverDirective,
    DropdownMenuItemDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    FormsModule ,
    AccordionModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
