import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';
import { AdminGuardService } from './guards/admin-guard.service';

import { HomeComponent } from './components/home/home.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { UsersComponent } from './admin-components/users/users.component';

const routes: Routes = [
  { path: '',  redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuardService] },
  { path: 'gallery', component: GalleryComponent },
  { path: 'users',  component: UsersComponent,canActivate: [AdminGuardService] },
  { path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
