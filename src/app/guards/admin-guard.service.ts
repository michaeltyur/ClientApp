import { AuthenticationService } from '../services/authentication.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {
  constructor(private authService: AuthenticationService,
              private router: Router) { }

canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
if (this.authService.isAdmin()) {
return true;
}

  // this.router.navigate(['/home']);
return false;
}
}
