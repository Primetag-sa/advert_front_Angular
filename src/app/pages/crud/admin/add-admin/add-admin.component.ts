import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/api/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrl: './add-admin.component.scss'
})
export class AddAdminComponent {

  email: string = '';
  fullName: string = '';
  brandName: string = '';
  phone: string = '';
  password: string = '';
  confirmPassword: string = '';


  constructor(
    private userService: UserService,
    private router: Router,
    private location: Location
  ) {}

  onSubmit() {
    const clientData = {
      email: this.email,
      name: this.fullName,
      agencyName: this.brandName,
      phone: this.phone,
      password: this.password,
      password_confirmation: this.confirmPassword,
      role: 'admin'
    };
    console.log(clientData);
    this.userService.create(clientData).subscribe(
      (response) => {
        console.log('User created successfully:', response);
        this.router.navigate(['/admins']);
      },
      (error) => {
        console.error('Error creating user:', error);
      }
    );
  }

  onCancel() {
    // Clear the form or navigate back to another page
    this.clearForm();
    this.location.back();
  }

  clearForm() {
    this.email = '';
    this.fullName = '';
    this.brandName = '';
    this.phone = '';
  }


}
