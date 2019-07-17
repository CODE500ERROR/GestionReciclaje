import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from '../../models/category';
import { CategoryFilter } from '../../models/categoryFilter';
import { CategoryService } from '../services/category.service';
import { AlertifyService } from '../services/alertify.service';

@Injectable()
export class ListCategoryResolver implements Resolve<Category> {
    pagination = new CategoryFilter();
    constructor(private categoryService: CategoryService, private router: Router,
                private alertify: AlertifyService){} // , private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Category> {
        return this.categoryService.getAll(this.pagination).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving your data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}