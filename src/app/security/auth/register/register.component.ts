import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../../../services/api/crud.service';
import { UserService } from '../../../store/auth/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  fullName: string = '';
  email: string = '';
  password: string = '';
  brandName: string = '';
  confirmPassword: string = '';
  errorMessage: string | null = null;
  currentUsers: number = 0;
  planId: number = 0;
  countOfWebsite: number = 0;
  serverErrors: { [key: string]: string[] } = {};
  isLowestPrice: boolean = false;

  constructor(private crudService: CrudService, private router: Router,  private route: ActivatedRoute, private userService: UserService
  ) {}
 
  register() {
    if (this.password.length < 8) {
      this.errorMessage = 'Password must be at least 8 characters long.';
      return;
    }
    if (this.password.length < 8) {
      this.errorMessage = 'Password must be at least 8 characters long.';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    const userData = {
      name: this.fullName,
      email: this.email,
      agencyName: this.brandName,
      password: this.password,
      password_confirmation: this.confirmPassword,
      number_of_users: this.currentUsers.toString(),
      plan_id: this.planId,
      number_of_sites: this.countOfWebsite.toString(),
    };

    this.crudService.create('register', userData).subscribe(
      (response) => {
        debugger
        localStorage.setItem('token', response.token); 

        console.log('Register res: ', response);

        this.userService.setUserData(this.email, this.password,response.user_plan.number_of_users,response.user_plan.number_of_sites,response.user_plan.total_price,response.user_plan.plan.description);
        this.router.navigate(['/Payment']); 
      },
      (error) => {
        if (error.error && error.error.errors) {
          this.serverErrors = error.error.errors;
        }
        this.errorMessage = error.error.message
      }
    );
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.currentUsers = +params['currentUsers'] || 0; 
      this.planId = +params['planId'] || 0; 
      this.countOfWebsite = +params['countOfWebsite'] || 0; 
      this.isLowestPrice = params['isLowestPrice'] || false
    });

  }
}
