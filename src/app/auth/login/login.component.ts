import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@auth/login-services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  loginForm: FormGroup;
  message: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  isFieldFocus() {
    this.message = null;
  }

  isFieldInvalid(field: string) {
    return (
      (!this.loginForm.get(field).valid && this.loginForm.get(field).touched) || this.loginForm.get(field).untouched
    );
  }

  login() {
    this.authenticationService
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .then(result => {
        localStorage.setItem('currentUser', JSON.stringify(result));
        this.router.navigate([this.returnUrl]);
      })
      .catch(error => {
        console.error('error:', error);
        this.message = error.statusText;
      });
  }
}
