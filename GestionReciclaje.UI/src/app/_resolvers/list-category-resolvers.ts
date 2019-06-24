import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { CategoryFilter } from '../models/categoryFilter';
import { CategoryService } from '../_services/category.service';
import { Category } from '../models/category';

@Injectable()
export class ListCategoryResolver implements Resolve<Category> {
    pagination = new CategoryFilter();
    constructor(private categoryService: CategoryService, private router: Router,
                private alertify: AlertifyService, private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Category> {
        this.pagination.pageNumber = 1;
        this.pagination.pageSize = 5;
        return this.categoryService.getAll(this.pagination).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving your data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}