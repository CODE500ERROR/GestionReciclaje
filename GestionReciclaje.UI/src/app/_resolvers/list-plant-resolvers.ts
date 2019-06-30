import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { PlantFilter } from '../models/plantFilter';
import { PlantService } from '../_services/plant.service';
import { Plant } from '../models/Plant';

@Injectable()
export class ListPlantResolver implements Resolve<Plant> {
    pagination = new PlantFilter();
    constructor(private plantService: PlantService, private router: Router,
                private alertify: AlertifyService, private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Plant> {
        return this.plantService.getAll(this.pagination).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving your data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}