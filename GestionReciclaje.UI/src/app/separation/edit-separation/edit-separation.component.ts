import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Separation } from 'src/app/models/separation';
import { ActivatedRoute, Router } from '@angular/router';
import { SeparationService } from 'src/app/_services/separation.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ProductFilter } from 'src/app/models/product-filter';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from 'src/app/models/product';

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
