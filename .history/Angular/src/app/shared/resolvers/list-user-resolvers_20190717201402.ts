import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ListUserResolver implements Resolve<User> {
    pagination = new UserFilter();
    constructor(private userService: UserService, private router: Router,
                private alertify: AlertifyService, private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {

        return this.userService.getUsers(this.pagination).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving your data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}