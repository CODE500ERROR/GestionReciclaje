import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../shared/services/category.service';
import { AlertifyService } from '../../../shared/services/alertify.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  categoryRegister: Category;
  parents: Category[];
  createCategoryForm: FormGroup;
  municipios: any[];

    constructor(private categoryService: CategoryService,
                private router: Router,
                private alertService: AlertifyService, private fb: FormBuilder) {}

  ngOnInit() {
    this.createRegisterForm();
    this.getAllParent();
  }

  createRegisterForm() {
    this.createCategoryForm = this.fb.group(
        {
          name: ['', Validators.required],
          parentId : [''],
        }
    );
  }

  get f() { return this.createCategoryForm.controls; }

  save() {
    if (this.createCategoryForm.invalid) {return; }

    this.categoryRegister = Object.assign({}, this.createCategoryForm.value);

    this.categoryService.create(this.categoryRegister).subscribe(() => {
       this.alertService.success('Creado Exitosamente');
     }, error => {
       this.alertService.error(error);
     }, () => {
         this.router.navigate(['/category']);
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

 cancel() {
   this.router.navigate(['/category']);
 }

}
