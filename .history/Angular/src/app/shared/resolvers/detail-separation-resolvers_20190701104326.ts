import {Injectable} from '@angular/core';
import {Separation} from '../models/Separation';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { SeparationService } from '../_services/separation.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class DetailSeparationResolver implements Resolve<Separation> {
    constructor(private separationService: SeparationService, private router: Router,
                private alertify: AlertifyService, private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Separation> {
        return this.separationService.getById(route.params.id).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving your data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}