import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

import { Product } from '../models/Product';
import { ProductService } from '../_services/product.service';

@Injectable()
export class DetailProductResolver implements Resolve<Product> {
    constructor(private productService: ProductService, private router: Router,
                private alertify: AlertifyService, private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Product> {
        return this.productService.getById(route.params.id).pipe(
            catchError(error => {
                console.log(error);
                this.alertify.error('Problem retrieving your data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}