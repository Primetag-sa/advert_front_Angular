import { Component } from '@angular/core';
import { UserService } from '../../../services/api/user.service';
import { CrudService } from '../../../services/api/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
/* import { MatSnackBar */

@Component({
  selector: 'app-agency-profile',
  templateUrl: './agency-profile.component.html',
  styleUrl: './agency-profile.component.scss'
})
export class AgencyProfileComponent {

  agencyId: string = ''; // For storing agency ID if editing
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
  image: string = '';
  confirmPassword: string = '';

  selectedFile: File | null = null;
  public url: string =  environment.url;

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  constructor(
    private userService: UserService,
    private crudService: CrudService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.agencyId = localStorage.getItem('user_id')??'';
    console.log(this.agencyId)
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
        this.image = response.avatar;
      },
      (error) => {
        console.error('Error loading agency data:', error);
      }
    );
  }

  onSubmit() {
    const formData = new FormData();

    formData.append('user_id', this.agencyId.toString());
    formData.append('name', this.fullName);
    formData.append('email', this.email);
    formData.append('phone', this.phone);
    formData.append('password', this.password);
    formData.append('password_confirmation', this.confirmPassword);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    if (this.agencyId) {
      this.crudService.update('users',this.agencyId,formData).subscribe(
        (response) => {
          console.log(response)
          if(response.status =='success'){
            console.log('Agency updated successfully:', response);
            this.router.navigate(['/dashboard']);
          }else{
            console.log('not work')
          }

        },
        (error) => {
          console.log('Error updating agency:', error);
        }
      );
    } else {
      /* this.userService.create(clientData).subscribe(
        (response) => {
          console.log('User created successfully:', response);
          this.router.navigate(['/agencies']);
        },
        (error) => {
          console.error('Error creating user:', error);
        }
      ); */
    }
  }

  onCancel() {
    this.clearForm();
    this.router.navigate(['/dashboard']);
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
