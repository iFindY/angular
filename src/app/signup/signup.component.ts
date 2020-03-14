import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css', '../common/forms.css']
})
export class SignupComponent implements OnInit {

  // this form group is referenced in the html template '[formGroup]="form"'
  form: FormGroup;

  // string contain input errors
  errors: string[] = [];

  // map error types on strings
  messagePerErrorCode = {
    min: 'The minimum length is 10 characters',
    uppercase: 'At least one upper case character',
    digits: 'At least one numeric character',
    'err_user': 'Could not create user'
  };

  // need auth service to login
  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService) {
    // redefine input for easy test
    this.form = this.fb.group({
      email: ['test@gmail.com', Validators.required],
      password: ['Password10', Validators.required],
      confirm: ['Password10', Validators.required]
    });
  }

  ngOnInit() {

  }

  signUp() {
    // get form value which, this contain a json with all values of the form
    const val = this.form.value;

    if (val.email && val.password && val.password === val.confirm) {

      // call back end, this return an observable on which we have to subscribe to fire it
      this.authService.signUp(val.email, val.password)
        .subscribe(
          () => {
              this.router.navigateByUrl('/');
              console.log('User created successfully');
          },
          // errors received from the backend, if not 200 response
          response => this.errors = response.error.errors
        );

    }

  }

}



