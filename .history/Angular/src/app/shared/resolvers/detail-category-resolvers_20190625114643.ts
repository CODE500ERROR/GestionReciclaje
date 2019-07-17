import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { Plant } from '../models/Plant';
import { PlantService } from '../_services/plant.service';
import { CategoryService } from '../_services/category.service';
import { Category } from '../models/category';

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