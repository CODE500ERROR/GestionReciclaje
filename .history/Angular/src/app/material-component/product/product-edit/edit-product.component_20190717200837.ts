import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../../models/product';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../shared/services/category.service';
import { AlertifyService } from '../../../shared/services/alertify.service';
import { ProductService } from '../../../shared/services/product.service';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private alertService: AlertifyService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.product = data.product;
      this.createUpdateForm();
      this.getAllParent();
      this.getCategoryByParent();
    });
  }

  createUpdateForm() {
    this.updateProductForm = this.fb.group({
      productId: [this.product.productId, Validators.required],
      name: [this.product.name, Validators.required],
      description: [this.product.description],
      categoryId: [this.product.categoryId, Validators.required],
      categoryParentId: [this.product.categoryParentId]
    });
  }

  updateProduct() {
    if (this.updateProductForm.invalid) {
      return;
    }
    this.product = Object.assign({}, this.updateProductForm.value);
    this.productService.update(this.product).subscribe(
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
    this.router.navigate(['/product']);
  }

  getAllParent() {
    this.categoryService.getAllParent().subscribe(
      data => {
        this.parents = (data as unknown) as Category[];
      },
      error => {
        this.alertService.error(error);
      },
      () => {}
    );
  }

  getCategoryByParent() {
    this.categoryService
      .getByParent(this.updateProductForm.value.categoryParentId)
      .subscribe(
        data => {
          this.children = data;
        },
        error => {
          this.alertService.error(error);
        },
        () => {}
      );
  }
}
