import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/_services/product.service';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/_services/category.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  updateProductForm: FormGroup;
  product: Product;
  parents: Category[];
  children: Category[];

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder,
              private categoryService: CategoryService,
              private alertService: AlertifyService, private productService: ProductService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.product = (data.product);
      this.createUpdateForm();
      this.getAllParent();
      this.getCategoryByParent();
    });
  }

  createUpdateForm() {
    this.updateProductForm = this.fb.group(
       {
        productId: [this.product.productId, Validators.required],
        name: [this.product.name, Validators.required],
        description: [this.product.description],
        categoryId: [this.product.categoryId, Validators.required ],
        parentId: [this.product.parentId ],
       }
     );
   }

   updateProduct() {
    if (this.updateProductForm.invalid) { return; }
    this.product = Object.assign({}, this.updateProductForm.value);
    this.productService.update(this.product).subscribe(next => {
    }, error => {
      this.alertService.error(error);
    }, () => {
      this.alertService.success('Modificado exitosamente');
    });
  }

  cancel() {
    this.router.navigate(['/product']);
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
    this.categoryService.getByParent(this.updateProductForm.value.parentId).subscribe(data => {
      this.children = data.children;
     }, error => {
       this.alertService.error(error);
     }, () => {
     });
   }

   
}
