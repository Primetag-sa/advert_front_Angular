import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../services/api/user.service';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrl: './edit-admin.component.scss'
})
export class EditAdminComponent {
  agencyId: string | null = null; // For storing agency ID if editing
  email: string = '';
  fullName: string = '';

  phone: string = '';


  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.agencyId = this.route.snapshot.paramMap.get('id');
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

        this.phone = response.phone;

      },
      (error) => {
        console.error('Error loading agency data:', error);
      }
    );
  }

  onSubmit() {
    const clientData = {
      id:this.agencyId,
      email: this.email,
      name: this.fullName,

      phone: this.phone,
    };

    if (this.agencyId) {
      this.userService.update(clientData.id,clientData).subscribe(
        (response) => {
          console.log('Agency updated successfully:', response);
          this.router.navigate(['/admins']);
        },
        (error) => {
          console.error('Error updating agency:', error);
        }
      );
    } else {
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
  }

  onCancel() {
    this.clearForm();
    this.router.navigate(['/admins']);
  }

  clearForm() {
    this.email = '';
    this.fullName = '';

    this.phone = '';

  }
}
