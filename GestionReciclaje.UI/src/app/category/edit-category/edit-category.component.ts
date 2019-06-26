import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/_services/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  updateCategoryForm: FormGroup;
  category: Category ;
  municipios: any[];
  parents: Category[];
  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder,
              private alertService: AlertifyService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.category = (data.category);
      this.createUpdateForm();
      this.getAllParent();
    });
  }

  createUpdateForm() {
    this.updateCategoryForm = this.fb.group(
       {
        categoryId: [this.category.categoryId, Validators.required], 
        name: [this.category.name, Validators.required],
        parentId: [this.category.parentId],
       }
     );
   }

   updateCategory() {
    if (this.updateCategoryForm.invalid) { return; }
    this.category = Object.assign({}, this.updateCategoryForm.value);
    this.categoryService.update(this.category).subscribe(next => {
    }, error => {
      this.alertService.error(error);
    }, () => {
      this.alertService.success('Modificado exitosamente');
    });
  }

  cancel() {
    this.router.navigate(['/category']);
  }

  getAllParent(){
    this.categoryService.getAllParent().subscribe(data => {
    this.parents = data;
   }, error => {
     this.alertService.error(error);
   }, () => {   
   });
  }
}
