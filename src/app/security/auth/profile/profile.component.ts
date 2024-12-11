import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/api/user.service';
import {Client} from "../../../models/client.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  agencyId: string | null = null; // For storing agency ID if editing
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

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.agencyId = localStorage.getItem('user_id');
    if (this.agencyId) {
      this.loadAgencyData();
    }
  }

  loadAgencyData() {
    this.userService.getAgencyById(this.agencyId!).subscribe(
      (response) => {
        console.log(response);
        this.email = response.email;
        this.fullName = response.name;
        this.brandName = response.agency.name;
        this.phone = response.phone;
        this.address = response.agency.address;
        this.facebookUrl = response.agency.facebook_url;
        this.tiktokUrl = response.agency.tiktok_url;
        this.snapchatUrl = response.agency.snapchat_url;
        this.instagramUrl = response.agency.instagram_url;
        this.xUrl = response.agency.x_url;
      },
      (error) => {
        console.error('Error loading agency data:', error);
      }
    );
  }

  onSubmit() {
    const clientData:Client = {
      id:this.agencyId,
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
    };

    if (this.agencyId) {
      this.userService.update(clientData).subscribe(
        (response) => {
          console.log('Agency updated successfully:', response);
          this.router.navigate(['/agencies']);
        },
        (error) => {
          console.error('Error updating agency:', error);
        }
      );
    } else {
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
  }

  onCancel() {
    this.clearForm();
    this.router.navigate(['/agencies']);
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
  }

}
