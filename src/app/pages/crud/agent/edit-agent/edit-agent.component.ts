import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../services/api/user.service';

@Component({
  selector: 'app-edit-agent',
  templateUrl: './edit-agent.component.html',
  styleUrl: './edit-agent.component.scss'
})
export class EditAgentComponent {
  agentId: string | null = null; // For storing agency ID if editing
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
  password: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.agentId = this.route.snapshot.paramMap.get('id');
    if (this.agentId) {
      this.loadAgencyData();
    }
  }

  loadAgencyData() {
    console.log( this.agentId )
    this.userService.getAgencyById(this.agentId!).subscribe(
      (response) => {
        console.log(response);
        this.email = response.email;
        this.fullName = response.name;
        this.brandName = response.agent.name;
        this.phone = response.phone;
        this.address = response.agent.address;
        this.facebookUrl = response.agent.facebook_url;
        this.tiktokUrl = response.agent.tiktok_url;
        this.snapchatUrl = response.agent.snapchat_url;
        this.instagramUrl = response.agent.instagram_url;
        this.xUrl = response.agent.x_url;
        this.agencyId = response.id;
      },
      (error) => {
        console.error('Error loading agency data:', error);
      }
    );
  }

  onSubmit() {
    let clientData:any = {
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
    if(this.password)
      clientData={
        ...clientData,
        password: this.password,
      }

    if (this.agentId) {
      this.userService.update(clientData.id,clientData).subscribe(
        (response) => {
          console.log('Agency updated successfully:', response);
          this.router.navigate(['/agents/'+this.agencyId]);
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
    this.password = '';
  }
}
