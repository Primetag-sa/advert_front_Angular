import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/api/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  email = '';
  password = '';


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {

    let roleUser = localStorage.getItem('role');

    console.log(roleUser);

    if (localStorage.getItem('token')!='null' && localStorage.getItem('token')!=null) {
      console.log('dd')
    if(roleUser == 'admin'){
      this.router.navigate(['admin/dashboard']); // Redirect to home or dashboard
    }else if(roleUser == 'agency'){
      this.router.navigate(['agency/dashboard']); // Redirect to home or dashboard
    }else if(roleUser == 'agent'){
      this.router.navigate(['agency/dashboard']); // Redirect to home or dashboard
    }
    }

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
    errorMessage: string = '';
    login(): void {
      this.errorMessage = ''; // Clear previous error messages
      console.log('hi login');

      this.authService.login({ email: this.email, password: this.password }).subscribe(
        response => {
          // Handle successful login
          console.log('Login successful', response);
          console.log( response.user);
          console.log( response.user.is_activated);

          if(response.user.is_confirmed!=1){
            this.errorMessage = 'الحساب غير مفعل';
            setTimeout(() => {
              this.errorMessage = '';
            }, 3000); // Hide error message after 3 seconds
            return
          }
          localStorage.setItem('token', response.token);  // Save token if needed
          localStorage.setItem('user', response.user);  // Save token if needed
          localStorage.setItem('role', response.user.role);  // Save token if needed
          localStorage.setItem('user_id', response.user.id);  // Save token if needed
          localStorage.setItem('user_name', response.user.name);  // Save token if needed
          localStorage.setItem('image', response.user.avatar);  // Save token if needed
          localStorage.setItem('user_email', response.user.email);  // Save token if needed

          if(response.user.role == 'admin'){
            this.router.navigate(['admin/dashboard']); // Redirect to home or dashboard
          }else if(response.user.role == 'agency'){
            this.router.navigate(['agency/dashboard']); // Redirect to home or dashboard
          }else if(response.user.role == 'agent'){
            this.router.navigate(['agency/dashboard']); // Redirect to home or dashboard
          }

        },
        error => {
          // Handle login error
          console.error('Login failed', error);
          this.errorMessage = 'فشل تسجيل الدخول. يرجى التحقق من بريدك الإلكتروني وكلمة المرور والمحاولة مرة أخرى.';
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000); // Hide error message after 3 seconds
        }
      );
    }
}
