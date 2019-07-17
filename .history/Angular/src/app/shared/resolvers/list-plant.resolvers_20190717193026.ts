import {Injectable} from '@angular/core';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Plant } from '../../models/plant';
import { PlantFilter } from '../../models/plantFilter';
import { PlantService } from '../services/plant.service';

@Injectable()
export class ListPlantResolver implements Resolve<Plant> {
    pagination = new PlantFilter();
    constructor(private plantService: PlantService, private router: Router) {}
                 private alertify: AlertifyService, private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Plant> {
        return this.plantService.getAll(this.pagination).pipe(
            catchError(error => {
                 this.alertify.error('Problem retrieving your data');
                 this.router.navigate(['/starts']);
                return of(null);
            })
        );
    }
}