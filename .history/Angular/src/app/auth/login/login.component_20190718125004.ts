import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { AlertifyService } from '../../shared/services/alertify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;
  userLogin: any = {};
  constructor(public authService: AuthService,
              private alertService: AlertifyService,
              private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.fb.group(
      {
        email: ['', Validators.required],
        password: ['', [Validators.required]]
      }
  );
  }

  login() {
    if (this.loginForm.invalid) { return; }
    this.userLogin = Object.assign({}, this.loginForm.value);
    this.authService.login(this.userLogin).subscribe(next => {
    }, error => {
      this.alertService.error(error);
    }, () => {
      this.router.navigate(['/home']);
    });
  }

}
