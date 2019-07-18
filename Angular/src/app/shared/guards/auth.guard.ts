import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) {}

  canActivate( next: ActivatedRouteSnapshot ): boolean {
    const roles = next.firstChild  != null ? next.firstChild.data['roles'] as Array<string> : null;

    if (roles) {
      const match =  this.authService.roleMatch(roles) ;
      if (match) {
        return true;
      } else {
        this.router.navigate(['starter']);
        this.alertify.error('No tienes permisos para acceder a esta área');
      }
    }

    if (this.authService.loggedIn()) {
      return true;
    }
    this.authService.logout();
    this.router.navigate(['/login']);
    return false;
  }
}
