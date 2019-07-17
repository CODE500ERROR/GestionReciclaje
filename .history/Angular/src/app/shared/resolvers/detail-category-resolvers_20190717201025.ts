import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from '../../models/category';
import { CategoryService } from '../services/category.service';
import { AlertifyService } from '../services/alertify.service';

@Injectable()
export class DetailCategoryResolver implements Resolve<Category> {
    constructor(private plantService: CategoryService, private router: Router,
                private alertify: AlertifyService, private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Category> {
        return this.plantService.getById(route.params.id).pipe(
            catchError(error => {
                console.log(error);
                this.alertify.error('Problem retrieving your data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}