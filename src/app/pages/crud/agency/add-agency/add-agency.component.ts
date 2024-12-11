import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/api/user.service';

@Component({
  selector: 'app-add-agency',
  templateUrl: './add-agency.component.html',
  styleUrl: './add-agency.component.scss'
})
export class AddAgencyComponent {

  email: string = '';
  fullName: string = '';
  brandName: string = '';
  phone: string = '';
  address: string = '';
  facebookUrl: string = '';
  tiktokUrl: string = '';
  snapchatUrl: string = '';
  instagramUrl: string = '';
  xUrl: string = '';
  password: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  onSubmit() {
    const clientData = {
      email: this.email,
      name: this.fullName,
      agencyName: this.brandName,
      phone: this.phone,
      address: this.address,
      facebook_url: this.facebookUrl,
      tiktok_url: this.tiktokUrl,
      snapchat_url: this.snapchatUrl,
      instagram_url: this.instagramUrl,
      x_url: this.xUrl,
      password: this.password,
    };
    console.log(clientData);
    this.userService.create(clientData).subscribe(
      (response) => {
        console.log('User created successfully:', response);
        this.router.navigate(['/agencies']);
      },
      (error) => {
        console.error('Error creating user:', error);
      }
    );
  }

  onCancel() {
    // Clear the form or navigate back to another page
    this.clearForm();
    this.router.navigate(['/agencies/list']);
  }

  clearForm() {
    this.email = '';
    this.fullName = '';
    this.brandName = '';
    this.phone = '';
    this.address = '';
    this.facebookUrl = '';
    this.tiktokUrl = '';
    this.snapchatUrl = '';
    this.instagramUrl = '';
    this.xUrl = '';
    this.password = '';
  }


}
