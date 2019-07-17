import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { Product } from '../../../models/product';
import { Category } from '../../../models/category';
import { AlertifyService } from '../../../shared/services/alertify.service';
import { ProductService } from '../../../shared/services/product.service';
import { CategoryService } from '../../../shared/services/category.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-Product.component.html',
  styleUrls: ['./create-Product.component.css']
})
export class CreateProductComponent implements OnInit {
  
  productRegister: Product;
  parents: Category[];
  children: Category[];
  createProductForm: FormGroup;

    constructor(private productService: ProductService,
                private categoryService: CategoryService,
                private router: Router,
                private alertService: AlertifyService, private fb: FormBuilder) {}

  ngOnInit() {
    this.createRegisterForm();
    this.getAllParent();
  }

  createRegisterForm() {
    this.createProductForm = this.fb.group(
        {
          name: ['', Validators.required],
          description: [''],
          categoryParentId : [''],
          categoryId: ['', Validators.required]
        }
    );
  }

  get f() { return this.createProductForm.controls; }

  save() {
    if (this.createProductForm.invalid) {return; }

    this.productRegister = Object.assign({}, this.createProductForm.value);

    this.productService.create(this.productRegister).subscribe(() => {
       this.alertService.success('Creado Exitosamente');
     }, error => {
       this.alertService.error(error);
     }, () => {
         this.router.navigate(['/product']);
     });
 }

 getAllParent(){
   this.categoryService.getAllParent().subscribe(data => {
    this.parents = data as unknown as Category[];
  }, error => {
    this.alertService.error(error);
  }, () => {
  });
 }

 getCategoryByParent() {
  this.categoryService.getByParent(this.createProductForm.value.categoryParentId).subscribe(data => {
    this.children = data;
   }, error => {
     this.alertService.error(error);
   }, () => {
   });
 }

 cancel() {
   this.router.navigate(['/product']);
 }

}
