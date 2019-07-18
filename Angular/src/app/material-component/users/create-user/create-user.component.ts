import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';

import { Router } from '@angular/router';
import { Plant } from '../../../models/plant';
import { User } from '../../../models/user';
import { RolesService } from '../../../shared/services/roles.service';
import { PlantService } from '../../../shared/services/plant.service';
import { AlertifyService } from '../../../shared/services/alertify.service';
import { MustMatch } from '../../../shared/helpers/must-match';
import { PlantFilter } from '../../../models/plantFilter';
import { AuthService } from '../../../shared/services/auth.service';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  roles: any = [];
  rolesSelected: any = [];
  plants: Plant[];

  userRegister: User;
  createUserForm: FormGroup;

  constructor(private authService: AuthService,
              private router: Router,
              private rolesService: RolesService,
              private plantService: PlantService,
              private alertService: AlertifyService, private fb: FormBuilder) {this.userRegister = new User() }

  ngOnInit() {
     this.createRegisterForm();
     this.getAllRoles();
     this.getAllPlant();
  }

  createRegisterForm() {
    this.createUserForm = this.fb.group(
        {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['',  [Validators.required, Validators.email]],
        confirmEmail: [''],
        phoneNumber: [''],
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)] ],
        confirmPassword: [''],
        roles: [this.addRolesControl()],
        plantId: ['',  Validators.required]
      },
      {
        validator: [ MustMatch('password', 'confirmPassword'), MustMatch('email', 'confirmEmail')  ]
      }
    );
  }

  get f() { return this.createUserForm.controls; }

  addRolesControl() {
    const arr = this.roles.map(element => {
      return this.fb.control(false);
    });
    return this.fb.array(arr);
  }

  get rolesArray(){
    return this.createUserForm.get('roles') as FormArray;
  }
  save() {
     if (this.createUserForm.invalid) {return; }

     this.userRegister = Object.assign({}, this.createUserForm.value);
     this.userRegister.roles = this.getRolesSelected();
     this.authService.register(this.userRegister).subscribe(() => {
        this.alertService.success('Registration successful');
      }, error => {
        this.alertService.error(error);
      }, () => {
          this.router.navigate(['/users']);
      });
  }

  cancel() {
    this.router.navigate(['/users']);
  }

  getAllRoles() {
    this.rolesService.getAllRoles().subscribe( data => {
     this.roles = data;
    }, error => {
      this.alertService.error(error);
    });
  }

  getRolesSelected(){
    const result = [];
    this.roles.forEach((value, key: string) => {
        if (value.checked === true){
          result.push(value.name);
        }
    });
    return result;
  }

  getAllPlant(){
     const filter  = new PlantFilter();
     filter.pageSize = 100;
     this.plantService.getAll(filter).subscribe( data => {
      this.plants = data.entity;
    }, error => {
      this.alertService.error(error);
    });
  }

}
