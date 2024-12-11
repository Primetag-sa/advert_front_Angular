import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../services/api/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrl: './add-agent.component.scss'
})
export class AddAgentComponent {

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
  agencyId: string | null = null; // For storing agency ID if editing

  constructor(
    private userService: UserService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.agencyId = this.route.snapshot.paramMap.get('id');
  }


  onSubmit() {
    const clientData = {
      email: this.email,
      name: this.fullName,
      password: this.password,
      agencyName: this.brandName,
      agencyId: this.agencyId,
      phone: this.phone,
      address: this.address,
      facebook_url: this.facebookUrl,
      tiktok_url: this.tiktokUrl,
      snapchat_url: this.snapchatUrl,
      instagram_url: this.instagramUrl,
      x_url: this.xUrl,
      role: 'agent',
      from: 'agency',
    };
    console.log(clientData);
    this.userService.create(clientData).subscribe(
      (response) => {
        console.log('User created successfully:', response);
        this.router.navigate(['/agents/'+this.agencyId]);
      },
      (error) => {
        console.error('Error creating user:', error);
      }
    );
  }

  onCancel() {
    // Clear the form or navigate back to another page
    this.clearForm();
    this.location.back()
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
