import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

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