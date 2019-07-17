import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { SeparationService } from '../_services/separation.service';
import { SeparationFilter } from '../models/separation-filter';
import { Separation } from '../models/separation';

@Injectable()
export class ListSeparationResolver implements Resolve<Separation> {
    pagination = new SeparationFilter();
    constructor(private separationService: SeparationService, private router: Router,
                private alertify: AlertifyService, private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Separation> {
        this.pagination.pageNumber = 1;
        this.pagination.pageSize = 10;
        return this.separationService.getAll(this.pagination).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving your data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}