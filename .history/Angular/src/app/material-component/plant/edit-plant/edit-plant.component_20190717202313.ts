import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Plant } from '../../../models/plant';
import { AlertifyService } from '../../../shared/services/alertify.service';
import { PlantService } from '../../../shared/services/plant.service';
import { MuncipioService } from '../../../shared/services/muncipio.service';

@Component({
  selector: 'app-edit-plant',
  templateUrl: './edit-plant.component.html',
  styleUrls: ['./edit-plant.component.css']
})
export class EditPlantComponent implements OnInit {

  updatePlantForm: FormGroup;
  plant: Plant ;
  municipios: any[];

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, 
              private alertService: AlertifyService, private plantService: PlantService,
              private municipioService: MuncipioService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.plant = (data.plant);
      this.getAllMunicipios();
      this.createUpdateForm();
    });
  }

  createUpdateForm() {
    this.updatePlantForm = this.fb.group(
       {
         plantId: [this.plant.plantId, Validators.required],
         name: [this.plant.name, Validators.required],
         address: [this.plant.address, Validators.required],
         municipioId: [this.plant.municipioId],
         operatorsQuantity: [this.plant.operatorsQuantity, Validators.required],
       }
     );
   }

   updatePlant() {
    if (this.updatePlantForm.invalid) { return; }
    this.plant = Object.assign({}, this.updatePlantForm.value);
   
    this.plantService.updatePlant(this.plant).subscribe(next => {
    }, error => {
      this.alertService.error(error);
    }, () => {
      this.alertService.success('Modificado exitosamente');
      
    });
  }

  getAllMunicipios(){
    this.municipioService.getAll().subscribe(data =>  { 
     this.municipios = data;
    }, error => {
       this.alertService.error(error);
    }, () => {
    });
  }
  cancel() {
    this.router.navigate(['/Plant']);
  }
}
