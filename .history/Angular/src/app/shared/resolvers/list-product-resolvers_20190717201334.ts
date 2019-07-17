import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../../models/product';
import { ProductFilter } from '../../models/product-filter';
import { ProductService } from '../services/product.service';
import { AlertifyService } from '../services/alertify.service';
@Injectable()
export class ListProductResolver implements Resolve<Product> {
    pagination = new ProductFilter();
    constructor(private productService: ProductService, private router: Router,
                private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Product> {
        this.pagination.pageNumber = 1;
        this.pagination.pageSize = 5;
        return this.productService.getAll(this.pagination).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving your data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}