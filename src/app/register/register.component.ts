import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthonService } from '../authon.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule , NgIf , RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private _AuthonService: AuthonService ,private _Router:Router) {}

  backendMsg = null;

  loading = false;

  registerForm = new FormGroup(
    {
      // propert1 : this.name

      // name :new FormControl(initial value , [validations]) ,

      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
      ]),

      email: new FormControl(null, [Validators.required, Validators.email]),

      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),

      rePassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),

      phone: new FormControl(null, [Validators.required]),
    },
    this.confirmPassword
  );

  register(form: any) {
    if (form.valid) {
      this.loading = true;

      this._AuthonService.signUp(form.value).subscribe({
        next: (response) => {
          console.log(response);
          
          // Navigate ==== routerLink
          this._Router.navigate(['/login']);

          this.loading = false;
        },
        error: (err) => {
          console.log(err);
          this.backendMsg = err.error.message;
          this.loading = false;
        },
      });
    }
  }

  // custom validation

  confirmPassword(form: any) {
    if (form.get('password').value !== form.get('rePassword').value) {
      return { didntMatch: true };
    } else {
      return null;
    }
  }
}
