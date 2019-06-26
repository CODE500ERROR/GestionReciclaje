import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/_services/category.service';

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
   this.parents = data;
  }, error => {
    this.alertService.error(error);
  }, () => {   
  });
 }

 cancel() {
   this.router.navigate(['/category']);
 }

}
