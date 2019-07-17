import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Plant } from '../../models/plant';
import { PlantService } from '../services/plant.service';
import { AlertifyService } from '../services/alertify.service';

@Injectable()
export class DetailPlantResolver implements Resolve<Plant> {
    constructor(private plantService: PlantService, private router: Router,
                private alertify: AlertifyService){} // , private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Plant> {
        return this.plantService.getPlantById(route.params.id).pipe(
            catchError(error => {
                console.log(error);
                this.alertify.error('Problem retrieving your data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}