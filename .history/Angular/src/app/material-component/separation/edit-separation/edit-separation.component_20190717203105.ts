import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Separation } from '../../../models/separation';
import { Product } from '../../../models/product';
import { ProductFilter } from '../../../models/product-filter';
import { ProductService } from '../../../shared/services/product.service';
import { AlertifyService } from '../../../shared/services/alertify.service';
import { SeparationService } from '../../../shared/services/separation.service';

@Component({
  selector: 'app-edit-separation',
  templateUrl: './edit-separation.component.html',
  styleUrls: ['./edit-separation.component.css']
})
export class EditSeparationComponent implements OnInit {
  updateSeparationForm: FormGroup;
  separation: Separation;
  products: Product[];
  filtersProduct = new ProductFilter();
  measuresUnits:Array<string> = ['KG', 'LTS'];
  
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private fb: FormBuilder,
    private alertService: AlertifyService,
    private separationService: SeparationService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.separation = data.separation;
      
      this.createUpdateForm();
      this.getAllProduct();
    });
  }

  createUpdateForm() {
    this.updateSeparationForm = this.fb.group({
      separationId: [this.separation.separationId, Validators.required],
      quantity: [this.separation.quantity, Validators.required],
      description: [this.separation.description, Validators.required],
      productId: [this.separation.productId, Validators.required],
      measuresUnit: [this.separation.measuresUnit, Validators.required]
    });
  }

  updateSeparation() {
    if (this.updateSeparationForm.invalid) {
      return;
    }
    this.separation = Object.assign({}, this.updateSeparationForm.value);
  
    this.separationService.update(this.separation).subscribe(
      next => {},
      error => {
        this.alertService.error(error);
      },
      () => {
        this.alertService.success('Modificado exitosamente');
      }
    );
  }

  cancel() {
    this.router.navigate(['/separation']);
  }

  getAllProduct() {
    this.productService.getAll(this.filtersProduct).subscribe(
      res => {
        this.products = (res.entity as unknown) as Product[];
      },
      error => {
        this.alertService.error(error);
      }
    );
  }
}
