import { Component, OnInit } from '@angular/core';
import { SeparationService } from 'src/app/_services/separation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { Separation } from 'src/app/models/separation';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from 'src/app/models/product';
import { ProductFilter } from 'src/app/models/product-filter';

@Component({
  selector: 'app-create-separation',
  templateUrl: './create-separation.component.html',
  styleUrls: ['./create-separation.component.css']
})
export class CreateSeparationComponent implements OnInit {
  separationRegister: Separation;
  createSeparationForm: FormGroup;
  products: Product[];
  filtersProduct = new ProductFilter();


  constructor(
    private separationService: SeparationService,
    private productService: ProductService,
    private router: Router,
    private alertService: AlertifyService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.createRegisterForm();
    this.getAllProduct();
  }

  createRegisterForm() {
    this.createSeparationForm = this.fb.group({
      description: ['', Validators.required],
      quantity: ['', Validators.required],
      measuresUnit: ['', Validators.required],
      productId: ['', Validators.required]
    });
  }

  get f() {
    return this.createSeparationForm.controls;
  }

  save() {
    if (this.createSeparationForm.invalid) {
      return;
    }

    this.separationRegister = Object.assign(
      {},
      this.createSeparationForm.value
    );

    this.separationService.create(this.separationRegister).subscribe(
      () => {
        this.alertService.success('Creado Exitosamente');
      },
      error => {
        this.alertService.error(error);
      },
      () => {
        this.router.navigate(['/separtion']);
      }
    );
  }

  cancel() {
    this.router.navigate(['/separtion']);
  }

  getAllProduct() {
    this.productService.getAll(this.filtersProduct).subscribe((res) => {

       this.products = res.entity as unknown as Product[];
    }, error => {
      this.alertService.error(error);
    });
  }

}
