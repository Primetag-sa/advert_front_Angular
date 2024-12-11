import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../../../services/api/crud.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent{
  fullName: string = '';
  email: string = '';
  password: string = '';
  brandName: string = '';
  confirmPassword: string = '';
  errorMessage: string | null = null;

  constructor(
    private crudService: CrudService,
    private router: Router
  ) {}

  register() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    const userData = {
      name: this.fullName,
      email: this.email,
      agencyName: this.brandName,
      password: this.password,
      password_confirmation: this.confirmPassword
    };

    this.crudService.create('users',userData)
      .subscribe(
        response => {
          localStorage.setItem('token', response.token);  // Save token if needed
          console.log(response);

          this.router.navigate(['/success']);  // Navigate to login or dashboard
        },
        error => this.errorMessage = error.error.message  // Adjust based on your error handling
      );
  }
}
