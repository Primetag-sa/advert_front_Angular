import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/api/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.scss'
})
export class ResetComponent {

  loginForm!: FormGroup;
  email = '';
  password = '';


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }


    errorMessage: string = '';
    login(): void {
      this.errorMessage = ''; // Clear previous error messages
      console.log('hi login');
      this.router.navigate(['reset/message']);
      // this.authService.login({ email: this.email, password: this.password }).subscribe(
      //   response => {
      //     // Handle successful login
      //     console.log('Login successful', response);
      //     this.router.navigate(['admin/dashboard']); // Redirect to home or dashboard
      //   },
      //   error => {
      //     // Handle login error
      //     console.error('Login failed', error);
      //     this.errorMessage = 'فشل تسجيل الدخول. يرجى التحقق من بريدك الإلكتروني وكلمة المرور والمحاولة مرة أخرى.';
      //     // setTimeout(() => {
      //     //   this.errorMessage = '';
      //     // }, 3000); // Hide error message after 3 seconds
      //   }
      // );
    }


}
