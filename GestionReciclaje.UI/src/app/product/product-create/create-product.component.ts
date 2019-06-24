import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/_services/category.service';

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
          parentId : [''],
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
   this.parents = data.parents;
  }, error => {
    this.alertService.error(error);
  }, () => {
  });
 }

 getCategoryByParent() {
  this.categoryService.getByParent(this.createProductForm.value.parentId).subscribe(data => {
    this.children = data.children;
   }, error => {
     this.alertService.error(error);
   }, () => {
   });
 }

 cancel() {
   this.router.navigate(['/product']);
 }

}
